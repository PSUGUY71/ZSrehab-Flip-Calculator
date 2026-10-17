/**
 * Pennsylvania title insurance rates — TIRBOP (Title Insurance Rating Bureau of Pennsylvania) Manual of Rates,
 * approved by the PA Insurance Department, effective 08/01/24 (member list updated 01/01/26).
 * Source: https://patitleratingbureau.org/tirbop-rate-manual/ — every TIRBOP member insurer must charge these
 * rates (PA is an "all-inclusive" rate state: search & examination are included in the premium).
 *
 * Section 5.50 (Company or Agent Procedure). Each band adds a charge "per $1,000 or fraction thereof".
 * Manual examples (used in calculations.check.ts): Sale $200,000 = $1,595.00; Non-Sale $200,000 = $1,383.25.
 */

export const PA_TITLE_MANUAL_DATE = '2024-08-01';

/** Closing Protection Letter: $125 per transaction regardless of number of letters (Manual §3.5). */
export const PA_CPL_FEE = 125;

/** Flat charge for the common lender endorsements PA 100, PA 300, PA 900 (and condo/PUD PA 810/820) (Manual §6). */
export const PA_ENDORSEMENT_FEE = 100;

type Band = { upTo: number; perThousand: number };

const SALE = { base: 569.0, bands: [
  { upTo: 45_000, perThousand: 7.41 },
  { upTo: 100_000, perThousand: 6.27 },
  { upTo: 500_000, perThousand: 5.70 },
  { upTo: 1_000_000, perThousand: 4.56 },
  { upTo: 2_000_000, perThousand: 3.42 },
  { upTo: 7_000_000, perThousand: 2.28 },
  { upTo: 30_000_000, perThousand: 1.71 },
  { upTo: Infinity, perThousand: 1.42 },
] as Band[] };

const NON_SALE = { base: 512.0, bands: [
  { upTo: 45_000, perThousand: 5.98 },
  { upTo: 100_000, perThousand: 5.41 },
  { upTo: 500_000, perThousand: 4.84 },
  { upTo: 1_000_000, perThousand: 4.27 },
  { upTo: 2_000_000, perThousand: 3.13 },
  { upTo: 7_000_000, perThousand: 1.99 },
  { upTo: 30_000_000, perThousand: 1.71 },
  { upTo: Infinity, perThousand: 1.42 },
] as Band[] };

const FIRST_BAND = 30_000; // the base charge covers $0–$30,000

const rate = (amount: number, table: typeof SALE): number => {
  if (!(amount > 0)) return 0;
  let charge = table.base;
  let from = FIRST_BAND;
  for (const band of table.bands) {
    if (amount <= from) break;
    const units = Math.ceil((Math.min(amount, band.upTo) - from) / 1000); // "or fraction thereof"
    charge += units * band.perThousand;
    from = band.upTo;
  }
  return Math.round(charge * 100) / 100;
};

/** Sale Rate — owner's policies, and owner's + loan policies issued together (Manual §5.50 A). */
export const paSaleRate = (amount: number) => rate(amount, SALE);

/** Non-Sale Rate — loan policy on a refinance (Manual §5.50 B). */
export const paNonSaleRate = (amount: number) => rate(amount, NON_SALE);

/**
 * Title premium for a purchase. When owner's and loan policies are issued simultaneously they are one policy
 * at the Sale Rate on the HIGHER of the two amounts (Manual §5.2 C) — for a flip with rehab financing the loan
 * can exceed the price. Cash purchase: Sale Rate on the price.
 */
export const paPurchaseTitlePremium = (purchasePrice: number, loanAmount = 0) =>
  paSaleRate(Math.max(purchasePrice || 0, loanAmount || 0));

/** @deprecated kept for older callers — Sale Rate on the given amount. */
export const calculatePATitleInsurance = (amount: number) => paSaleRate(amount);
