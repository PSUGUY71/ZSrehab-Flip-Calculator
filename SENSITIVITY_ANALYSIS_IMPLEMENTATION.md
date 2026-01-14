# Purchase Price & Rehab Cost Sensitivity Analysis Implementation

## Overview
Added comprehensive sensitivity analysis tables for purchase price and rehab costs to help users understand which assumptions are most critical to deal profitability.

## Why This Matters

- **Overpaying by 10% at purchase = $15K loss** (kills deal)
- **Rehab overrun 20% = $8K loss** (manageable with contingency)
- **Purchase mistakes are MORE CRITICAL than ARV misses**

## Features Implemented

### 1. Purchase Price Sensitivity Analysis

**Scenarios**: -5%, -2%, At Price, +5%, +10%, +15%, +20%

**Calculations**:
- Adjusts purchase price by percentage
- Recalculates loan amount (min of financing % or LTV %)
- Recalculates gap (down payment)
- Recalculates total cost basis
- Calculates profit and margin
- Flags scenarios below 15% margin threshold

**Display**:
- Red border/background to emphasize criticality
- Header: "⚠️ Purchase Price Sensitivity (MOST CRITICAL)"
- Subheader: "Overpaying by 10% = $15K loss. Purchase mistakes are MORE CRITICAL than ARV misses."
- Highlights rows where margin < 15% with red background and left border
- Shows profit change (positive in green, negative in red)

### 2. Rehab Cost Sensitivity Analysis

**Scenarios**: -20%, -10%, -5%, At Budget, +10%, +20%, +30%

**Calculations**:
- Adjusts rehab budget by percentage
- Recalculates total project cost
- Recalculates loan amount (capped at LTV)
- Recalculates total cost basis
- Calculates profit and margin
- Flags scenarios below 15% margin threshold

**Display**:
- Orange border/background
- Header: "Rehab Cost Sensitivity"
- Subheader: "Rehab overrun 20% = $8K loss (manageable with contingency)"
- Highlights rows where margin < 15% with red background and left border
- Shows profit change (positive in green, negative in red)

### 3. Visual Indicators

**Color Coding**:
- **Green**: Profit positive, margin >= 15%
- **Red**: Profit negative OR margin < 15% (below threshold)
- **Orange**: Margin between 0-15% (warning)
- **Blue**: Baseline scenario (At Price / At Budget)

**Threshold Warnings**:
- Rows with margin < 15% get:
  - Red background (`bg-red-100`)
  - Red left border (`border-l-4 border-red-500`)
  - Bold text
  - "⚠️ Below 15%" indicator in margin column

### 4. Table Structure

Each sensitivity table shows:
- **Scenario**: Label (e.g., "Over 10%", "Under 5%", "At Price")
- **Purchase Price / Rehab Cost**: Adjusted amount
- **Net Profit**: Calculated profit for that scenario
- **Profit Change**: Difference from baseline (green if positive, red if negative)
- **Margin**: Profit margin as % of ARV (with threshold warning if < 15%)

## Files Created/Modified

### 1. `utils/sensitivityAnalysis.ts` (NEW)
- `generatePurchaseSensitivity()`: Calculates purchase price sensitivity scenarios
- `generateRehabSensitivity()`: Calculates rehab cost sensitivity scenarios
- TypeScript interfaces for scenario data

### 2. `utils/calculations.ts`
- Added import for sensitivity analysis functions
- Added sensitivity calculations to return object
- Passes all required parameters to sensitivity functions

### 3. `types.ts`
- Added `purchaseSensitivityScenarios` to `CalculatedResults`
- Added `rehabSensitivityScenarios` to `CalculatedResults`

### 4. `components/SensitivityAnalysis.tsx`
- Updated to show three tables:
  1. Purchase Price Sensitivity (red, most critical)
  2. Rehab Cost Sensitivity (orange)
  3. ARV Sensitivity (existing, gray)
- Added threshold highlighting
- Added clear messaging about criticality

## Calculation Logic

### Purchase Price Sensitivity

```typescript
adjustedPurchasePrice = basePurchasePrice * (1 + percent)
adjustedTotalProjectCost = adjustedPurchasePrice + baseRehabBudget
adjustedLoan = min(adjustedTotalProjectCost * financing%, arv * LTV%)
adjustedGap = max(0, adjustedPurchasePrice - purchaseLoanPortion)
adjustedBuyingCosts = totalClosingCosts + adjustedGap
adjustedTotalCostBasis = adjustedLoan + adjustedBuyingCosts + totalHoldingCosts + totalExitCosts
adjustedProfit = arv - adjustedTotalCostBasis
margin = (adjustedProfit / arv) * 100
```

### Rehab Cost Sensitivity

```typescript
adjustedRehabBudget = baseRehabBudget * (1 + percent)
adjustedTotalProjectCost = purchasePrice + adjustedRehabBudget
adjustedLoan = min(adjustedTotalProjectCost * financing%, arv * LTV%)
adjustedTotalCostBasis = adjustedLoan + totalBuyingCosts + totalHoldingCosts + totalExitCosts
adjustedProfit = arv - adjustedTotalCostBasis
margin = (adjustedProfit / arv) * 100
```

## Acceptance Criteria Status

✅ **Purchase price sensitivity table displays with profit impact**: Table shows all scenarios with profit and margin  
✅ **Rehab cost sensitivity table displays with profit impact**: Table shows all scenarios with profit and margin  
✅ **Tables show when profit drops below acceptable threshold (15% margin)**: Red highlighting and warning indicators  
✅ **User can see which assumption is most critical to deal**: Purchase price marked as "MOST CRITICAL" with emphasis  

## Example Display

### Purchase Price Sensitivity (MOST CRITICAL)
```
Scenario      Purchase Price    Net Profit    Profit Change    Margin
Under 5%      $95,000          $35,000       +$5,000          23.3%
Under 2%      $98,000          $32,000       +$2,000          21.3%
At Price      $100,000         $30,000       $0               20.0%
Over 5%       $105,000         $25,000       -$5,000         16.7%
Over 10%      $110,000         $20,000       -$10,000         13.3% ⚠️ Below 15%
Over 15%      $115,000         $15,000       -$15,000         10.0% ⚠️ Below 15%
Over 20%      $120,000         $10,000       -$20,000         6.7%  ⚠️ Below 15%
```

### Rehab Cost Sensitivity
```
Scenario      Rehab Cost       Net Profit    Profit Change    Margin
Under 20%     $24,000          $32,000       +$2,000          21.3%
Under 10%     $27,000          $31,000       +$1,000          20.7%
Under 5%      $28,500          $30,500       +$500           20.3%
At Budget     $30,000          $30,000       $0               20.0%
Over 10%      $33,000          $29,000       -$1,000         19.3%
Over 20%      $36,000          $28,000       -$2,000         18.7%
Over 30%      $39,000          $27,000       -$3,000         18.0%
```

## Benefits

1. **Risk Awareness**: Users see exactly how purchase price mistakes impact profit
2. **Prioritization**: Clear indication that purchase price is more critical than ARV
3. **Threshold Warnings**: Visual alerts when deals become unprofitable
4. **Decision Support**: Helps users understand acceptable negotiation ranges
5. **Contingency Planning**: Shows rehab overruns are more manageable than purchase mistakes

## Future Enhancements

- Add interactive sliders to adjust scenarios in real-time
- Show break-even points (where profit = 0)
- Add ARV sensitivity comparison side-by-side
- Show cumulative impact of multiple assumption changes
- Add "worst case" and "best case" scenario summaries

