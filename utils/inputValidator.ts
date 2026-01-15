/**
 * Input Validator for Flip Deal Analysis
 * 
 * Prevents nonsensical inputs that would generate meaningless results.
 * Acts as a quality gate before calculations.
 */

import { LoanInputs } from '../types';

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning'; // error = blocks submission, warning = allows but shows caution
}

/**
 * Validate all critical inputs before calculation
 * @returns Array of validation errors. Empty array = all valid.
 */
export const validateLoanInputs = (inputs: LoanInputs): ValidationError[] => {
  const errors: ValidationError[] = [];

  // 1. PURCHASE PRICE
  if (inputs.purchasePrice === undefined || inputs.purchasePrice === null) {
    errors.push({
      field: 'purchasePrice',
      message: 'Purchase price is required',
      severity: 'error'
    });
  } else if (inputs.purchasePrice <= 0) {
    errors.push({
      field: 'purchasePrice',
      message: 'Purchase price must be greater than $0',
      severity: 'error'
    });
  } else if (inputs.purchasePrice < 10000) {
    errors.push({
      field: 'purchasePrice',
      message: 'Purchase price less than $10,000 seems unrealistic for most markets',
      severity: 'warning'
    });
  } else if (inputs.purchasePrice > 10000000) {
    errors.push({
      field: 'purchasePrice',
      message: 'Purchase price exceeds $10M - verify this is intentional',
      severity: 'warning'
    });
  }

  // 2. ARV (After Repair Value)
  if (inputs.arv === undefined || inputs.arv === null) {
    errors.push({
      field: 'arv',
      message: 'After Repair Value (ARV) is required',
      severity: 'error'
    });
  } else if (inputs.arv <= 0) {
    errors.push({
      field: 'arv',
      message: 'ARV must be greater than $0',
      severity: 'error'
    });
  } else if (inputs.purchasePrice > 0 && inputs.arv < inputs.purchasePrice) {
    errors.push({
      field: 'arv',
      message: 'ARV cannot be less than purchase price (you can\'t lose value before rehab)',
      severity: 'error'
    });
  } else if (inputs.purchasePrice > 0) {
    const appreciationPercent = ((inputs.arv - inputs.purchasePrice) / inputs.purchasePrice) * 100;
    
    // Sanity checks based on appreciation percentage
    if (appreciationPercent < 5) {
      errors.push({
        field: 'arv',
        message: `ARV appreciation is only ${appreciationPercent.toFixed(1)}% - ensure your rehab is accounted for in ARV`,
        severity: 'warning'
      });
    } else if (appreciationPercent > 100) {
      errors.push({
        field: 'arv',
        message: `ARV appreciation of ${appreciationPercent.toFixed(1)}% (100%+ gain) seems extreme - verify your comps`,
        severity: 'warning'
      });
    }
  }

  // 3. REHAB BUDGET
  if (inputs.rehabBudget === undefined || inputs.rehabBudget === null) {
    errors.push({
      field: 'rehabBudget',
      message: 'Rehab budget is required',
      severity: 'error'
    });
  } else if (inputs.rehabBudget < 0) {
    errors.push({
      field: 'rehabBudget',
      message: 'Rehab budget cannot be negative',
      severity: 'error'
    });
  } else if (inputs.rehabBudget === 0 && inputs.arv > inputs.purchasePrice) {
    errors.push({
      field: 'rehabBudget',
      message: 'Rehab budget is $0 but ARV is higher than purchase price - verify your numbers',
      severity: 'warning'
    });
  } else if (inputs.purchasePrice > 0 && inputs.rehabBudget > inputs.purchasePrice * 2) {
    errors.push({
      field: 'rehabBudget',
      message: `Rehab budget (${(inputs.rehabBudget / inputs.purchasePrice).toFixed(1)}x purchase price) seems very high - verify this is intentional`,
      severity: 'warning'
    });
  }

  // 4. FINANCING PERCENTAGE
  if (inputs.financingPercentage === undefined || inputs.financingPercentage === null) {
    errors.push({
      field: 'financingPercentage',
      message: 'Financing percentage is required',
      severity: 'error'
    });
  } else if (inputs.financingPercentage < 0 || inputs.financingPercentage > 100) {
    errors.push({
      field: 'financingPercentage',
      message: 'Financing percentage must be between 0% and 100%',
      severity: 'error'
    });
  }

  // 5. INTEREST RATE
  if (inputs.interestRate === undefined || inputs.interestRate === null) {
    errors.push({
      field: 'interestRate',
      message: 'Interest rate is required',
      severity: 'error'
    });
  } else if (inputs.interestRate < 0) {
    errors.push({
      field: 'interestRate',
      message: 'Interest rate cannot be negative',
      severity: 'error'
    });
  } else if (inputs.interestRate > 50) {
    errors.push({
      field: 'interestRate',
      message: 'Interest rate exceeds 50% - verify this is correct (extremely predatory)',
      severity: 'warning'
    });
  }

  // 6. LOAN TERM
  if (inputs.loanTermMonths === undefined || inputs.loanTermMonths === null) {
    errors.push({
      field: 'loanTermMonths',
      message: 'Loan term is required',
      severity: 'error'
    });
  } else if (inputs.loanTermMonths < 1) {
    errors.push({
      field: 'loanTermMonths',
      message: 'Loan term must be at least 1 month',
      severity: 'error'
    });
  } else if (inputs.loanTermMonths > 360) {
    errors.push({
      field: 'loanTermMonths',
      message: 'Loan term exceeds 30 years - ensure this is intentional',
      severity: 'warning'
    });
  }

  // 7. HOLDING PERIOD
  if (inputs.holdingPeriodMonths === undefined || inputs.holdingPeriodMonths === null) {
    errors.push({
      field: 'holdingPeriodMonths',
      message: 'Holding period is required',
      severity: 'error'
    });
  } else if (inputs.holdingPeriodMonths < 1) {
    errors.push({
      field: 'holdingPeriodMonths',
      message: 'Holding period must be at least 1 month',
      severity: 'error'
    });
  } else if (inputs.holdingPeriodMonths > 120) {
    errors.push({
      field: 'holdingPeriodMonths',
      message: 'Holding period exceeds 10 years - verify this is a flip (not a long-term hold)',
      severity: 'warning'
    });
  }

  // 8. SQUARE FOOTAGE
  if (inputs.sqFt > 0 && inputs.sqFt < 500) {
    errors.push({
      field: 'sqFt',
      message: 'Square footage less than 500 SqFt - verify this is correct for the property type',
      severity: 'warning'
    });
  } else if (inputs.sqFt > 100000) {
    errors.push({
      field: 'sqFt',
      message: 'Square footage exceeds 100,000 - verify this is intentional',
      severity: 'warning'
    });
  }

  // 9. BEDS & BATHS
  if (inputs.beds < 0) {
    errors.push({
      field: 'beds',
      message: 'Number of bedrooms cannot be negative',
      severity: 'error'
    });
  }
  if (inputs.baths < 0) {
    errors.push({
      field: 'baths',
      message: 'Number of bathrooms cannot be negative',
      severity: 'error'
    });
  }

  // 10. STATE VALIDATION
  if (!inputs.state || inputs.state.trim() === '') {
    errors.push({
      field: 'state',
      message: 'State is required',
      severity: 'error'
    });
  }

  // 11. TRANSFER TAX
  if (inputs.transferTaxRate < 0 || inputs.transferTaxRate > 10) {
    errors.push({
      field: 'transferTaxRate',
      message: 'Transfer tax rate should be between 0% and 10% - verify your state',
      severity: 'warning'
    });
  }

  // 12. SELLING COMMISSION
  if (inputs.sellingSellerAgentCommissionRate < 0 || inputs.sellingSellerAgentCommissionRate > 10) {
    errors.push({
      field: 'sellingCommissionRate',
      message: 'Selling commission rate should typically be 2-6% - verify this is correct',
      severity: 'warning'
    });
  }

  // 13. FICO SCORE
  if (inputs.ficoScore > 0 && (inputs.ficoScore < 300 || inputs.ficoScore > 850)) {
    errors.push({
      field: 'ficoScore',
      message: 'FICO scores range from 300-850 - verify your score',
      severity: 'warning'
    });
  }

  return errors;
};

/**
 * Check if inputs have any CRITICAL errors (not just warnings)
 * @returns true if there are errors that should block submission
 */
export const hasValidationErrors = (inputs: LoanInputs): boolean => {
  const errors = validateLoanInputs(inputs);
  return errors.some(e => e.severity === 'error');
};

/**
 * Get only the errors (not warnings)
 */
export const getValidationErrors = (inputs: LoanInputs): ValidationError[] => {
  return validateLoanInputs(inputs).filter(e => e.severity === 'error');
};

/**
 * Get only the warnings (not errors)
 */
export const getValidationWarnings = (inputs: LoanInputs): ValidationError[] => {
  return validateLoanInputs(inputs).filter(e => e.severity === 'warning');
};

/**
 * Format validation error for display
 */
export const formatValidationError = (error: ValidationError): string => {
  return `${error.severity === 'error' ? '❌' : '⚠️'} ${error.message}`;
};

/**
 * Check specific field for errors
 */
export const getFieldErrors = (inputs: LoanInputs, fieldName: string): ValidationError[] => {
  return validateLoanInputs(inputs).filter(e => e.field === fieldName);
};
