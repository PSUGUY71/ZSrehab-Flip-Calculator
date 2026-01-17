/**
 * Validation module for closing cost engine
 * Validates inputs and configurations
 */

import {
  DealInput,
  JurisdictionProfile,
  ValidationError,
  ClosingCostEngineError,
} from "./types";

/**
 * Validate a deal input
 */
export function validateDealInput(input: DealInput): ValidationError[] {
  const errors: ValidationError[] = [];

  // Property validation
  if (!input.property.state) {
    errors.push({ field: "property.state", message: "State is required" });
  }

  // Financial validation
  if (input.purchase_price <= 0) {
    errors.push({
      field: "purchase_price",
      message: "Purchase price must be greater than 0",
      value: input.purchase_price,
    });
  }

  if (input.loan_amount < 0 || input.loan_amount > input.purchase_price) {
    errors.push({
      field: "loan_amount",
      message: "Loan amount must be between 0 and purchase price",
      value: input.loan_amount,
    });
  }

  // Date validation
  try {
    const closingDate = new Date(input.closing_date);
    if (isNaN(closingDate.getTime())) {
      throw new Error("Invalid date");
    }
  } catch {
    errors.push({
      field: "closing_date",
      message: "Closing date must be valid ISO 8601 format",
      value: input.closing_date,
    });
  }

  // Docs validation
  if (input.docs.deed_docs_count < 0) {
    errors.push({
      field: "docs.deed_docs_count",
      message: "Deed doc count must be non-negative",
    });
  }
  if (input.docs.deed_pages < 0) {
    errors.push({
      field: "docs.deed_pages",
      message: "Deed pages must be non-negative",
    });
  }
  if (input.docs.mortgage_docs_count < 0) {
    errors.push({
      field: "docs.mortgage_docs_count",
      message: "Mortgage doc count must be non-negative",
    });
  }
  if (input.docs.mortgage_pages < 0) {
    errors.push({
      field: "docs.mortgage_pages",
      message: "Mortgage pages must be non-negative",
    });
  }

  // Tax lines validation
  if (input.tax_lines && input.tax_lines.length > 0) {
    input.tax_lines.forEach((line, idx) => {
      if (line.amount < 0) {
        errors.push({
          field: `tax_lines[${idx}].amount`,
          message: "Tax line amount must be non-negative",
        });
      }

      try {
        new Date(line.period_start);
        new Date(line.period_end);
        new Date(line.closing_date);
      } catch {
        errors.push({
          field: `tax_lines[${idx}]`,
          message: "Tax line dates must be valid ISO 8601 format",
        });
      }
    });
  }

  return errors;
}

/**
 * Validate a jurisdiction profile
 */
export function validateJurisdictionProfile(
  profile: JurisdictionProfile
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!profile.state) {
    errors.push({ field: "state", message: "State is required" });
  }

  if (!profile.transfer_taxes || !Array.isArray(profile.transfer_taxes)) {
    errors.push({
      field: "transfer_taxes",
      message: "Transfer taxes must be an array",
    });
  }

  if (!profile.recording_fees) {
    errors.push({
      field: "recording_fees",
      message: "Recording fees profile is required",
    });
  }

  if (!profile.title_insurance) {
    errors.push({
      field: "title_insurance",
      message: "Title insurance profile is required",
    });
  }

  if (!profile.settlement_fees) {
    errors.push({
      field: "settlement_fees",
      message: "Settlement fees profile is required",
    });
  }

  if (!profile.prorations) {
    errors.push({
      field: "prorations",
      message: "Prorations profile is required",
    });
  }

  // Validate prorations details
  if (profile.prorations) {
    const validDayCountMethods = [
      "actual_365",
      "actual_360",
      "30_360",
    ];
    if (
      !validDayCountMethods.includes(profile.prorations.day_count_method)
    ) {
      errors.push({
        field: "prorations.day_count_method",
        message: `Day count method must be one of: ${validDayCountMethods.join(", ")}`,
      });
    }

    const validClosingDayOwners = ["buyer", "seller"];
    if (!validClosingDayOwners.includes(profile.prorations.closing_day_owner)) {
      errors.push({
        field: "prorations.closing_day_owner",
        message: `Closing day owner must be one of: ${validClosingDayOwners.join(", ")}`,
      });
    }
  }

  return errors;
}

/**
 * Validate transfer tax item
 */
export function validateTransferTaxItem(taxItem: any): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!taxItem.name) {
    errors.push({ field: "name", message: "Tax name is required" });
  }

  if (!taxItem.base_type) {
    errors.push({ field: "base_type", message: "Base type is required" });
  }

  if (!taxItem.calc_type) {
    errors.push({ field: "calc_type", message: "Calculation type is required" });
  }

  const validCalcTypes = ["percent", "flat", "tiered_brackets"];
  if (!validCalcTypes.includes(taxItem.calc_type)) {
    errors.push({
      field: "calc_type",
      message: `Calc type must be one of: ${validCalcTypes.join(", ")}`,
    });
  }

  if (!taxItem.payer_default) {
    errors.push({
      field: "payer_default",
      message: "Payer default is required",
    });
  }

  // Validate based on calc_type
  if (taxItem.calc_type === "percent" && taxItem.rate === undefined) {
    errors.push({
      field: "rate",
      message: "Rate is required for percent calculation type",
    });
  }

  if (taxItem.calc_type === "flat" && taxItem.flat_amount === undefined) {
    errors.push({
      field: "flat_amount",
      message: "Flat amount is required for flat calculation type",
    });
  }

  if (
    taxItem.calc_type === "tiered_brackets" &&
    (!taxItem.brackets || !Array.isArray(taxItem.brackets))
  ) {
    errors.push({
      field: "brackets",
      message: "Brackets array is required for tiered_brackets calculation type",
    });
  }

  if (
    taxItem.payer_default === "split" &&
    (taxItem.split_buyer_pct === undefined ||
      taxItem.split_seller_pct === undefined)
  ) {
    errors.push({
      field: "split percentages",
      message: "Split buyer and seller percentages are required for split payer",
    });
  }

  return errors;
}

/**
 * Parse and validate ISO 8601 date
 */
export function parseISODate(dateString: string): Date {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new ClosingCostEngineError(
      "INVALID_DATE",
      `Invalid ISO 8601 date: ${dateString}`
    );
  }
  return date;
}

/**
 * Round money to cents or whole dollars
 */
export function roundMoney(
  amount: number,
  precision: "cents" | "whole_dollars"
): number {
  if (precision === "cents") {
    return Math.round(amount * 100) / 100;
  }
  return Math.round(amount);
}

/**
 * Validate that split percentages sum to 100
 */
export function validateSplitPercentages(
  buyerPct: number,
  sellerPct: number
): boolean {
  const total = buyerPct + sellerPct;
  return Math.abs(total - 100) < 0.01; // Allow 0.01% rounding error
}

/**
 * Throw if validation errors exist
 */
export function throwIfValidationErrors(errors: ValidationError[]): void {
  if (errors.length > 0) {
    throw new ClosingCostEngineError(
      "VALIDATION_ERROR",
      `Validation failed: ${errors.length} error(s)`,
      { errors }
    );
  }
}
