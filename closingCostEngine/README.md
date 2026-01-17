# Closing Cost Engine - Comprehensive Documentation

## Overview

The **Closing Cost Engine** is a configuration-driven TypeScript module for calculating residential real estate closing costs across all 50 US states. It produces HUD/Closing Disclosure style breakdowns with separate buyer and seller accounting.

### Key Features

- ✓ **Zero Hardcoded State Rates** - All costs defined in JSON configuration files
- ✓ **Jurisdiction Matching** - Smart fallback chain: zip → city → county → state → default
- ✓ **Tiered Transfer Taxes** - Support for complex multi-bracket tax structures
- ✓ **HUD/CD Compliance** - Proper debit/credit accounting with prorations
- ✓ **Extensible** - Add new states/counties in minutes by editing JSON
- ✓ **Type-Safe** - Full TypeScript with strict validation
- ✓ **Production-Ready** - Pure functions, no dependencies, testable

---

## Architecture

```
closingCostEngine/
├── types.ts                    # TypeScript interfaces
├── validation.ts               # Input validation & schema checking
├── configLoader.ts             # Config loading & jurisdiction matching
├── calculations.ts             # Core calculation functions
├── proration.ts                # Tax/HOA proration engine
├── closingCostEngine.ts         # Main engine class
├── closingCostEngine.test.ts    # Comprehensive test suite
├── config/
│   ├── generic_default.json    # Fallback default profile
│   ├── example_tx_no_transfer_tax.json  # Texas (no transfer tax)
│   ├── example_pa_like.json    # Pennsylvania (complex taxes)
│   └── ...more state configs...
└── README.md                   # This file
```

---

## Quick Start

### Installation

```typescript
import ClosingCostEngine from './closingCostEngine';

// Initialize with config directory
const engine = new ClosingCostEngine({
  config_dir: './closingCostEngine/config',
  debug: false,
});
```

### Basic Usage

```typescript
const deal = {
  property: {
    state: 'PA',
    county: 'Allegheny',
    city: 'Pittsburgh',
    zip: '15213',
  },
  purchase_price: 300000,
  loan_amount: 240000,
  closing_date: '2024-06-15',
  
  docs: {
    deed_docs_count: 1,
    deed_pages: 3,
    mortgage_docs_count: 1,
    mortgage_pages: 5,
  },
  
  selections: {
    owner_policy: true,
    endorsements: ['ALTA-1', 'ALTA-2'],
    cpl: true,
  },
  
  // Optional: property tax proration
  tax_lines: [
    {
      id: 'prop_tax_2024',
      description: '2024 Property Tax',
      amount: 4200,
      period_start: '2024-01-01',
      period_end: '2024-12-31',
      payment_status: 'paid',  // or 'unpaid' or 'unknown'
      payer_of_bill: 'seller',
    },
  ],
};

const result = engine.calculate(deal);

console.log('Buyer pays:', result.buyer_net);
console.log('Seller pays:', result.seller_net);
console.log('Breakdown:');
for (const [category, items] of Object.entries(result.all_items_by_category)) {
  console.log(`  ${category}:`);
  for (const item of items) {
    console.log(`    - ${item.description}: buyer $${item.buyer_debit}, seller $${item.seller_debit}`);
  }
}
```

---

## Configuration Guide

### Creating a State Profile

Each state/jurisdiction is defined in a JSON file with this structure:

```json
{
  "jurisdiction_id": "PA_ALLEGHENY",
  "level": "county",
  "state": "PA",
  "county": "Allegheny",
  "description": "Pennsylvania - Allegheny County",
  
  "transfer_taxes": [...],
  "recording": {...},
  "title": {...},
  "settlement": {...},
  "proration": {...}
}
```

### Transfer Taxes Configuration

#### Percent-Based Tax

```json
{
  "id": "deed_tax",
  "description": "Deed Transfer Tax",
  "base_type": "price",
  "calc_type": "percent",
  "payer_default": "seller",
  "rate": 0.010
}
```

**base_type options:**
- `price` - Based on purchase price
- `loan` - Based on loan amount
- `deed` - Based on deed value (usually purchase price)
- `mortgage` - Based on mortgage amount (usually loan amount)

**payer_default options:**
- `seller` - Seller pays entire tax
- `buyer` - Buyer pays entire tax
- `split` - Split between buyer and seller (use split_buyer_pct/split_seller_pct)

#### Flat Fee Tax

```json
{
  "id": "flat_fee",
  "description": "Recording Fee",
  "base_type": "price",
  "calc_type": "flat",
  "payer_default": "seller",
  "flat_amount": 150
}
```

#### Tiered Bracket Tax (Complex)

Pennsylvania's school transfer tax uses tiered brackets:

```json
{
  "id": "school_tax",
  "description": "School District Transfer Tax",
  "base_type": "price",
  "calc_type": "tiered_brackets",
  "payer_default": "seller",
  "brackets": {
    "brackets": [
      { "min_inclusive": 0, "max_inclusive": 100000, "rate": 0.005 },
      { "min_inclusive": 100000, "max_inclusive": 500000, "rate": 0.010 },
      { "min_inclusive": 500000, "max_inclusive": null, "rate": 0.015 }
    ]
  }
}
```

**Algorithm:** For a $300,000 property:
- $100,000 @ 0.5% = $500
- $200,000 @ 1.0% = $2,000
- **Total: $2,500**

### Recording Fees

```json
{
  "recording": {
    "id": "recording_pa",
    "deed_recording": {
      "per_document_fee": 50,
      "per_page_fee": 2
    },
    "mortgage_recording": {
      "per_document_fee": 50,
      "per_page_fee": 2
    },
    "ancillary_recording": {
      "UCC_search": { "per_document_fee": 25, "per_page_fee": 0.50 }
    }
  }
}
```

**Calculation:** For 1 deed doc with 3 pages:
- Document fee: 1 × $50 = $50
- Page fee: 3 × $2 = $6
- **Total: $56**

### Title Insurance

```json
{
  "title": {
    "id": "title_pa",
    "pricing_method": "percent",
    
    "lender_policy": {
      "base_on": "loan_amount",
      "percent": 0.005
    },
    
    "owner_policy": {
      "base_on": "purchase_price",
      "percent": 0.006
    },
    
    "simultaneous_issue_discount": {
      "applies": true,
      "discount_pct": 25
    },
    
    "endorsements": {
      "ALTA-1": 100,
      "ALTA-2": 150,
      "ALTA-8.1": 200
    },
    
    "cpl": 175
  }
}
```

**Pricing methods:**
- `percent` - Percentage of base amount
- `flat` - Fixed dollar amount
- `rate_table` - Tiered rate table (like transfer taxes)

**Lender policy** is based on loan amount and typically paid by seller.
**Owner policy** is based on purchase price and typically paid by buyer.

**Simultaneous Issue Discount:** When both policies are issued simultaneously, many states offer a discount (typically 20-25%) on the owner policy.

### Settlement & Flat Fees

```json
{
  "settlement": {
    "settlement_fee": {
      "amount": 500,
      "payer": "split",
      "split_buyer_pct": 50,
      "split_seller_pct": 50
    },
    "attorney_fee": {
      "amount": 600,
      "payer": "seller"
    },
    "notary_fee": {
      "amount": 150,
      "payer": "seller"
    },
    "wire_fee": {
      "amount": 25,
      "payer": "buyer"
    }
  }
}
```

Can be overridden at calculation time via `flat_fees` in DealInput.

### Prorations

```json
{
  "proration": {
    "id": "proration_pa",
    "day_count": "actual_365",
    "closing_day_owner": "buyer",
    "rounding": "cents",
    "default_proration_style": "paid_in_advance_common"
  }
}
```

**day_count:**
- `actual_365` - Actual calendar days ÷ 365
- `actual_360` - Actual days ÷ 360
- `30_360` - 30-day months ÷ 360 (30/360 method)

**closing_day_owner:**
- `buyer` - Buyer owns property on closing day (seller prorates through closing day)
- `seller` - Seller owns property on closing day

**rounding:**
- `cents` - Round to nearest penny
- `whole_dollars` - Round to nearest dollar

**default_proration_style:**
- `paid_in_advance_common` - Tax paid by seller in advance (most common)
- `arrears_common` - Tax paid in arrears by buyer

---

## Jurisdiction Matching

The engine selects the correct profile using this priority order:

1. **ZIP code profile** (highest priority)
2. **City profile**
3. **County profile**
4. **State profile**
5. **DEFAULT profile** (fallback)

This allows you to:
- Have county-specific profiles that override state rules
- Have special rules for specific cities
- Fall back to sensible defaults

**File naming convention:**
```
PA.json                    → State profile
PA_ALLEGHENY.json          → County profile (format: STATE_COUNTY)
PA_ALLEGHENY_PITTSBURGH.json  → City profile
PA_15213.json              → ZIP profile
DEFAULT.json               → Fallback
```

---

## Proration Algorithm (HUD-Style)

The proration engine implements full HUD Closing Disclosure accounting.

### Example: $4,200 Annual Property Tax

**Scenario:**
- Tax period: Jan 1, 2024 - Dec 31, 2024 (365 days)
- Closing date: June 15, 2024
- Tax status: PAID IN ADVANCE (seller prepaid annual tax)
- Closing day owner: Buyer

**Calculation:**

1. Daily rate: $4,200 ÷ 365 = $11.51/day

2. Seller owns: Jan 1 - Jun 14 (165 days)
   - Seller share: $11.51 × 165 = $1,899.15

3. Buyer owns: Jun 15 - Dec 31 (200 days)
   - Buyer share: $11.51 × 200 = $2,302.05

4. HUD accounting (paid in advance):
   - **Buyer debits:** $1,899.15 (reimbursing seller's pre-paid portion)
   - **Seller credits:** $2,302.05 (gets refund for buyer's future share)

This matches the Closing Disclosure format exactly.

---

## API Reference

### ClosingCostEngine.calculate(input: DealInput): ClosingCostOutput

**Parameters:**

```typescript
interface DealInput {
  property: {
    state: string;           // Required: "PA", "TX", etc.
    county?: string;         // Optional: matching county name
    city?: string;           // Optional: matching city name
    zip?: string;            // Optional: 5-digit ZIP code
  };
  purchase_price: number;    // Required: in dollars
  loan_amount: number;       // Required: in dollars
  closing_date: string;      // Required: ISO format "YYYY-MM-DD"
  
  docs: {
    deed_docs_count: number;
    deed_pages: number;
    mortgage_docs_count: number;
    mortgage_pages: number;
    ancillary?: AncillaryDoc[];
  };
  
  selections: {
    owner_policy: boolean;
    endorsements: string[];  // e.g., ["ALTA-1", "ALTA-2"]
    cpl: boolean;
  };
  
  flat_fees?: Record<string, number>;  // Override settlement fees
  tax_lines?: TaxLine[];                // Property tax prorations
  hoa_lines?: TaxLine[];                // HOA prorations
}
```

**Returns:**

```typescript
interface ClosingCostOutput {
  buyer_debits: LineItem[];
  buyer_credits: LineItem[];
  buyer_total_debit: number;
  buyer_total_credit: number;
  buyer_net: number;  // Positive = buyer pays; negative = buyer receives credit
  
  seller_debits: LineItem[];
  seller_credits: LineItem[];
  seller_total_debit: number;
  seller_total_credit: number;
  seller_net: number;  // Positive = seller pays; negative = seller receives credit
  
  all_items_by_category: Record<string, LineItem[]>;
  
  diagnostics: {
    jurisdiction_selected: string;
    profile_matched_by: 'zip' | 'city' | 'county' | 'state' | 'default';
  };
}

interface LineItem {
  id: string;
  category: string;
  description: string;
  buyer_debit: number;
  buyer_credit: number;
  seller_debit: number;
  seller_credit: number;
  notes?: string;
}
```

---

## Adding a New State

### Step 1: Research

Gather information for the target state:
- Transfer/deed taxes (rates, who pays, exemptions)
- Recording fee schedules
- Title insurance rates and discounts
- Settlement fee standards
- Property tax proration rules

### Step 2: Create Config File

Create `closingCostEngine/config/[STATE_CODE].json`:

```json
{
  "jurisdiction_id": "CA",
  "level": "state",
  "state": "CA",
  "description": "California - Statewide Profile",
  
  "transfer_taxes": [
    {
      "id": "transfer_tax_ca",
      "description": "California Transfer Tax",
      "base_type": "price",
      "calc_type": "percent",
      "payer_default": "split",
      "split_buyer_pct": 50,
      "split_seller_pct": 50,
      "rate": 0.011
    }
  ],
  
  "recording": {
    "id": "recording_ca",
    "deed_recording": {
      "per_document_fee": 75,
      "per_page_fee": 1.25
    },
    "mortgage_recording": {
      "per_document_fee": 75,
      "per_page_fee": 1.25
    }
  },
  
  "title": {
    "id": "title_ca",
    "pricing_method": "rate_table",
    "lender_policy": {
      "base_on": "loan_amount",
      "rate_table": {
        "entries": [
          { "loan_min": 0, "loan_max": 50000, "flat": 400 },
          { "loan_min": 50000, "loan_max": 500000, "rate": 0.004 },
          { "loan_min": 500000, "loan_max": null, "rate": 0.003 }
        ]
      }
    }
  },
  
  "settlement": {
    "settlement_fee": { "amount": 350, "payer": "split", "split_buyer_pct": 50, "split_seller_pct": 50 },
    "title_company_charge": { "amount": 200, "payer": "seller" }
  },
  
  "proration": {
    "id": "proration_ca",
    "day_count": "actual_365",
    "closing_day_owner": "buyer",
    "rounding": "cents",
    "default_proration_style": "paid_in_advance_common"
  }
}
```

### Step 3: Test

```typescript
import ClosingCostEngine from './closingCostEngine';

const engine = new ClosingCostEngine({
  config_dir: './closingCostEngine/config',
});

const result = engine.calculate({
  property: { state: 'CA' },
  purchase_price: 500000,
  loan_amount: 400000,
  closing_date: '2024-06-15',
  docs: { /* ... */ },
  selections: { /* ... */ },
});

console.log(result);
```

### Step 4: Validate Against Real Closing Disclosures

Compare your engine output against actual Closing Disclosures for similar transactions in the target state.

---

## Error Handling

The engine throws `ValidationError` for invalid inputs:

```typescript
import { ValidationError } from './validation';

try {
  const result = engine.calculate(deal);
} catch (e) {
  if (e instanceof ValidationError) {
    console.error('Validation errors:');
    for (const error of e.errors) {
      console.error(`  ${error.field}: ${error.message}`);
    }
  }
}
```

### Common Errors

| Error | Fix |
|-------|-----|
| "State is required" | Add `property.state` to input |
| "Loan cannot exceed purchase price" | Verify loan_amount ≤ purchase_price |
| "Must be valid ISO date" | Use format "YYYY-MM-DD" for closing_date |
| "No matching jurisdiction profile" | Create a config for the state or use DEFAULT |

---

## Testing

Run the comprehensive test suite:

```bash
npx ts-node closingCostEngine/closingCostEngine.test.ts
```

Tests verify:
- ✓ Multi-bracket transfer tax calculations
- ✓ Recording fee per-document and per-page math
- ✓ Title insurance with simultaneous issue discount
- ✓ Settlement fee allocation (buyer/seller/split)
- ✓ Proration math (day counts, daily rates, HUD allocation)
- ✓ Full integration for multiple states

---

## Performance Notes

- All calculations are **O(n)** where n = number of line items
- No database queries or network calls
- Pure functions with no side effects
- Suitable for real-time calculations in web applications
- Process thousands of deals per second on modern hardware

---

## Future Enhancements

Potential extensions:

1. **Dynamic Profiles** - Load profiles from database instead of JSON
2. **County-Specific Rules** - Currently state-level; add full county support for all states
3. **Refinance Scenarios** - Different rules for rate-and-term vs. cash-out
4. **FIRPTA Withholding** - Foreign Investment in Real Property Tax Act calculations
5. **State/Local Tax (SALT) Implications** - Tax impact analysis
6. **Escrow Calculations** - Buyer's cost for property tax/insurance reserves
7. **HOA Transfer Fee** - Per-transaction HOA fees
8. **Seller Net Calculator** - Work backward from desired seller net proceeds

---

## Support

For questions or issues:
1. Check test cases in `closingCostEngine.test.ts`
2. Review example configs in `config/` folder
3. Validate inputs with the ValidationError handler
4. Enable `debug: true` when creating engine for detailed logging

---

## License

This closing cost engine is part of the ZSrehab Flip Calculator project.

---

## Changelog

### v1.0.0 (Initial Release)

- ✓ Transfer tax calculations (percent, flat, tiered brackets)
- ✓ Recording fee schedules
- ✓ Title insurance with simultaneous issue discount
- ✓ Settlement and flat fees
- ✓ Property tax and HOA prorations (HUD-style)
- ✓ Jurisdiction matching with fallback chain
- ✓ Full TypeScript typing
- ✓ Comprehensive test suite
- ✓ Example configs for TX (no transfer tax) and PA (complex)
