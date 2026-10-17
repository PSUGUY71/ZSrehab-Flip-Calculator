/**
 * Pennsylvania realty transfer tax (RTT).
 *
 * Every deed pays 1% to the state plus a LOCAL tax (municipality + school district) on the price.
 * Almost everywhere the local portion is 1% (2% total). The places below charge a different local rate.
 *
 * Source: Chicago Title / FNF "Variations From 1% Local Transfer Tax — As of January 21, 2026"
 * (philadelphiancs.ctic.com). Philadelphia cross-checked with phila.gov (4.578% total since 7/1/2025).
 * Free public data — refresh this table when the chart is reissued.
 *
 * Who pays is negotiable; PA custom is buyer and seller split it 50/50.
 */

export const PA_STATE_RTT = 1; // percent, statewide
export const PA_STANDARD_LOCAL_RTT = 1; // percent, everywhere not listed below
export const PA_RTT_SOURCE_DATE = '2026-01-21';

/** County (as stored in inputs.county) → municipality → LOCAL rate in percent (state 1% is added on top). */
export const PA_LOCAL_RTT_VARIATIONS: Record<string, Record<string, number>> = {
  'Allegheny County': {
    'Bellevue Boro': 1.5,
    'Bethel Park Municipality': 1.5,
    'Greentree Boro': 1.5,
    'Hampton Twp.': 1.5,
    'McCandless Twp.': 1.5,
    'McKeesport City': 2,
    'Monroeville Municipality': 1.5,
    'Mt. Lebanon Municipality': 1.5,
    'Mt. Oliver Boro': 2,
    "O'Hara Twp.": 1.5,
    'Penn Hills Municipality': 2,
    'Pine Twp.': 1.5,
    'Pittsburgh, City of (Pittsburgh School District)': 4,
    'Pittsburgh, City of (Baldwin-Whitehall School District)': 3.5,
    'Upper St. Clair Twp.': 1.5,
    'West Deer Twp.': 1.5,
    'Whitehall Boro': 1.25,
  },
  'Beaver County': { 'Georgetown Boro': 0.5, 'Hookstown Boro': 0.5 },
  'Berks County': { 'Reading, City of': 4 },
  'Centre County': { 'Ferguson Twp.': 1.75, 'State College Boro': 2, 'Taylor Twp.': 0.5 },
  'Chester County': { 'Coatesville, City of': 2.5, 'Malvern Boro': 1.5, 'Tredyffrin Twp.': 1.5 },
  'Clinton County': { 'Colebrook Twp.': 0.5, 'East Keating Twp.': 0.5 },
  'Delaware County': { 'Chester City': 1.5, 'Radnor Twp.': 1.5, 'Upper Darby Twp.': 1.5, 'Upper Providence Twp.': 2 },
  'Erie County': { 'Edinboro Borough': 1.5 },
  'Lackawanna County': { 'Scranton, City of': 2.7 },
  'Lehigh County': { 'Allentown, City of': 1.5 },
  'Luzerne County': { 'Kingston Boro': 1.5, 'Wilkes-Barre, City of': 2.5, 'Pittston, City of': 2.5 },
  'Mercer County': { 'Farrell, City of': 2, 'Hermitage, City of': 2, 'Sharon, City of': 2, 'Greenville Boro': 2 },
  'Philadelphia County': { 'Philadelphia, City of': 3.578 },
  'Somerset County': { 'Wellersburg Boro': 0.5 },
  'Washington County': { 'Peters Township': 1.5 },
  'Westmoreland County': { 'Greensburg, City of': 1.5, 'Latrobe, City of': 1.5, 'Murrysville Municipality': 1.5 },
};

/** Municipalities in this county with a non-standard local rate (empty → whole county is standard). */
export const paMunicipalitiesWithVariation = (county?: string): string[] =>
  Object.keys(PA_LOCAL_RTT_VARIATIONS[county || ''] || {}).sort();

/** Total PA transfer tax % (state + local) for the county/municipality; standard 2% when not listed. */
export const paTransferTaxTotal = (county?: string, municipality?: string): { local: number; total: number } => {
  // Philadelphia County is one municipality — no need to pick it
  const towns = PA_LOCAL_RTT_VARIATIONS[county || ''] || {};
  const only = Object.keys(towns).length === 1 && county === 'Philadelphia County' ? Object.values(towns)[0] : undefined;
  const local = only ?? towns[municipality || ''] ?? PA_STANDARD_LOCAL_RTT;
  return { local, total: Math.round((PA_STATE_RTT + local) * 1000) / 1000 };
};

/** Buyer's and seller's share of the PA transfer tax (default 50/50 PA custom), in percent of price. */
export const paTransferTaxShares = (county?: string, municipality?: string) => {
  const { total } = paTransferTaxTotal(county, municipality);
  const half = Math.round((total / 2) * 1000) / 1000;
  return { total, buyerRate: half, sellerRate: half };
};
