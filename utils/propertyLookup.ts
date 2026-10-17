/**
 * Look up a property's real records (tax bill, beds/baths/sqft, last sale) by address.
 *
 * 1. Philadelphia — free, no key: City of Philadelphia Office of Property Assessment open data (Carto SQL API).
 *    Tax = taxable value × 1.3998% (city 0.6159% + school 0.7839%, unchanged since 2016, phila.gov).
 * 2. Everywhere else — RentCast property records API with the user's own key (Settings → Property Data;
 *    free plan = 50 requests/month). Results are cached in this browser for 30 days to save requests.
 * No key / not found → null, and the app keeps its county-average estimate.
 */
import type { LoanInputs } from '../types';
import { getCountiesForState } from './thirdPartyCosts';

export const PHILLY_TAX_RATE = 1.3998; // percent

export interface Comparable {
  address: string;
  price: number;
  sqft?: number;
  beds?: number;
  baths?: number;
  daysOnMarket?: number;
  date?: string;
  distanceMiles?: number;
}

export interface PropertyRecord {
  source: 'philly-opa' | 'rentcast';
  sourceLabel: string;           // shown to the user, e.g. "Philadelphia property records"
  address?: string;              // street line
  city?: string;
  state?: string;
  zip?: string;
  county?: string;               // in the app's format, e.g. "Allegheny County"
  beds?: number;
  baths?: number;
  sqft?: number;
  yearBuilt?: number;
  lotSize?: string;
  propertyType?: LoanInputs['propertyType'];
  foundation?: LoanInputs['foundationType'];
  lastSalePrice?: number;
  lastSaleDate?: string;
  assessedValue?: number;
  annualTax?: number;            // yearly tax bill in dollars
  taxYear?: number;
  estimatedValue?: number;       // as-is value estimate (RentCast AVM) or city market value (Philadelphia)
  valueLow?: number;
  valueHigh?: number;
  comps?: Comparable[];
}

export class LookupError extends Error {}

const CACHE_PREFIX = 'zs_property_lookup_v1:';
const CACHE_DAYS = 30;

const cacheGet = (key: string): PropertyRecord | null | undefined => {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return undefined;
    const { at, rec } = JSON.parse(raw);
    return Date.now() - at < CACHE_DAYS * 86_400_000 ? rec : undefined;
  } catch { return undefined; }
};
const cacheSet = (key: string, rec: PropertyRecord | null) => {
  try { localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ at: Date.now(), rec })); } catch { /* storage full/blocked */ }
};

/** An address worth a lookup: starts with a house number and has a city/state or zip after a comma. */
export const looksComplete = (address?: string) =>
  !!address && /^\s*\d+[A-Za-z]?\s+\S+/.test(address) && (/,\s*\S+/.test(address) || /\b\d{5}\b/.test(address));

/** City for a US zip (free zippopotam.us, CORS *), cached in this browser. */
const cityForZip = async (zip: string): Promise<{ city: string; state: string } | null> => {
  const ck = `zs_zip_city_v1:${zip}`;
  try { const hit = localStorage.getItem(ck); if (hit) return JSON.parse(hit); } catch { /* no storage */ }
  try {
    const resp = await fetch(`https://api.zippopotam.us/us/${zip}`);
    if (!resp.ok) return null;
    const place = (await resp.json()).places?.[0];
    const out = place ? { city: place['place name'], state: place['state abbreviation'] } : null;
    try { if (out) localStorage.setItem(ck, JSON.stringify(out)); } catch { /* ignore */ }
    return out;
  } catch { return null; }
};

/**
 * The address box usually holds only the street ("1355 Woodhill Ln") with State and Zip in their own fields.
 * Build "street, city, ST zip" for the lookup (city from the zip). Returns an error message when it can't.
 */
export const buildLookupAddress = async (inp: { address?: string; state?: string; zipCode?: string }):
  Promise<{ address: string } | { error: string }> => {
  const street = (inp.address || '').trim();
  if (!/^\d+[A-Za-z-]*\s+\S+/.test(street)) return { error: 'Enter the street address (house number and street) in Property Address.' };
  if (street.includes(',') && /\b\d{5}\b/.test(street)) return { address: street }; // already "street, city, ST zip"
  const zip = (inp.zipCode || '').match(/\d{5}/)?.[0] || street.match(/\b\d{5}\b/)?.[0];
  if (street.includes(',') && zip) return { address: `${street}, ${inp.state || ''} ${zip}`.replace(/\s+/g, ' ').trim() }; // "street, city" + fields
  if (street.includes(',') && /,\s*\S+.*\b[A-Z]{2}\b/i.test(street)) return { address: street }; // "street, city, ST" — try as typed
  if (!zip) return { error: 'Add the Zip Code so we can find this property.' };
  const place = await cityForZip(zip);
  const state = inp.state || place?.state || '';
  const line = street.split(',')[0].replace(/\b\d{5}\b/, '').trim();
  return { address: [line, place?.city, `${state} ${zip}`.trim()].filter(Boolean).join(', ') };
};

const SUFFIX: Record<string, string> = {
  STREET: 'ST', AVENUE: 'AVE', ROAD: 'RD', DRIVE: 'DR', LANE: 'LN', BOULEVARD: 'BLVD', PLACE: 'PL', COURT: 'CT',
  TERRACE: 'TER', PARKWAY: 'PKWY', CIRCLE: 'CIR', HIGHWAY: 'HWY', SQUARE: 'SQ', PIKE: 'PIKE',
  NORTH: 'N', SOUTH: 'S', EAST: 'E', WEST: 'W',
};

/** "1633 South 20th Street, Apt 2, Philadelphia PA" → "1633 S 20TH ST" (Philadelphia OPA `location` format). */
export const phillyLocation = (address: string) =>
  address.split(',')[0].toUpperCase()
    .replace(/\s+(APT|UNIT|#|STE|SUITE)\b.*$/, '').replace(/#.*$/, '')
    .replace(/[.]/g, '').split(/\s+/).filter(Boolean)
    .map((w) => SUFFIX[w] || w).join(' ');

const isPhiladelphia = (address: string, county?: string) =>
  county === 'Philadelphia County' || /\bphiladelphia\b/i.test(address) || /\bphila\b/i.test(address);

const lookupPhilly = async (address: string): Promise<PropertyRecord | null> => {
  const loc = phillyLocation(address).replace(/'/g, "''");
  const q = `SELECT location, zip_code, market_value, taxable_land, taxable_building, number_of_bedrooms,
    number_of_bathrooms, total_livable_area, year_built, sale_price, sale_date, category_code_description, basements
    FROM opa_properties_public WHERE location = '${loc}' LIMIT 2`;
  const resp = await fetch(`https://phl.carto.com/api/v2/sql?q=${encodeURIComponent(q)}`);
  if (!resp.ok) throw new LookupError(`Philadelphia property records are unavailable right now (${resp.status}).`);
  const rows = (await resp.json()).rows || [];
  if (rows.length !== 1) return null; // not found, or ambiguous (condo units) → keep the estimate
  const r = rows[0];
  const taxable = (r.taxable_land || 0) + (r.taxable_building || 0);
  const cat = String(r.category_code_description || '');
  return {
    source: 'philly-opa',
    sourceLabel: 'Philadelphia property records (Office of Property Assessment)',
    address: r.location, city: 'Philadelphia', state: 'PA', zip: r.zip_code, county: 'Philadelphia County',
    beds: r.number_of_bedrooms || undefined,
    baths: r.number_of_bathrooms || undefined,
    sqft: r.total_livable_area || undefined,
    yearBuilt: Number(r.year_built) || undefined,
    propertyType: /MULTI|APARTMENT/i.test(cat) ? 'Multi-Family' : /MIXED/i.test(cat) ? 'Mixed-Use' : 'SFR',
    foundation: r.basements && r.basements !== '0' ? 'Basement' : undefined,
    lastSalePrice: r.sale_price > 1 ? r.sale_price : undefined, // $1 transfers aren't real sales
    lastSaleDate: r.sale_date ? String(r.sale_date).slice(0, 10) : undefined,
    assessedValue: taxable,
    annualTax: Math.round(taxable * PHILLY_TAX_RATE) / 100,
    taxYear: new Date().getFullYear(),
    estimatedValue: r.market_value || undefined,
  };
};

const rentcastGet = async (path: string, key: string) => {
  const resp = await fetch(`https://api.rentcast.io/v1/${path}`, { headers: { 'X-Api-Key': key, Accept: 'application/json' } });
  if (resp.status === 404) return null;
  if (resp.status === 401 || resp.status === 403) throw new LookupError('RentCast key is invalid — check Settings → Property Data.');
  if (resp.status === 429) throw new LookupError('RentCast monthly lookup limit reached. Using the county average for now.');
  if (!resp.ok) throw new LookupError(`RentCast error (${resp.status}).`);
  return resp.json();
};

const latest = <T extends { year: number }>(byYear?: Record<string, T>) =>
  byYear ? Object.values(byYear).sort((a, b) => b.year - a.year)[0] : undefined;

/** RentCast county ("Bexar") → the app's county key ("Bexar County"), when the app knows it. */
const toAppCounty = (state?: string, county?: string) => {
  if (!state || !county) return undefined;
  const list = getCountiesForState(state);
  return list.find((c) => c === county) || list.find((c) => c.toLowerCase().startsWith(county.toLowerCase() + ' '));
};

/**
 * U.S. Census geocoder (free, no key). It sends no CORS header but supports JSONP, so call it with a <script> tag.
 * Returns the official address spelling ("1355 WOODHILL LN, LAKE ARIEL, PA, 18436") and coordinates.
 */
const censusGeocode = (address: string): Promise<{ matched: string; lat: number; lon: number; street: string } | null> =>
  new Promise((resolve) => {
    if (typeof document === 'undefined') return resolve(null);
    const cb = `zsGeo${Date.now()}${Math.floor(Math.random() * 1e6)}`;
    const script = document.createElement('script');
    const done = (v: any) => { delete (window as any)[cb]; script.remove(); clearTimeout(timer); resolve(v); };
    const timer = setTimeout(() => done(null), 12000);
    (window as any)[cb] = (data: any) => {
      const m = data?.result?.addressMatches?.[0];
      done(m ? { matched: m.matchedAddress, lat: m.coordinates.y, lon: m.coordinates.x, street: m.addressComponents?.streetName || '' } : null);
    };
    script.onerror = () => done(null);
    script.src = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${encodeURIComponent(address)}`
      + `&benchmark=Public_AR_Current&format=jsonp&callback=${cb}`;
    document.head.appendChild(script);
  });

const firstRecord = (list: any) => (Array.isArray(list) ? list[0] : list) || null;

/**
 * Find the RentCast record. Exact address first; if RentCast doesn't know that spelling, retry with the Census
 * geocoder's official spelling, then search records within ~0.15 mile of its coordinates and take the one with
 * the same house number on the same street (never a different house).
 */
const findRentCastRecord = async (address: string, key: string) => {
  const exact = firstRecord(await rentcastGet(`properties?address=${encodeURIComponent(address.trim())}`, key));
  if (exact) return exact;
  const geo = await censusGeocode(address);
  if (!geo) return null;
  const official = geo.matched.replace(/,\s*(\d{5})$/, ' $1'); // "…, PA, 18436" → "…, PA 18436"
  if (official.toUpperCase() !== address.trim().toUpperCase()) {
    const byOfficial = firstRecord(await rentcastGet(`properties?address=${encodeURIComponent(official)}`, key));
    if (byOfficial) return byOfficial;
  }
  const near = await rentcastGet(`properties?latitude=${geo.lat}&longitude=${geo.lon}&radius=0.15&limit=100`, key);
  const houseNo = address.trim().match(/^\d+[A-Za-z]?/)?.[0];
  const streetWord = (geo.street || '').split(/\s+/)[0].toUpperCase();
  return (Array.isArray(near) ? near : []).find((p: any) => {
    const line = String(p.addressLine1 || p.formattedAddress || '').toUpperCase();
    return houseNo && line.startsWith(houseNo + ' ') && (!streetWord || line.includes(streetWord));
  }) || null;
};

const lookupRentCast = async (address: string, key: string, withValuation: boolean): Promise<PropertyRecord | null> => {
  const p = await findRentCastRecord(address, key);
  if (!p) return null;
  const q = encodeURIComponent(p.formattedAddress || address.trim()); // valuation uses the address RentCast knows
  const tax = latest<{ year: number; total: number }>(p.propertyTaxes);
  const assess = latest<{ year: number; value: number }>(p.taxAssessments);
  const type = String(p.propertyType || '');
  const rec: PropertyRecord = {
    source: 'rentcast',
    sourceLabel: `County records via RentCast${tax ? ` (${tax.year} tax bill)` : ''}`,
    address: p.addressLine1, city: p.city, state: p.state, zip: p.zipCode, county: toAppCounty(p.state, p.county),
    beds: p.bedrooms, baths: p.bathrooms, sqft: p.squareFootage, yearBuilt: p.yearBuilt,
    lotSize: p.lotSize ? `${Number(p.lotSize).toLocaleString()} sq ft` : undefined,
    propertyType: /Multi|Apartment/i.test(type) ? 'Multi-Family' : /Commercial|Mixed/i.test(type) ? 'Mixed-Use' : 'SFR',
    foundation: /basement/i.test(p.features?.foundationType || '') ? 'Basement'
      : /crawl/i.test(p.features?.foundationType || '') ? 'Crawl Space'
      : /slab/i.test(p.features?.foundationType || '') ? 'Slab' : undefined,
    lastSalePrice: p.lastSalePrice, lastSaleDate: p.lastSaleDate ? String(p.lastSaleDate).slice(0, 10) : undefined,
    assessedValue: assess?.value, annualTax: tax?.total, taxYear: tax?.year,
  };
  if (withValuation) {
    const avm = await rentcastGet(`avm/value?address=${q}&compCount=5`, key).catch(() => null);
    if (avm) {
      rec.estimatedValue = avm.price; rec.valueLow = avm.priceRangeLow; rec.valueHigh = avm.priceRangeHigh;
      rec.comps = (avm.comparables || []).map((c: any) => ({
        address: c.formattedAddress, price: c.price, sqft: c.squareFootage, beds: c.bedrooms, baths: c.bathrooms,
        daysOnMarket: c.daysOnMarket, date: String(c.removedDate || c.listedDate || '').slice(0, 10) || undefined,
        distanceMiles: c.distance,
      }));
    }
  }
  return rec;
};

/**
 * Real records for an address: free Philadelphia data when the property is in Philadelphia, otherwise RentCast
 * when a key is set. Returns null when there's no source or no match. Cached per address for 30 days.
 */
export const lookupProperty = async (
  address: string,
  opts: { county?: string; rentcastKey?: string; withValuation?: boolean; force?: boolean } = {},
): Promise<PropertyRecord | null> => {
  if (!looksComplete(address)) return null;
  const philly = isPhiladelphia(address, opts.county);
  if (!philly && !opts.rentcastKey) return null;
  const key = `${philly ? 'phl' : 'rc'}${opts.withValuation && !philly ? '+avm' : ''}:${address.trim().toUpperCase().replace(/\s+/g, ' ')}`;
  const cached = opts.force ? undefined : cacheGet(key); // force = the user clicked "Look up" — ask again
  if (cached !== undefined) return cached;
  let rec = philly ? await lookupPhilly(address) : null;
  if (!rec && opts.rentcastKey) rec = await lookupRentCast(address, opts.rentcastKey, !!opts.withValuation);
  if (rec) cacheSet(key, rec); // don't remember misses — a corrected address or newer records should be tried again
  return rec;
};
