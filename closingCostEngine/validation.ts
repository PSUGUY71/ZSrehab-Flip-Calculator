/**
 * Validation and schema checking
 */

import { EngineValidationError, DealInput, JurisdictionProfile } from './types';

export class ValidationError extends Error {
  constructor(public errors: EngineValidationError[]) {
    super(`Validation failed: ${errors.map(e => e.message).join('; ')}`);
  }
}

/**
 * Validate deal input
 */
export function validateDealInput(input: DealInput): EngineValidationError[] {
  const errors: EngineValidationError[] = [];

  // Property validation
  if (!input.property?.state) {
    errors.push({ field: 'property.state', message: 'State is required' });
  }

  // Financial validation
  if (typeof input.purchase_price !== 'number' || input.purchase_price < 0) {
    errors.push({ field: 'purchase_price', message: 'Must be non-negative number', value: input.purchase_price });
  }

  if (typeof input.loan_amount !== 'number' || input.loan_amount < 0) {
    errors.push({ field: 'loan_amount', message: 'Must be non-negative number', value: input.loan_amount });
  }

  if (input.loan_amount > input.purchase_price) {
    errors.push({ field: 'loan_amount', message: 'Loan cannot exceed purchase price', value: input.loan_amount });
  }

  // Date validation
  if (!isValidDate(input.closing_date)) {
    errors.push({ field: 'closing_date', message: 'Must be valid ISO date YYYY-MM-DD', value: input.closing_date });
  }

  // Docs validation
  if (typeof input.docs?.deed_docs_count !== 'number' || input.docs.deed_docs_count < 0) {
    errors.push({ field: 'docs.deed_docs_count', message: 'Must be non-negative number' });
  }
  if (typeof input.docs?.deed_pages !== 'number' || input.docs.deed_pages < 0) {
    errors.push({ field: 'docs.deed_pages', message: 'Must be non-negative number' });
  }
  if (typeof input.docs?.mortgage_docs_count !== 'number' || input.docs.mortgage_docs_count < 0) {
    errors.push({ field: 'docs.mortgage_docs_count', message: 'Must be non-negative number' });
  }
  if (typeof input.docs?.mortgage_pages !== 'number' || input.docs.mortgage_pages < 0) {
    errors.push({ field: 'docs.mortgage_pages', message: 'Must be non-negative number' });
  }

  // Selections validation
  if (typeof input.selections?.owner_policy !== 'boolean') {
    errors.push({ field: 'selections.owner_policy', message: 'Must be boolean' });
  }
  if (!Array.isArray(input.selections?.endorsements)) {
    errors.push({ field: 'selections.endorsements', message: 'Must be array of strings' });
  }
  if (typeof input.selections?.cpl !== 'boolean') {
    errors.push({ field: 'selections.cpl', message: 'Must be boolean' });
  }

  return errors;
}

/**
 * Validate jurisdiction profile
 */
export function validateJurisdictionProfile(profile: JurisdictionProfile): EngineValidationError[] {
  const errors: EngineValidationError[] = [];

  if (!profile.jurisdiction_id) {
    errors.push({ field: 'jurisdiction_id', message: 'Required' });
  }
  if (!profile.level || !['state', 'county', 'city', 'zip'].includes(profile.level)) {
    errors.push({ field: 'level', message: 'Must be one of: state, county, city, zip' });
  }
  if (!profile.state) {
    errors.push({ field: 'state', message: 'Required' });
  }

  return errors;
}

/**
 * Check if string is valid ISO date
 */
function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString + 'T00:00:00Z');
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Parse ISO date string to Date
 */
export function parseISODate(dateString: string): Date {
  const date = new Date(dateString + 'T00:00:00Z');
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateString}`);
  }
  return date;
}

/**
 * Check if split percentages sum to 100
 */
export function validateSplitPercentages(buyer_pct?: number, seller_pct?: number): boolean {
  if (buyer_pct !== undefined && seller_pct !== undefined) {
    return Math.abs(buyer_pct + seller_pct - 100) < 0.01;
  }
  return true;
}

/**
 * Round to cents or whole dollars
 */
export function roundMoney(amount: number, method: 'cents' | 'whole_dollars'): number {
  if (method === 'cents') {
    return Math.round(amount * 100) / 100;
  } else {
    return Math.round(amount);
  }
}
