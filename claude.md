# CLAUDE.md — ZS Flip Calculator Master Project Document

> Last updated: February 24, 2026

---

## 1. PROJECT OVERVIEW

| Item | Detail |
|------|--------|
| **App Name** | ZS Flip Calculator |
| **Purpose** | House-flipping deal analysis calculator — analyzes purchase, rehab, financing, holding costs, exit strategy, and profitability for real estate investment deals |
| **Tech Stack** | React 19 + TypeScript + Vite 6 + Tailwind CSS (CDN) |
| **Deployment** | Vercel — https://z-srehab-flip-calculator.vercel.app/ |
| **Auth** | Supabase Auth (email/password, email verification) with localStorage fallback |
| **Database** | Supabase (primary) + localStorage (fallback/backup) |
| **Charts** | Recharts 3.5 |
| **PDF Export** | html2canvas + jspdf |
| **Routing** | None — single-page app with conditional rendering (auth → report → editor) |
| **Design System** | Tailwind utility classes; dark navy/gray-900 headers; amber/gold accents; gray-50 card backgrounds; white cards with rounded corners and shadow-sm; bold uppercase section headings |

---

## 2. EXISTING FEATURES

| # | Feature | Description | Status |
|---|---------|-------------|--------|
| 1 | Property Information | Address, state (with auto-defaults), zip, property type, sqft, beds, baths, foundation type | ✅ COMPLETE |
| 2 | Deal Economics | Financing % selector (100/95/90/85/80/custom), purchase price, appraised value, rehab budget, ARV, closing date | ✅ COMPLETE |
| 3 | Itemized Rehab Breakdown | Expandable line-item table by category (Kitchen, Bath, Flooring, etc.) with unit cost × qty; total vs budget diff tracking | ✅ COMPLETE |
| 4 | Escrow & Credits | Earnest money deposit, seller concession %, seller buyback, buyer agent commission with broker split | ✅ COMPLETE |
| 5 | Max Offer Analysis (MAO) | 60/65/70/75% ARV options, formula display, required ARV per tier, work-backward mode (target ROI or LTC) | ✅ COMPLETE |
| 6 | Seller Side Analysis | Original purchase price, mortgage balance, LOC balance, commission rate, transfer tax rate, misc fees, estimated net proceeds | ✅ COMPLETE |
| 7 | HUD Charges (NORMAL mode) | Title insurance, CPL fee, endorsements, legal/settlement, recording, inspection, appraisal, insurance, transfer tax, other 3rd party | ✅ COMPLETE |
| 8 | HUD Charges (HIDEOUT mode) | Walker fees (doc prep, overnight, wire), Hideout transfer fee (auto-calc from PA title chart), prorated dues/taxes (city, school, sewer/water) | ✅ COMPLETE |
| 9 | Exit Strategy & Holding Costs | Exit type (sell/refinance), holding period, monthly utilities, insurance/tax checkboxes, commission breakdown with broker splits, capital gains tax toggle | ✅ COMPLETE |
| 10 | Borrower & Active Loan | FICO, liquidity, experience level, loan type (hard money/conventional/portfolio/private), rate, points, term, interest-only toggle, PITI, PMI, prepayment penalty, lender fee fields, notes, snapshot button | ✅ COMPLETE |
| 11 | Lender Comparison Tool | Multi-lender side-by-side table comparing fees, monthly payment, down payment, cash to close, net profit; highlights best lender | ✅ COMPLETE |
| 12 | Cash Required Summary | Timeline breakdown: EMD → closing day costs → monthly holding → contingency reserve → emergency buffer; total cash needed | ✅ COMPLETE |
| 13 | Deal Realism Check | Pass/fail flags for unrealistic assumptions (0% rate, $0 fees, missing costs) with red/yellow/green/blue categories | ✅ COMPLETE |
| 14 | Valuation & Returns | Buy/sell per-sqft, LTV/LTC/LTARV ratios, ROI, cash-on-cash, annualized ROI, IRR (Newton-Raphson) | ✅ COMPLETE |
| 15 | 70% Rule Analysis | Max purchase = (ARV × 0.70) − rehab; pass/fail indicator | ✅ COMPLETE |
| 16 | Sensitivity Tables | Purchase price sensitivity, rehab cost sensitivity, ARV scenario variations | ✅ COMPLETE |
| 17 | Net Profit Projected | Detailed profit breakdown: revenue − acquisition − holding − disposition; after-tax profit toggle | ✅ COMPLETE |
| 18 | Seller's Estimated Net | Seller-side proceeds calculation | ✅ COMPLETE |
| 19 | Printable PDF Report | Full deal summary formatted for 8.5×11" with print CSS; includes lender comparison; export via html2canvas/jspdf | ✅ COMPLETE |
| 20 | Saved Deals (CRUD) | Save, load, clone, delete deals; Supabase primary + localStorage backup; auto-saves on changes | ✅ COMPLETE |
| 21 | HIDEOUT Mode | Privacy toggle that switches between PA-specific Walker/Hideout fees and generic county-based costs | ✅ COMPLETE |
| 22 | User Settings | Display name, password change (Supabase only), calculation defaults (financing %, tax rate, commission) | ✅ COMPLETE |
| 23 | State Auto-Defaults | State selection auto-populates CPL fee, title insurance rate, transfer tax, property tax, insurance per $100k | ✅ COMPLETE |
| 24 | County Cost Lookup | County selection (NORMAL mode) auto-populates inspection, appraisal, recording fees | ✅ COMPLETE |
| 25 | Responsive Header | Desktop: full nav bar; Mobile: hamburger menu with dropdown | ✅ COMPLETE |
| 26 | Deal Viability Indicator | Green/yellow/red traffic light based on profit margin, IRR, 70% rule, LTV | ✅ COMPLETE |
| 27 | Eligibility Alerts | Red alert if FICO < 650, LTV > 75%, or liquidity insufficient | ✅ COMPLETE |
| 28 | Input Validation | Comprehensive validation with errors/warnings displayed via ValidationAlert | ✅ COMPLETE |

---

## 3. FEATURE ROADMAP

| Feature | Status | Priority | Date Completed | Notes |
|---------|--------|----------|----------------|-------|
| Finish-Grade Rehab Auto-Estimator | ✅ COMPLETE | P1 | 2026-02-20 | Modal with 4 finish grades; auto-populates rehab line items |
| Plan B — Rental & STR Analysis | ✅ COMPLETE | P2 | 2026-02-20 | LTR + STR tabs with NOI, cap rate, cash flow, strategy comparison |
| Branded Report Customization | ✅ COMPLETE | P3 | 2026-02-20 | Logo, company name, color theme, contact info on reports |
| Multi-Deal Portfolio Dashboard | ✅ COMPLETE | P4 | 2026-02-20 | KPI cards, sortable table, charts, best deal highlight |
| Deal Sharing (Read-Only Link) | ✅ COMPLETE | P5 | 2026-02-20 | URL-encoded share links, read-only view, print support |
| AI Chat Assistant | ✅ COMPLETE | P6 | 2026-02-21 | OpenAI GPT-4o-mini streaming chat with deal context awareness, floating 🤖 bubble |
| Full Mobile Responsiveness | ✅ COMPLETE | P7 | 2026-02-21 | All components responsive 320px+; scrollable tables, stacking grids, touch targets |
| Complete Branded Report Customization | ✅ COMPLETE | P8 | 2026-02-24 | Full modal with logo upload, color themes, agent info, disclaimer, applied to ReportMode |
| Automated Data Import (MLS/Zillow) | ✅ COMPLETE | P9 | 2026-02-24 | PropertyImportModal with address search, mock MLS data, 5 comps, ARV calculation, auto-fill 8 fields |
| Actual vs. Pro-Forma Expense Tracker | ✅ COMPLETE | P10 | 2026-02-24 | ExpenseTrackerModal: rehab actuals per item, overhead costs, variance analysis, completion tracking |
| Advanced Scenario Comparison Engine | ✅ COMPLETE | P11 | 2026-02-24 | ScenarioComparisonModal: Flip vs LTR vs STR cards, weighted scoring, adjustable rental assumptions, save scenarios |
| Multi-User / Team Features | ✅ COMPLETE | P12 | 2026-02-24 | TeamManagementModal: add/remove members, roles (Owner/Editor/Viewer), audit trail, invite codes, localStorage MVP |
| API & Third-Party Integrations | ✅ COMPLETE | P13 | 2026-02-24 | ExportIntegrationModal: CSV/JSON/HTML export with preview, webhook config, API reference docs, integration partners |

---

## 4. COMPONENT MAP

### Entry Point
| File | Purpose |
|------|---------|
| `index.html` | HTML shell with Tailwind CDN, root div |
| `index.tsx` | React 19 createRoot → renders `<App />` from App-refactored.tsx |
| `App-refactored.tsx` (1,181 lines) | **Active main app** — all state management, auth flow, conditional rendering, deal CRUD handlers |
| `App.tsx` (1,696 lines) | Legacy monolithic version — unused, kept as reference |
| `App-original.tsx` | Another legacy snapshot — unused |

### Layout Components
| File | Purpose |
|------|---------|
| `components/AppHeader.tsx` (191 lines) | Sticky top bar: logo, user display, version toggle (NORMAL/HIDEOUT), nav buttons (desktop) / hamburger menu (mobile) |
| `components/InputSections.tsx` (2,257 lines) | **Entire left column** — ~15 collapsible sections: property info, deal numbers, financing, loan settings, lender fees, closing costs, prorations, holding costs, exit strategy, seller analysis, max offer, work-backward mode |
| `components/ResultsColumn.tsx` (155 lines) | Right column orchestrator — composes all result cards in order |
| `ReportMode.tsx` (871 lines) | Printable report view formatted for 8.5×11" with print CSS |

### Modals
| File | Purpose |
|------|---------|
| `components/AuthScreen.tsx` (92 lines) | Login/signup form with Supabase or localStorage auth |
| `components/DealModal.tsx` (84 lines) | Load/delete/clone saved deals |
| `components/LenderModal.tsx` (272 lines) | Add/edit comparison lender |
| `components/UserSettings.tsx` (314 lines) | User preferences + password change |
| `components/StateSelectionScreen.tsx` (144 lines) | State selection with defaults preview (not actively used) |
| `components/RehabEstimatorModal.tsx` (330 lines) | 4-grade rehab auto-estimator (Rental/Standard/Premium/Luxury) |
| `components/PlanBRentalModal.tsx` (420 lines) | Plan B rental/STR analysis with LTR/STR tabs, income statement, KPI metrics |
| `components/PortfolioDashboard.tsx` (280 lines) | Multi-deal portfolio dashboard with KPI cards, sortable table, profit chart |
| `components/ShareDealModal.tsx` (270 lines) | Share deal modal with URL generation, copy link, saved deal selector |
| `components/SharedDealView.tsx` (195 lines) | Read-only shared deal view with key metrics, print support, viability indicator |
| `components/AIChatAssistant.tsx` (370 lines) | Floating AI chat widget with OpenAI streaming, deal context, quick actions |
| `components/BrandingModal.tsx` (~300 lines) | Full branded report customization: logo upload, color themes, agent info, disclaimer |
| `components/PropertyImportModal.tsx` (~310 lines) | Auto-fill property data from mock MLS: address search, comps table, edit mode |
| `components/ExpenseTrackerModal.tsx` (~330 lines) | Actual vs pro-forma expense tracking: rehab actuals, overhead costs, variance analysis |
| `components/ScenarioComparisonModal.tsx` (~380 lines) | Flip vs LTR vs STR comparison: weighted scoring, adjustable assumptions, save scenarios |
| `components/TeamManagementModal.tsx` (~340 lines) | Team management: members, roles (Owner/Editor/Viewer), audit log, invite codes |
| `components/ExportIntegrationModal.tsx` (~340 lines) | CSV/JSON/HTML export with preview, webhook config, API reference docs |

### Result Cards
| File | Purpose |
|------|---------|
| `components/EligibilityAlert.tsx` | Red alert for eligibility failures (FICO, LTV, liquidity) |
| `components/ValidationAlert.tsx` (66 lines) | Shows validation errors/warnings |
| `components/DealViabilityIndicator.tsx` (157 lines) | Green/yellow/red traffic light |
| `components/MaxOfferCard.tsx` (102 lines) | Max allowable offer at 60/65/70/75% LTV |
| `components/ValuationReturns.tsx` (126 lines) | Per-sqft metrics, ratios, ROI, IRR |
| `components/LoanEstimateCard.tsx` (362 lines) | Detailed loan estimate with all fee sections |
| `components/CostsBreakdown.tsx` (185 lines) | Acquisition, disposition, holding cost breakdown |
| `components/SeventyPercentRuleCard.tsx` (75 lines) | 70% rule pass/fail |
| `components/LenderComparison.tsx` (427 lines) | Side-by-side lender comparison table |
| `components/CashRequiredSummary.tsx` (268 lines) | Cash timeline breakdown |
| `components/ProfitTable.tsx` (103 lines) | Tabular profit breakdown |
| `components/ClosingProfitCard.tsx` (155 lines) | Net profit summary with ROI badge |
| `components/SensitivityAnalysis.tsx` (134 lines) | Purchase/rehab/ARV what-if tables |
| `components/SellerNetAnalysis.tsx` (62 lines) | Seller's estimated net proceeds |
| `components/RealismCheckPanel.tsx` (138 lines) | Unrealistic assumption flags |
| `components/AssumptionsSummary.tsx` (299 lines) | Full deal summary card with PDF export |

### Primitive/Shared UI
| File | Purpose |
|------|---------|
| `components/InputGroup.tsx` (98 lines) | Reusable labeled number/text input with prefix/suffix |
| `components/ResultRow.tsx` | Label/value row with optional currency format |
| `components/FeeBreakdownItem.tsx` | Indented fee line (auto-hides when $0) |
| `components/HelpTooltip.tsx` (84 lines) | Click-to-open tooltip with title, description, formula, examples |
| `components/RehabLineItems.tsx` (199 lines) | Expandable itemized rehab budget editor |
| `components/Visuals.tsx` (79 lines) | Recharts pie chart + bar chart (used in ReportMode) |
| `components/index.ts` | Barrel exports for all components |

### Utilities
| File | Purpose |
|------|---------|
| `utils/calculations.ts` (990 lines) | Core `calculateLoan()` engine — 15 calculation steps |
| `utils/lenderComparison.ts` (118 lines) | `calculateLoanForLender()` — recalculates with lender-specific terms |
| `utils/inputValidator.ts` (299 lines) | Comprehensive input validation with errors/warnings |
| `utils/sensitivityAnalysis.ts` (154 lines) | Purchase price + rehab sensitivity scenarios |
| `utils/irrCalculation.ts` (249 lines) | IRR via Newton-Raphson method |
| `utils/pennsylvaniaTitleRates.ts` (278 lines) | PA title insurance rate table lookup |
| `utils/stateDefaults.ts` (82 lines) | State defaults loader from JSON |
| `utils/stateClosingCosts.ts` (96 lines) | Closing cost lookup by state |
| `utils/stateHoldingCosts.ts` (142 lines) | Insurance/tax estimates by state |
| `utils/thirdPartyCosts.ts` (12,462 lines) | County-level cost data for every US county |
| `utils/holdingCostTemplates.ts` (54 lines) | Default holding cost templates |
| `utils/loanTypeDefaults.ts` (70 lines) | Loan type defaults (hard money/conventional/portfolio) |
| `utils/rehabBudgetAnalysis.ts` (59 lines) | Per-sqft analysis with warnings |
| `utils/userPreferences.ts` (60 lines) | localStorage-based user preferences |

### Data / Config
| File | Purpose |
|------|---------|
| `types.ts` (464 lines) | All TypeScript interfaces: `RehabLineItem`, `ComparisonLender`, `LoanInputs`, `SavedDeal`, `CalculatedResults`, `DEFAULT_INPUTS` |
| `data/stateDefaults.json` | Per-state CPL, title insurance, transfer tax, property tax, insurance rates |
| `lib/supabase.ts` | Supabase client initialization |
| `lib/database.ts` | Supabase CRUD: `saveNewDeal`, `updateExistingDeal`, `loadUserDeals`, `deleteDeal`, `cloneDeal` |
| `metadata.json` | App metadata |
| `package.json` | Dependencies and scripts |
| `vite.config.ts` | Vite configuration |
| `tsconfig.json` | TypeScript configuration |

---

## 5. STATE MANAGEMENT NOTES

### Pattern
Pure `useState` + `useMemo` in root `App` component (`App-refactored.tsx`). No Context API, no Redux, no Zustand. All state is prop-drilled.

### Core State Variables (in App-refactored.tsx)
| State | Type | Scope | Persistence |
|-------|------|-------|-------------|
| `inputs` | `LoanInputs` | Global (prop-drilled to all children) | Saved with deal to Supabase + localStorage |
| `results` | `CalculatedResults` | Computed via `useMemo(() => calculateLoan(inputs))` | Not persisted (recalculated) |
| `savedDeals` | `SavedDeal[]` | Global | Supabase + localStorage |
| `currentUser` | `{ username, email }` | Global | Supabase session + localStorage |
| `comparisonLenders` | `ComparisonLender[]` | Global | Saved with deal |
| `reportMode` | `boolean` | Global | Not persisted |
| `showDealModal` / `showLenderModal` / `showSettings` | `boolean` | Global | Not persisted |
| `saveNotification` | `string \| null` | Global | Not persisted |
| `currentDealId` | `string \| number \| null` | Global | Not persisted |
| `appVersion` | `'NORMAL' \| 'HIDEOUT'` | Global | Not persisted |
| `maxOfferLTVPercent` | `number` | Global | Not persisted |
| `baselineInputs` / `baselineLenders` | Snapshots | Global | Not persisted |
| `userSettings` | `UserSettings` | Global | localStorage via userPreferences.ts |

### Data Flow
```
User input → onInputChange(field, value) → setInputs(prev => ({...prev, [field]: value}))
                                                ↓
                                     useMemo recalculates results = calculateLoan(inputs)
                                                ↓
                                     Results prop-drilled to ResultsColumn → individual cards
```

### Auto-Population Cascades
State change triggers → county costs auto-fill → holding costs auto-estimate → loan type defaults apply. Protected by `useRef` flags and `setTimeout` to prevent infinite loops.

### Deal Storage
- **Save**: Attempts Supabase first → falls back to localStorage → both stored as backup
- **Load**: Checks Supabase first → falls back to localStorage
- **Format**: `SavedDeal { id, name, created_at, data: LoanInputs, lenders? }`
- **User Preferences**: Always localStorage only (`zsrehab_user_preferences_{username}`)

---

## 6. KNOWN ISSUES / TECH DEBT

| Issue | Severity | Notes |
|-------|----------|-------|
| `InputSections.tsx` is 2,257 lines | Medium | Should be split into sub-components but works |
| `App-refactored.tsx` has 30+ useState hooks | Medium | Could benefit from useReducer or context |
| No test framework configured | Low | `closingCostEngine/` has tests but no runner in package.json |
| `App.tsx` and `App-original.tsx` are dead code | Low | Kept as reference, could be removed |
| `thirdPartyCosts.ts` is 12,462 lines | Low | County data file, large but functional |
| `closingCostEngine/` directory unused | Low | Separate module not integrated into main app |
| Tailwind via CDN (not PostCSS) | Low | Works but no tree-shaking or custom config |
| No router library | Info | Works for SPA but limits multi-page features |

---

## 7. CHANGE LOG

| Date | Feature | What Changed | Files Modified |
|------|---------|-------------|----------------|
| 2026-02-24 | Complete Branded Report Customization (P8) | Created BrandingModal with 4 sections: (A) Company Branding with logo file upload (base64, max 500KB), company name, agent name; (B) Contact Info with phone/email/website validation; (C) Report Appearance with 5 color theme swatches (Dark Navy/Professional Blue/Forest Green/Burgundy/Charcoal) + report subtitle; (D) Legal disclaimer textarea. Live preview panel. Save/Reset/Close buttons. Settings persist to localStorage key `zs_branding_settings`. Updated ReportMode with 🎨 Customize Report button in toolbar, expanded branding prop interface, logo base64 support, agent name + website in header, disclaimer footer with contact info on every report page. | `components/BrandingModal.tsx` (new, ~300 lines), `ReportMode.tsx`, `App-refactored.tsx`, `components/index.ts` |
| 2026-02-24 | Automated Data Import (P9) | Created PropertyImportModal with address search input, simulated API delay (1-2s), mock MLS data generator producing realistic property details + 5 comparable sales sorted by date. Results include property details grid (address/city/state/zip/beds/baths/sqft/foundation), 3 valuation cards (last sale/estimated value/estimated ARV from comp average), scrollable comps table (address/price/$/sqft/beds-baths/sqft/DOM/date), auto-fill summary showing 8 fields. "Adjust Manually" edit mode with inline inputs. Recent searches saved to localStorage key `recent_property_searches` (last 10). Added 🔍 Auto-Fill Property Data button below Property Address in InputSections.tsx. | `components/PropertyImportModal.tsx` (new, ~310 lines), `components/InputSections.tsx`, `App-refactored.tsx`, `components/index.ts` |
| 2026-02-24 | Expense Tracker (P10) | Created ExpenseTrackerModal with 3 tabs: (1) Rehab Items — per-line-item actual cost input, vendor field, auto-status (pending/paid/overbudget), variance calculation; (2) Overhead Costs — purchase closing, sale closing, holding costs, misc with actual vs projected; (3) Summary — progress bar, category breakdown table, grand total with variance %, budget alert. Quick stats bar with projected/actual/variance/completion. Data persists to localStorage key `zs_expense_tracker`. Reset all option. Added 📊 Expenses button to AppHeader desktop nav + mobile hamburger menu. | `components/ExpenseTrackerModal.tsx` (new, ~330 lines), `components/AppHeader.tsx`, `App-refactored.tsx`, `components/index.ts` |
| 2026-02-24 | Scenario Comparison Engine (P11) | Created ScenarioComparisonModal with 3 tabs: (1) Compare — winner banner, 3 strategy cards (Flip/LTR/STR) with score bars, key metrics, 5 priority weighting sliders (Profit/Cash Flow/Low Risk/Speed/Tax), adjustable rental assumptions (LTR rent, STR nightly rate); (2) Details — strategy deep-dive with header, 6 key metrics cards, pros/cons grid, risk/tax gauge bars; (3) Saved — save/delete scenario history. Weighted scoring algorithm normalizes profit/cashflow/risk/time/tax. LTR calculations include vacancy, property mgmt, capex, insurance, tax, mortgage. STR adds occupancy, cleaning costs, mgmt fee. Scenarios persist to localStorage key `zs_saved_scenarios` (max 20). Added ⚖️ Compare button to AppHeader. | `components/ScenarioComparisonModal.tsx` (new, ~380 lines), `components/AppHeader.tsx`, `App-refactored.tsx`, `components/index.ts` |
| 2026-02-24 | Team Management (P12) | Created TeamManagementModal with 3 tabs: (1) Members — list with avatar, role badge, role dropdown (Editor/Viewer), add member form (name/email/role), remove button, permissions legend; (2) Activity Log — filterable audit trail (deal/team/settings/export categories) with timestamps; (3) Settings — team name, invite code with copy/regenerate, team stats cards, danger zone reset. Current user auto-initialized as Owner. All team actions logged to audit trail (max 100 entries). Data persists to localStorage key `zs_team_data`. Added 👥 Team button to AppHeader. | `components/TeamManagementModal.tsx` (new, ~340 lines), `components/AppHeader.tsx`, `App-refactored.tsx`, `components/index.ts` |
| 2026-02-24 | Export & Integrations (P13) | Created ExportIntegrationModal with 3 tabs: (1) Export Data — CSV/JSON/HTML format cards with download + preview buttons, CSV generates field/value pairs, JSON generates structured object with property/financials/results/rehabLineItems sections, HTML generates styled report page; (2) Webhooks — URL/secret/events config with toggle switch, test button (demo mode), persists to localStorage key `zs_webhook_config`; (3) API Reference — 6 endpoint docs (GET/POST deals, export, webhooks, scenarios, import), 6 planned integration partners (Zillow/Redfin/MLS/QuickBooks/Zapier/Slack). All downloads use blob URLs with proper MIME types. Added 🔌 Export button to AppHeader. | `components/ExportIntegrationModal.tsx` (new, ~340 lines), `components/AppHeader.tsx`, `App-refactored.tsx`, `components/index.ts` |
| 2026-02-21 | Full Mobile Responsiveness | Made entire site responsive for 320px+ screens: overflow-x-hidden on root, lg-only sticky ResultsColumn, grid-cols-2/sm:grid-cols-4 inputs, overflow-x-auto scrollable tables (ProfitTable/SensitivityAnalysis/RehabLineItems/LenderComparison), flex-col stacking headers (LoanEstimateCard/CashRequired/CostsBreakdown/ClosingProfitCard), responsive text sizes (text-sm→lg), reduced padding (px-4 sm:px-6), improved touch targets, responsive modals (DealModal/LenderModal), responsive AI bubble, responsive ReportMode toolbar | `App-refactored.tsx`, `ReportMode.tsx`, `components/ResultsColumn.tsx`, `components/InputSections.tsx`, `components/ProfitTable.tsx`, `components/SensitivityAnalysis.tsx`, `components/LoanEstimateCard.tsx`, `components/CashRequiredSummary.tsx`, `components/ValuationReturns.tsx`, `components/ClosingProfitCard.tsx`, `components/CostsBreakdown.tsx`, `components/SeventyPercentRuleCard.tsx`, `components/LenderComparison.tsx`, `components/RehabLineItems.tsx`, `components/DealModal.tsx`, `components/LenderModal.tsx`, `components/PortfolioDashboard.tsx` |
| 2026-02-21 | AI Chat Assistant | Added floating AI chat widget with OpenAI GPT-4o-mini streaming, deal context injection, system prompt with full app knowledge, quick action buttons, minimizable UI, API key in UserSettings | `components/AIChatAssistant.tsx` (new), `components/UserSettings.tsx`, `utils/userPreferences.ts`, `components/AppHeader.tsx`, `components/index.ts`, `App-refactored.tsx` |
| 2026-02-20 | Feature 5: Deal Sharing | Added URL-encoded share links (no server needed), read-only SharedDealView with print, ShareDealModal with current/saved deal toggle, auto-detect share hash on load | `components/ShareDealModal.tsx` (new), `components/SharedDealView.tsx` (new), `components/AppHeader.tsx`, `components/index.ts`, `App-refactored.tsx` |
| 2026-02-20 | Feature 4: Portfolio Dashboard | Added multi-deal dashboard with KPI cards (total profit, avg ROI, best deal), sortable comparison table, profit distribution chart, click-to-open deal | `components/PortfolioDashboard.tsx` (new), `components/AppHeader.tsx`, `components/index.ts`, `App-refactored.tsx` |
| 2026-02-20 | Feature 3: Branded Reports | Added branding fields to UserSettings (company name, tagline, logo URL, brand color, contact info), applied to ReportMode header with dynamic logo/color | `components/UserSettings.tsx`, `utils/userPreferences.ts`, `ReportMode.tsx`, `App-refactored.tsx` |
| 2026-02-20 | Feature 2: Plan B Rental/STR | Added LTR + STR analysis modal with NOI, cap rate, cash-on-cash, DSCR, GRM, 1% rule, break-even, income statement, Flip vs Hold comparison | `components/PlanBRentalModal.tsx` (new), `components/AppHeader.tsx`, `components/index.ts`, `App-refactored.tsx` |
| 2026-02-20 | Feature 1: Rehab Auto-Estimator | Added 4-grade estimator modal (Rental/Standard/Premium/Luxury) with per-sqft cost engine, contingency toggle, auto-populate rehab line items + budget | `components/RehabEstimatorModal.tsx` (new), `components/index.ts`, `components/InputSections.tsx`, `App-refactored.tsx` |
| 2026-02-20 | CLAUDE.md Created | Comprehensive project document with all 7 sections | `CLAUDE.md` |
| 2026-02-20 | Fix: ARV Financing % | Max Offer & Required ARV now account for financing percentage | `utils/calculations.ts`, `components/InputSections.tsx`, `components/MaxOfferCard.tsx` |
| 2026-02-20 | Fix: Duplicate AppHeader | Removed duplicate AppHeader declaration causing Vite build error | `components/AppHeader.tsx` |
| 2026-02-20 | Responsive Header | Mobile hamburger menu, desktop full nav bar | `components/AppHeader.tsx` |
| 2026-02-20 | Change Password | Added Change Password section to User Settings (Supabase only) | `components/UserSettings.tsx` |
| 2026-02-17 | Hideout Fee Defaults | Set non-zero Hideout defaults, added handleVersionChange() | `types.ts`, `App-refactored.tsx` |
| 2026-02-17 | Remove 4 Fee Fields | Removed survey/pest/credit/flood from all layers | `types.ts`, `utils/thirdPartyCosts.ts`, `components/InputSections.tsx`, `components/LoanEstimateCard.tsx`, `components/CostsBreakdown.tsx`, `ReportMode.tsx` |
| 2026-02-17 | Version Fee Separation | HIDEOUT fees zeroed in NORMAL mode and vice versa | `utils/calculations.ts` |
| 2026-02-17 | Missing 3rd Party Fees | Added otherThirdPartyFees catch-all, fixed CostsBreakdown/ReportMode | `types.ts`, `utils/calculations.ts`, `components/CostsBreakdown.tsx`, `ReportMode.tsx` |
