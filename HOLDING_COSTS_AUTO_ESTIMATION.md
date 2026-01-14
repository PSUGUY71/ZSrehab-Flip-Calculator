# Holding Costs Auto-Estimation Implementation

## Overview
Implemented automatic holding cost estimation to prevent users from submitting deals with $0 holding costs when holding months >= 3.

## Features Implemented

### 1. Auto-Estimation Function (`utils/stateHoldingCosts.ts`)
- **`estimateMonthlyUtilities(state)`**: Returns regional utility estimates
  - Northeast: $150/month (higher heating costs)
  - South: $100/month (lower heating, AC costs)
  - Other: $125/month (default)
  
- **`estimateHoldingCosts(purchasePrice, state, existingElectric)`**: Comprehensive estimation
  - Calculates insurance based on state and property value
  - Calculates property tax based on state rate
  - Estimates utilities if not provided
  - Flags "very conservative" if total < $500/month

### 2. Auto-Population Logic (`components/InputSections.tsx`)
- **Triggers when**: Holding months >= 3, state selected, purchase price > 0
- **Auto-populates**:
  - Insurance checkbox: Checked by default with state-based estimate
  - Taxes checkbox: Checked by default with state-based estimate
  - Utilities: Auto-filled with regional estimate if currently $0
- **Prevents overwriting**: Only populates if values are currently zero/unchecked

### 3. Validation & Warnings
- **Insufficient Costs Warning**: Shows when monthly holding costs < $500
- **Auto-Estimation Display**: Shows estimated values with data sources
- **Save Validation**: Prevents saving (with confirmation) when holding costs are too low

### 4. UI Enhancements
- **Estimate Display**: Shows insurance, taxes, and utilities estimates with state-based data sources
- **Checkbox Labels**: Display estimated values next to checkbox labels
- **Help Text**: Updated to show estimates and typical ranges
- **"Very Conservative" Flag**: Warns when estimates are below $500/month

## State-Based Data

### Insurance Rates (per $100k/month)
- PA: $8, NJ: $10, NY: $12, CA: $6, TX: $15, FL: $18, etc.

### Property Tax Rates (annual %)
- PA: 1.5%, NJ: 2.4%, NY: 1.8%, CA: 0.73%, TX: 2.0%, FL: 0.98%, etc.

### Utilities (monthly)
- Northeast: $150/month
- South: $100/month
- Other: $125/month

## Acceptance Criteria Status

✅ **Cannot submit form with 6-month hold and $0 holding costs**
- Validation added in `handleSaveDeal()` with confirmation dialog

✅ **User sees reasonable estimates with data sources shown**
- Estimates displayed in blue info box with state-based sources
- Checkbox labels show estimated values

✅ **Estimates are editable but not deletable to zero**
- Users can edit values but validation prevents saving with $0
- Checkboxes can be unchecked, but warning appears

## Files Modified

1. **`utils/stateHoldingCosts.ts`**
   - Added `estimateMonthlyUtilities()`
   - Added `estimateHoldingCosts()` function
   - Added `HoldingCostEstimates` interface

2. **`components/InputSections.tsx`**
   - Added auto-estimation useEffect hook
   - Updated warning section with comprehensive validation
   - Enhanced checkbox labels with estimates
   - Added "very conservative" flag display

3. **`App.tsx`**
   - Added validation in `handleSaveDeal()` to prevent saving with insufficient costs

## Usage

When a user:
1. Sets holding months to 3 or more
2. Selects a state
3. Enters a purchase price

The system will:
- Automatically check insurance and taxes checkboxes
- Populate estimated values based on state averages
- Show estimates with data sources
- Warn if estimates are "very conservative" (< $500/month)
- Prevent saving with insufficient costs (with confirmation)

## Example

**Scenario**: User enters 6-month hold, PA state, $100k purchase price

**Auto-Estimated**:
- Insurance: $8/month (PA average: $8 per $100k)
- Property Tax: $125/month (PA: 1.5% annual = $1,500/year ÷ 12)
- Utilities: $150/month (Northeast average)
- **Total**: $283/month
- **Flag**: "Very conservative" warning (below $500/month)

**User Action**: Can edit values, but will see warning when saving if total < $500/month.

