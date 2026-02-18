# Claude Session Log — February 17, 2026

## Summary of Changes

### Session Goal
Add missing 3rd party fees to the calculator and ensure Hideout-version fees display correctly across all components.

---

### Problem 1: Missing 3rd Party Fees
The county data (`thirdPartyCosts.ts`) defined 9 fee types but only 2 were mapped to form fields. Survey, pest inspection, credit report, and flood determination fees were silently dropped. There was also no generic "other fees" catch-all.

### Problem 2: Hideout Fees Not Showing in All Displays
The `CostsBreakdown.tsx` acquisition cost summary was missing Walker fees, Hideout Transfer, Dues, and all prorations — causing the total to under-report. `ReportMode.tsx` was also missing the new fees and had a redundant `appVersion` gate hiding Hideout fees.

---

### Files Changed (7 files)

| File | Change |
|------|--------|
| `types.ts` | Added `surveyFee`, `pestInspectionCost`, `creditReportFee`, `floodDeterminationFee`, `otherThirdPartyFees` to `LoanInputs`, `CalculatedResults`, and `DEFAULT_INPUTS` |
| `utils/calculations.ts` | Destructured new fields from inputs, included them in `totalThirdPartyFees` sum, added to returned results object |
| `utils/thirdPartyCosts.ts` | `convertCountyCostsToFormData` now maps survey, pest, credit report, and flood fees from county data |
| `components/InputSections.tsx` | Added 5 new input fields (Survey Fee, Pest Inspection, Credit Report, Flood Determination, Other 3rd Party Fees) visible in all app versions |
| `components/LoanEstimateCard.tsx` | Added new fee line items to both Third Party Fee breakdown sections |
| `components/CostsBreakdown.tsx` | Added Walker fees, Hideout fees (transfer + dues), and Prorations (city/town, school, sewer & water) as separate line items in acquisition costs |
| `ReportMode.tsx` | Added new 3rd party fee items to breakdown; removed redundant `appVersion !== 'NORMAL'` gate on Hideout Transfer and Dues (calculation already zeroes them for NORMAL; `FeeBreakdownItem` auto-hides $0 values) |

---

### How It Works
- **`FeeBreakdownItem`** returns `null` when value is `$0`, so fees only appear when populated
- **County selection** auto-populates all mapped fees via `convertCountyCostsToFormData`
- **Hideout-specific inputs** (Walker, Hideout Transfer, Dues, Sewer & Water) remain gated behind `appVersion === 'HIDEOUT'` in `InputSections.tsx`
- **Calculations** zero out Hideout Transfer and Dues for NORMAL mode via `appVersion` checks
- **Display components** show all fees unconditionally — the zero-value auto-hide handles version differences

### Git
- Commit: `851b6ca` — pushed to `origin/master`
