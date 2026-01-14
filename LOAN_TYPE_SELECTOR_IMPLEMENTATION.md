# Loan Type Selector Implementation

## Overview
Added loan type selector that changes ALL downstream calculations to support different financing types: Hard Money, Conventional, Portfolio, and Other.

## Problem Solved

**Before**: App assumed hard money (12% default rate) for all deals, causing incorrect calculations for:
- Conventional financing (~3.5% with PITI)
- Portfolio lenders (6-8%, varies by lender)

**After**: Users can select loan type, and all calculations adjust automatically:
- Hard Money: Interest-only payments, no PITI
- Conventional: Amortized payments with PITI option
- Portfolio: Amortized payments, terms vary
- Other: Custom configuration

## Features Implemented

### 1. Loan Type Selector (`components/InputSections.tsx`)

**Dropdown Options**:
- **Hard Money** (~12%, interest-only)
- **Conventional** (~3.5%, PITI included)
- **Portfolio Lender** (6-8%, varies)
- **Other** (custom)

**Auto-Population**:
- Selecting loan type automatically updates:
  - Interest rate (Hard Money: 12%, Conventional: 3.5%, Portfolio: 7%)
  - Loan term (Hard Money: 12 months, Conventional/Portfolio: 360 months)
  - PITI inclusion (Conventional: enabled, others: disabled)

### 2. Monthly Payment Calculation (`utils/calculations.ts`)

**Hard Money**:
```typescript
// Interest-only payments
monthlyPrincipalAndInterest = annualInterest / 12;
monthlyPayment = monthlyPrincipalAndInterest;
```

**Conventional**:
```typescript
// Amortized payments (30-year term)
monthlyPrincipalAndInterest = L * (r / (1 - (1 + r)^-n));
// Add PITI if enabled
if (includePITI) {
  monthlyPayment = monthlyPrincipalAndInterest + monthlyPITITaxes + monthlyPITIInsurance;
}
```

**Portfolio/Other**:
```typescript
// Amortized payments with specified term
monthlyPrincipalAndInterest = L * (r / (1 - (1 + r)^-n));
monthlyPayment = monthlyPrincipalAndInterest;
```

### 3. PITI Fields for Conventional Loans

**Checkbox**: "Include PITI in Monthly Payment"
- When checked, shows fields for:
  - Monthly Property Taxes (PITI)
  - Monthly Insurance (PITI)
- These are added to the principal + interest payment
- Only shown for Conventional loan type

### 4. Display Updates

**Monthly Payment Display**:
- Shows loan type-specific labels:
  - Hard Money: "Interest-Only"
  - Conventional: "PITI (Principal + Interest + Taxes + Insurance)"
  - Portfolio/Other: "Principal + Interest"
- For Conventional with PITI, shows breakdown:
  - Principal + Interest
  - Property Taxes
  - Insurance

### 5. Progressive Draw Calculations

Updated `calculateMonthlyInterest()` to handle different loan types:
- **Hard Money**: Interest-only based on drawn amount
- **Conventional/Portfolio**: Interest-only for progressive draws (even though full payment is amortized)

## Types Added

### `LoanInputs` Interface
```typescript
loanType: 'HARD_MONEY' | 'CONVENTIONAL' | 'PORTFOLIO' | 'OTHER';
includePITI: boolean;
monthlyPITITaxes: number;
monthlyPITIInsurance: number;
```

### `CalculatedResults` Interface
```typescript
monthlyPrincipalAndInterest: number; // Principal + Interest portion only
```

## Default Values

### Hard Money (Default)
- Interest Rate: 12%
- Loan Term: 12 months
- Include PITI: false
- Payment Type: Interest-only

### Conventional
- Interest Rate: 3.5%
- Loan Term: 360 months
- Include PITI: true
- Payment Type: Amortized with PITI

### Portfolio
- Interest Rate: 7%
- Loan Term: 360 months
- Include PITI: false
- Payment Type: Amortized

## Files Modified

1. **`types.ts`**
   - Added `loanType` to `LoanInputs`
   - Added `includePITI`, `monthlyPITITaxes`, `monthlyPITIInsurance` to `LoanInputs`
   - Added `monthlyPrincipalAndInterest` to `CalculatedResults`
   - Updated `DEFAULT_INPUTS` with loan type defaults

2. **`utils/calculations.ts`**
   - Updated monthly payment calculation to handle different loan types
   - Added PITI calculation for conventional loans
   - Updated progressive draw interest calculation
   - Added `monthlyPrincipalAndInterest` to return object

3. **`components/InputSections.tsx`**
   - Added loan type selector dropdown
   - Added auto-population logic when loan type changes
   - Added PITI fields section (shown only for Conventional)
   - Updated monthly payment display with loan type-specific labels
   - Added PITI breakdown display

## User Experience

### When User Selects Loan Type:

1. **Hard Money**:
   - Rate auto-sets to 12%
   - Term auto-sets to 12 months
   - PITI section hidden
   - Payment shows as "Interest-Only"

2. **Conventional**:
   - Rate auto-sets to 3.5%
   - Term auto-sets to 360 months
   - PITI section appears with checkbox checked
   - Payment shows as "PITI" with breakdown

3. **Portfolio**:
   - Rate auto-sets to 7%
   - Term auto-sets to 360 months
   - PITI section hidden
   - Payment shows as "Principal + Interest"

4. **Other**:
   - No auto-population
   - User configures all settings manually
   - PITI section hidden (can be enabled manually if needed)

## Calculation Examples

### Hard Money Example
- Loan: $100,000
- Rate: 12%
- Payment: $1,000/month (interest-only)
- Total for 6 months: $6,000

### Conventional Example (with PITI)
- Loan: $100,000
- Rate: 3.5%
- Term: 360 months
- Principal + Interest: $449/month
- Property Taxes: $150/month
- Insurance: $100/month
- **Total Payment: $699/month**
- Total for 6 months: $4,194

### Conventional Example (without PITI)
- Loan: $100,000
- Rate: 3.5%
- Term: 360 months
- Principal + Interest: $449/month
- **Total Payment: $449/month**
- Total for 6 months: $2,694

## Acceptance Criteria Status

✅ **Loan type selector changes ALL downstream calculations**: Monthly payment, holding costs, and all profit calculations update  
✅ **Hard money support**: Interest-only payments, 12% default rate  
✅ **Conventional support**: Amortized payments with PITI option, 3.5% default rate  
✅ **Portfolio support**: Amortized payments, 7% default rate  
✅ **PITI calculation**: Property taxes and insurance included in payment when enabled  
✅ **Auto-population**: Defaults update when loan type changes  
✅ **Clear labeling**: Payment displays show loan type-specific information  

## Benefits

1. **Accurate Calculations**: Users get correct numbers for their financing type
2. **Flexibility**: Supports all major financing types
3. **Ease of Use**: Auto-populates defaults based on loan type
4. **Transparency**: Clear breakdown of payment components
5. **Real-World Accuracy**: Matches actual loan structures

## Future Enhancements

- Add DSCR loan type support
- Add interest rate lookup by loan type and credit score
- Add loan comparison tool (hard money vs conventional)
- Add amortization schedule display
- Add prepayment penalty calculations

