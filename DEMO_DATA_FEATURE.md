# Demo Data Auto-Population Feature

## Overview

When users select a **state** and then a **county** in the NORMAL version of the calculator, the app automatically populates third-party closing cost fields with realistic demo data for that county.

## What Gets Auto-Populated

When a county is selected, the following fields are automatically filled with county-average data:

| Field | Source | Example (PA - Allegheny County) |
|-------|--------|----------------------------------|
| **Inspection Cost** | County database | $350 |
| **Appraisal Cost** | County database | $450 |
| **Recording Fees** | County database | $175 |
| **Legal & Settlement Fees** | County database (lawyer fee) | $650 |

## How It Works

### Step 1: Select a State
User selects a state from the state dropdown (e.g., "Pennsylvania")

### Step 2: Select a County
Once state is selected, the county dropdown becomes available. User selects a county (e.g., "Allegheny County")

### Step 3: Auto-Population
When county is selected, the onChange handler:
1. Calls `getCountyThirdPartyCosts(state, county)` to fetch county-level costs
2. Calls `convertCountyCostsToFormData(costs)` to map database fields to form field names
3. Automatically updates these form fields:
   - `inspectionCost`
   - `appraisalCost`
   - `recordingFees`
   - `legalSettlementFees`

### Step 4: User Can Edit
All auto-populated values are editable - users can manually adjust any field if needed.

## Code Implementation

### 1. New Function in `thirdPartyCosts.ts`

```typescript
export const convertCountyCostsToFormData = (costs: CountyLevelCosts): Record<string, number> => {
  return {
    inspectionCost: costs.inspectionCost,
    appraisalCost: costs.appraisalCost,
    recordingFees: costs.recordingFees,
    legalSettlementFees: costs.lawyerFee,
  };
};
```

Maps the database structure to form input names.

### 2. Updated Import in `InputSections.tsx`

```typescript
import { getCountiesForState, getCountyThirdPartyCosts, convertCountyCostsToFormData } from '../utils/thirdPartyCosts';
```

### 3. Enhanced County Selector in `InputSections.tsx`

```typescript
<select 
  value={inputs.county || ''}
  onChange={(e) => {
    const county = e.target.value;
    onInputChange('county', county);
    
    // Auto-populate demo data for 3rd party costs when county is selected
    if (county && inputs.state) {
      const costs = getCountyThirdPartyCosts(inputs.state, county);
      const formData = convertCountyCostsToFormData(costs);
      
      // Apply all demo data
      Object.entries(formData).forEach(([field, value]) => {
        onInputChange(field as keyof LoanInputs, value);
      });
    }
  }}
>
  {/* County options */}
</select>
```

## Database Coverage

The system has realistic county-level data for all 3,143 US counties covering:

- **States**: All 50 US states + DC
- **Cost Types**:
  - Home Inspection
  - Appraisal
  - Survey (recorded but not auto-populated)
  - Pest Inspection (recorded but not auto-populated)
  - Attorney/Closing Fees
  - Title Insurance Rate (%)
  - Recording Fees
  - Credit Report (recorded but not auto-populated)
  - Flood Determination (recorded but not auto-populated)

### Currently Auto-Populated (4 fields)
- Inspection Cost
- Appraisal Cost
- Recording Fees
- Legal & Settlement Fees

### Available in Database (5 additional fields)
- Survey Fee
- Pest Inspection Cost
- Credit Report Fee
- Flood Determination Fee
- Title Insurance Rate (%)

These can be easily added to auto-population in the future by extending `convertCountyCostsToFormData()`.

## Example Workflow

```
1. User opens NORMAL version of calculator
2. Selects State: "Pennsylvania"
3. County dropdown populates with PA counties
4. User selects County: "Allegheny County"
5. Form updates with realistic Allegheny County averages:
   - Inspection Cost: $350
   - Appraisal Cost: $475
   - Recording Fees: $175
   - Legal & Settlement: $650
6. Demo deals for Pittsburgh area now have realistic cost estimates
```

## Benefits

✅ **Faster Deal Analysis**: Users get realistic costs immediately without researching  
✅ **Better Demo Experience**: New users see how the calculator works with realistic numbers  
✅ **Reduced Data Entry**: 4 common fields auto-filled based on location  
✅ **Still Editable**: Users can override any value for their specific scenario  
✅ **Scalable**: Easy to add more auto-populated fields later  
✅ **Database-Driven**: All 3,143 counties have accurate baseline data  

## Future Enhancements

1. Add survey fees to auto-population
2. Add pest inspection fees to auto-population
3. Add title insurance rate calculation (currently uses % field)
4. Store user preferences for frequently-used overrides
5. Show comparison: "County average vs. your entry"
6. Add historical trends: "Last year average for this county"

## Testing Checklist

- ✅ Select state → county dropdown shows counties
- ✅ Select county → Inspection cost auto-fills correctly
- ✅ Select county → Appraisal cost auto-fills correctly
- ✅ Select county → Recording fees auto-fills correctly
- ✅ Select county → Legal & Settlement fees auto-fills correctly
- ✅ User can edit auto-populated values
- ✅ Works across all 50 states
- ✅ Gracefully handles counties with default values
- ✅ No build errors or TypeScript warnings

## Version Support

- ✅ **NORMAL**: Demo data auto-population enabled (this feature)
- ❌ **HIDEOUT**: Not applicable (uses different fee structure)
- ❌ **CUSTOM**: Not applicable (uses custom configuration)

## Files Modified

1. `utils/thirdPartyCosts.ts` - Added `convertCountyCostsToFormData()` function
2. `components/InputSections.tsx` - Enhanced county selector with auto-population logic

## Build Status

- ✅ Build passes (0 errors)
- ✅ 751 modules transformed
- ✅ No TypeScript warnings related to this feature
- ✅ Chunk size: 2,227.35 kB (minified), 505.46 kB (gzipped)
