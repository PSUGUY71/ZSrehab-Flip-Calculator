# State-Based Closing Cost Defaults Implementation

## Overview
Implemented comprehensive state detection and selection flow that populates ALL closing cost defaults based on the selected state, replacing hardcoded Pennsylvania defaults.

## Features Implemented

### 1. Comprehensive State Defaults Database (`data/stateDefaults.json`)
- **All 50 states + DC** with complete closing cost data
- **State-specific values**:
  - CPL/Attorney closing fee (varies: PA=$125, TX=$200, CA=$350)
  - Title insurance rate (varies: NY=0.5%, TX=0.6%, CA=0.6%, PA=0% uses chart)
  - Transfer tax rate (varies: NY=1%, PA=0.5%, FL=0%)
  - Typical closing cost % of purchase (ranges: 0.5%-3%)
  - Average property tax rate (for annual estimate)
  - Typical property insurance cost (by value)
  - Avg utilities by region (northeast/south/other)

### 2. State Selection Screen (`components/StateSelectionScreen.tsx`)
- **Displays at app load** or when "New" deal is created (if no state saved)
- **Dropdown**: All 50 states + DC, sorted alphabetically
- **Preview panel**: Shows estimated defaults before selection
- **Stores selection** in localStorage for persistence
- **Allows state change** anytime via header button

### 3. Auto-Population Logic (`utils/stateDefaults.ts`)
- **`applyStateDefaults()`**: Intelligently populates defaults
  - Only updates if values are at defaults/zero (doesn't overwrite user edits)
  - Can force update when state is first selected
- **`getStateDefaults()`**: Retrieves state-specific data
- **`getAllStateCodes()`**: Returns all available state codes
- **`getStateName()`**: Gets full state name from code

### 4. Enhanced Form Components
- **State dropdown** in `InputSections.tsx` and `App.tsx`:
  - Now includes all 50 states + DC
  - Shows state name and code (e.g., "Pennsylvania (PA)")
  - Auto-populates defaults on change
  - Shows helpful message: "Closing costs set for [STATE]. Verify with your lender."
- **Dynamic help text**:
  - CPL Fee: Shows state-specific amount or "Not applicable"
  - Title Insurance: Shows if state uses rate table or percentage
  - All fields update based on selected state

### 5. User Experience Enhancements
- **State selection button** in header:
  - Shows current state name
  - Click to change state anytime
  - Opens state selection screen
- **Notification system**:
  - Shows blue notification when state changes
  - Message: "Closing costs updated for [STATE]. Verify with your lender."
  - Auto-dismisses after 5 seconds
- **State indicator** in header:
  - Shows current state name next to user email
  - Green badge for visibility

### 6. localStorage Persistence
- **Saves selected state** to `localStorage` as `zsrehab_selected_state`
- **Loads on app start** and applies defaults
- **Persists across sessions** and "New Deal" actions
- **Maintains state** when user logs out/in

## State Defaults Structure

Each state includes:
```typescript
{
  name: string;                    // Full state name
  cplFee: number;                  // CPL/Attorney fee (0 if not applicable)
  titleInsuranceRate: number;      // Percentage (0 = uses rate table)
  transferTaxRate: number;         // Percentage
  typicalClosingCostPercent: number; // Typical closing costs as % of purchase
  propertyTaxRate: number;         // Annual property tax rate %
  insurancePerMonthPer100k: number; // Insurance per $100k per month
  utilitiesRegion: 'northeast' | 'south' | 'other';
  note?: string;                   // Optional special handling note
}
```

## Example State Data

**Pennsylvania (PA)**:
- CPL Fee: $125
- Title Insurance: 0% (uses PA Title Insurance Rate Table chart)
- Transfer Tax: 0.5%
- Property Tax: 1.5% annually
- Insurance: $8/month per $100k
- Utilities: Northeast region ($150/month)

**California (CA)**:
- CPL Fee: $350
- Title Insurance: 0.6%
- Transfer Tax: 1.1%
- Property Tax: 0.73% annually (Prop 13)
- Insurance: $6/month per $100k
- Utilities: Other region ($125/month)

**Texas (TX)**:
- CPL Fee: $200
- Title Insurance: 0.6%
- Transfer Tax: 0%
- Property Tax: 2.0% annually
- Insurance: $15/month per $100k (higher due to weather risks)
- Utilities: South region ($100/month)

## Auto-Population Behavior

### When State is Selected:
1. **CPL Fee**: Updates if currently $0 or $125 (PA default)
2. **Transfer Tax Rate**: Updates if currently $0
3. **Title Insurance Rate**: Updates if currently $0 (PA stays at 0 for chart)

### When State Changes:
- Only updates fields that are at defaults/zero
- Preserves user-entered values
- Shows notification with state name
- Saves to localStorage

### When "New Deal" is Created:
- Loads saved state from localStorage
- Applies state defaults automatically
- If no state saved, shows state selection screen

## Files Modified

1. **`data/stateDefaults.json`** (NEW)
   - Comprehensive database of all 50 states + DC

2. **`utils/stateDefaults.ts`** (NEW)
   - Utility functions for state data access
   - Auto-population logic

3. **`components/StateSelectionScreen.tsx`** (NEW)
   - State selection UI component

4. **`components/InputSections.tsx`**
   - Updated state dropdown to include all states
   - Added auto-population on state change
   - Dynamic help text based on state

5. **`App.tsx`**
   - Added state selection screen logic
   - Added localStorage persistence
   - Enhanced `handleInputChange` for auto-population
   - Updated state dropdown in inline form
   - Added state change notifications
   - Added state indicator in header

6. **`components/index.ts`**
   - Exported StateSelectionScreen component

## Usage Flow

1. **First Time User**:
   - App loads → Shows state selection screen
   - User selects state → Defaults auto-populated
   - State saved to localStorage

2. **Returning User**:
   - App loads → State loaded from localStorage
   - Defaults applied automatically
   - User can change state anytime via header button

3. **New Deal**:
   - User clicks "New" → State preserved from localStorage
   - Defaults re-applied
   - If no state saved, shows selection screen

4. **State Change**:
   - User changes state in dropdown → Defaults auto-populated
   - Notification shown
   - State saved to localStorage

## Acceptance Criteria Status

✅ **State Selection Screen**: Displays at app load or when "New" deal is created  
✅ **All 50 States + DC**: Complete dropdown with all states  
✅ **Store in localStorage**: State selection persists across sessions  
✅ **Change State Anytime**: Header button allows state change  
✅ **Auto-Recalc Defaults**: All defaults update when state changes  
✅ **CPL Fee**: State-specific defaults (PA=$125, TX=$200, CA=$350, etc.)  
✅ **Title Insurance Rate**: State-specific rates (PA=0% uses chart, others vary)  
✅ **Transfer Tax Rate**: State-specific rates (NY=1%, PA=0.5%, FL=0%, etc.)  
✅ **Property Tax Rate**: State-based annual rates for estimates  
✅ **Insurance Estimates**: State-based per $100k monthly rates  
✅ **Utilities Estimates**: Regional averages (northeast/south/other)  
✅ **User Override**: All fields editable, defaults only populate if at zero/default  
✅ **Notification**: Shows message when state changes with auto-recalculation  

## Special Cases

- **Pennsylvania (PA)**: Title insurance rate stays at 0% (uses PA Title Insurance Rate Table chart)
- **States with $0 CPL Fee**: Many states don't have CPL fees (shows "Not applicable")
- **High Transfer Tax States**: DE (2.0%), NY (1.0%), CA (1.1%) have higher rates
- **High Property Tax States**: NJ (2.4%), IL (2.3%), TX (2.0%) have higher annual rates
- **High Insurance States**: FL ($18), TX ($15), LA ($15) due to weather risks

## Future Enhancements

- Add county-level defaults (some states vary by county)
- Add city-level transfer tax rates (some cities have additional taxes)
- Add lender-specific state variations
- Add historical closing cost data by state
- Add state-specific regulations and requirements

