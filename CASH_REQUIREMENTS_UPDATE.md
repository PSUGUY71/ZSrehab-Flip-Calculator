# Cash Requirements Update - Contingency & Emergency Buffer

## Overview
Updated the cash requirements calculation and display to:
1. Automatically calculate contingency at 15% of rehab budget (changed from 25%)
2. Add emergency buffer suggestions (5-10% of total deal cost)
3. Provide clear "you need this much" messaging

## Changes Made

### 1. Calculation Engine (`utils/calculations.ts`)

#### Contingency Calculation (Changed from 25% to 15%)
```typescript
// OLD: const liquidityOptionA = liquidityClosingCosts + (rehabBudget * 0.25);
// NEW:
const rehabContingency = rehabBudget * 0.15; // Automatic 15% calculation
const liquidityOptionA = liquidityClosingCosts + rehabContingency;
```

#### Emergency Buffer Calculation (New)
```typescript
// Emergency buffer: 5-10% of total deal cost (suggested, not required by lender)
const totalDealCost = purchasePrice + rehabBudget;
const emergencyBuffer5Percent = totalDealCost * 0.05;
const emergencyBuffer10Percent = totalDealCost * 0.10;
```

### 2. Types (`types.ts`)

Added new fields to `CalculatedResults`:
```typescript
rehabContingency: number; // 15% of rehab budget (automatic)
emergencyBuffer5Percent: number; // 5% of total deal cost (suggested)
emergencyBuffer10Percent: number; // 10% of total deal cost (suggested)
```

### 3. CashRequiredSummary Component (`components/CashRequiredSummary.tsx`)

#### Updated Contingency Display
- **Label**: "4. Contingency Reserves"
- **Calculation**: "Automatic: 15% of rehab budget (lender requirement)"
- **Breakdown**: Shows the 15% rehab contingency amount
- **Color**: Orange theme

#### New Emergency Buffer Section
- **Label**: "5. Emergency Buffer (Suggested)"
- **Calculation**: "Optional: 5-10% of total deal cost"
- **Display**: Shows both 5% and 10% options
- **Color**: Yellow theme (dashed border to indicate optional)
- **Note**: "Extra safety net for major unexpected issues (not required by lender)"

#### Enhanced "You Need This Much" Section
- **Large, prominent display**: Dark gradient background
- **Clear messaging**: "YOU NEED THIS MUCH:" in bold
- **Shows user's liquidity**: Compares entered liquidity to required amount
- **Color coding**: Green if sufficient, red if insufficient
- **Optional buffer display**: Shows total with 5% emergency buffer

## Acceptance Criteria Status

✅ **All cash needs visible by timeline**: Timeline breakdown shows all phases  
✅ **Contingency automatically calculated at 15%**: Changed from 25% to 15%  
✅ **Emergency buffer suggested (5-10%)**: New section with both options  
✅ **Clear "you need this much" messaging**: Large, prominent display with clear wording  

## Example Display

### Scenario: $100k purchase, $30k rehab

**Timeline Breakdown:**

1. **Earnest Money**: $5,000 (Pre-offer)
2. **Down Payment**: $15,000 (At closing)
3. **Monthly During Hold**: $7,200 (6 months)
4. **Contingency Reserves**: $4,500
   - 15% Rehab Contingency: $4,500
   - Buffer for unexpected costs and rehab overruns
5. **Emergency Buffer (Suggested)**: $6,500 - $13,000
   - 5% Buffer: $6,500
   - 10% Buffer: $13,000
   - Extra safety net (not required by lender)

**YOU NEED THIS MUCH:**
- **Minimum Required**: $31,700
- **With 5% Emergency Buffer**: $38,200

## Benefits

1. **More Realistic Contingency**: 15% is more typical for rehab projects
2. **Better Planning**: Emergency buffer helps users plan for worst-case scenarios
3. **Clear Messaging**: Users immediately see what they need
4. **Flexibility**: Shows both minimum required and recommended with buffer
5. **Transparency**: Clear breakdown of all components

## Files Modified

1. **`utils/calculations.ts`**
   - Changed contingency from 25% to 15%
   - Added emergency buffer calculations (5% and 10%)
   - Updated comments to reflect 15%

2. **`types.ts`**
   - Added `rehabContingency` field
   - Added `emergencyBuffer5Percent` field
   - Added `emergencyBuffer10Percent` field

3. **`components/CashRequiredSummary.tsx`**
   - Updated contingency display to show 15%
   - Added emergency buffer section
   - Enhanced "You Need This Much" messaging
   - Added comparison with user's entered liquidity

## Formula Updates

### Required Liquidity (Lender Requirement)
```
Option A = (Closing Costs + Gap + Per Diem - Commission Credit) + (15% of Rehab)
Option B = (Closing Costs + Gap + Per Diem - Commission Credit) + $15,000
Required Liquidity = Max(Option A, Option B)
```

### Emergency Buffer (Suggested)
```
Total Deal Cost = Purchase Price + Rehab Budget
5% Buffer = Total Deal Cost × 0.05
10% Buffer = Total Deal Cost × 0.10
```

## User Experience Improvements

1. **Visual Hierarchy**: Dark gradient for "You Need This Much" makes it stand out
2. **Color Coding**: 
   - Green = Sufficient liquidity
   - Red = Insufficient liquidity
   - Yellow = Optional/suggested
3. **Clear Labels**: Each section clearly explains what it is and when it's needed
4. **Comparison**: Shows user's entered liquidity vs. required amount
5. **Recommendations**: Shows both minimum and recommended (with buffer) amounts

