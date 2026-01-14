# Cash Timeline Breakdown Implementation

## Overview
Restructured the "Cash You'll Need" section to show a timeline breakdown of when cash is required, replacing the single "Total Liquidity Needed" number with a detailed timeline view.

## Problem Solved

**Before**: Users only saw a single number "Total Liquidity Needed: $13,402.80" with no breakdown of when cash is needed.

**After**: Users now see a clear timeline breakdown showing:
1. Earnest money (pre-offer)
2. Down payment (at closing)
3. Monthly during hold
4. Contingency reserves

## Features Implemented

### 1. Timeline Breakdown Display

The component now shows four distinct timeline phases:

#### Phase 1: Earnest Money (Pre-Offer)
- **When**: Before closing (pre-offer)
- **Amount**: `inputs.earnestMoneyDeposit`
- **Color**: Blue theme
- **Details**: Shows if no earnest money is entered

#### Phase 2: Down Payment (At Closing)
- **When**: At closing
- **Amount**: `results.totalCashToClose` (includes gap + closing costs)
- **Color**: Green theme
- **Breakdown**:
  - Gap Amount
  - Closing Costs
  - Less: Agent Credit (if applicable)

#### Phase 3: Monthly During Hold
- **When**: Throughout the holding period
- **Amount**: `results.totalHoldingCosts`
- **Color**: Purple theme
- **Breakdown**:
  - Monthly Payment × holding months
  - Utilities, Insurance & Taxes
  - Total for the holding period

#### Phase 4: Contingency Reserves
- **When**: Required by lender (held in reserve)
- **Amount**: `Max(25% of rehab, $15,000)`
- **Color**: Orange theme
- **Purpose**: Buffer for unexpected costs and rehab overruns

### 2. Visual Design

- **Color-coded sections**: Each phase has a distinct color (blue, green, purple, orange)
- **Left border accent**: 4px colored border on the left of each section
- **Clear hierarchy**: Bold titles, smaller subtitles, detailed breakdowns
- **Total summary**: Large, prominent total at the bottom

### 3. Calculation Details

#### Earnest Money
```typescript
const earnestMoney = inputs.earnestMoneyDeposit || 0;
```

#### Down Payment at Closing
```typescript
const downPaymentAtClosing = results.totalCashToClose;
// Includes: gapAmount + totalClosingCosts - buyerAgentCommissionCredit
```

#### Monthly Holding Costs
```typescript
const monthlyHoldingCosts = results.totalHoldingCosts;
// Includes: interest payments + utilities + insurance + taxes for holding period
```

#### Contingency Reserves
```typescript
const liquidityClosingCosts = 
  totalClosingCosts + gapAmount + perDiemInterest - buyerAgentCommissionCredit;
const contingencyReserves = requiredLiquidity - liquidityClosingCosts;
// Where requiredLiquidity = Max(liquidityClosingCosts + 25% rehab, liquidityClosingCosts + $15k)
```

### 4. Total Liquidity Needed

The total is displayed prominently at the bottom:
- **Formula**: `Max(Closing + Gap + PerDiem + 25% Rehab, Closing + Gap + PerDiem + $15k)`
- **Includes**: All four phases combined
- **Purpose**: Lender requirement for liquidity verification

## Example Display

### Scenario: $100k purchase, $30k rehab, 6-month hold

**1. Earnest Money** (Blue)
- Pre-offer (before closing)
- $5,000

**2. Down Payment** (Green)
- At closing (gap + closing costs)
- $15,000
  - Gap Amount: $10,000
  - Closing Costs: $5,500
  - Less: Agent Credit: -$500

**3. Monthly During Hold** (Purple)
- 6 months × $1,200/mo
- $7,200
  - Monthly Payment (6 mo): $6,000
  - Utilities, Insurance & Taxes: $1,200
  - Total Holding Costs: $7,200

**4. Contingency Reserves** (Orange)
- Lender requirement: Max(25% rehab, $15k)
- $15,000
  - Buffer for unexpected costs and rehab overruns

**TOTAL LIQUIDITY NEEDED**: $42,200

## Benefits

1. **Clear Timeline**: Users understand when cash is needed at each stage
2. **Better Planning**: Helps users plan cash flow throughout the deal
3. **Transparency**: Shows breakdown of each component
4. **Lender Requirements**: Clearly shows what lenders require
5. **Risk Awareness**: Highlights contingency reserves needed

## Files Modified

1. **`components/CashRequiredSummary.tsx`**
   - Restructured to show timeline breakdown
   - Added four color-coded sections
   - Added detailed breakdowns for each phase
   - Maintained existing warnings and validation

## Acceptance Criteria Status

✅ **Earnest money (pre-offer)**: Displayed with blue theme, shows amount and timing  
✅ **Down payment (at closing)**: Displayed with green theme, shows breakdown  
✅ **Monthly during hold**: Displayed with purple theme, shows monthly costs and total  
✅ **Contingency reserves**: Displayed with orange theme, shows lender requirement  
✅ **Total liquidity needed**: Prominently displayed at bottom  
✅ **Visual clarity**: Color-coded sections with clear hierarchy  
✅ **Detailed breakdowns**: Each section shows component details  

## Future Enhancements

- Add date estimates for each phase
- Show cash flow timeline chart
- Add ability to adjust holding period and see impact
- Show cumulative cash needed over time
- Add comparison to user's entered liquidity

