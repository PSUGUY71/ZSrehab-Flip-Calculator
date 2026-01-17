# Closing Cost Engine - JSON Schema Documentation

This document describes the JSON schema for all configuration files.

## Root Profile Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "jurisdictionProfile.schema.json",
  "type": "object",
  "required": ["jurisdiction_id", "level", "state"],
  "properties": {
    "jurisdiction_id": {
      "type": "string",
      "description": "Unique identifier (e.g., PA, PA_ALLEGHENY, PA_15213)",
      "examples": ["PA", "TX_HARRIS", "CA_SFO", "DEFAULT"]
    },
    "level": {
      "type": "string",
      "enum": ["state", "county", "city", "zip"],
      "description": "Profile specificity level for matching priority"
    },
    "state": {
      "type": "string",
      "description": "Two-letter state code",
      "pattern": "^[A-Z]{2}$",
      "examples": ["PA", "TX", "CA"]
    },
    "county": {
      "type": "string",
      "description": "County name (optional, level=county required)"
    },
    "city": {
      "type": "string",
      "description": "City name (optional, level=city required)"
    },
    "zip": {
      "type": "string",
      "description": "ZIP code (optional, level=zip required)",
      "pattern": "^[0-9]{5}$"
    },
    "description": {
      "type": "string",
      "description": "Human-readable description"
    },
    "transfer_taxes": {
      "type": "array",
      "items": { "$ref": "#/definitions/TransferTax" },
      "description": "Deed and transfer tax configurations"
    },
    "recording": {
      "$ref": "#/definitions/RecordingProfile",
      "description": "Recording fee schedules"
    },
    "title": {
      "$ref": "#/definitions/TitleProfile",
      "description": "Title insurance configuration"
    },
    "settlement": {
      "type": "object",
      "additionalProperties": { "$ref": "#/definitions/FeeConfig" },
      "description": "Settlement and flat fees"
    },
    "proration": {
      "$ref": "#/definitions/ProrationProfile",
      "description": "Tax proration rules"
    }
  },
  "definitions": {
    "TransferTax": {
      "type": "object",
      "required": ["id", "description", "base_type", "calc_type", "payer_default"],
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for this tax item"
        },
        "description": {
          "type": "string",
          "description": "Human-readable name"
        },
        "base_type": {
          "type": "string",
          "enum": ["price", "loan", "deed", "mortgage"],
          "description": "What the tax is calculated on"
        },
        "calc_type": {
          "type": "string",
          "enum": ["percent", "flat", "tiered_brackets"],
          "description": "How the tax is calculated"
        },
        "payer_default": {
          "type": "string",
          "enum": ["buyer", "seller", "split"],
          "description": "Who pays the tax by default"
        },
        "split_buyer_pct": {
          "type": "number",
          "minimum": 0,
          "maximum": 100,
          "description": "Buyer's share percentage (when payer_default=split)"
        },
        "split_seller_pct": {
          "type": "number",
          "minimum": 0,
          "maximum": 100,
          "description": "Seller's share percentage (must sum to 100 with buyer_pct)"
        },
        "rate": {
          "type": "number",
          "minimum": 0,
          "description": "Tax rate as decimal (e.g., 0.010 for 1%)"
        },
        "flat_amount": {
          "type": "number",
          "minimum": 0,
          "description": "Flat dollar amount"
        },
        "brackets": {
          "$ref": "#/definitions/BracketTable",
          "description": "Tiered bracket table (for calc_type=tiered_brackets)"
        },
        "exemption_rule": {
          "type": "object",
          "description": "Optional exemption configuration"
        }
      }
    },
    "BracketTable": {
      "type": "object",
      "required": ["brackets"],
      "properties": {
        "brackets": {
          "type": "array",
          "items": { "$ref": "#/definitions/Bracket" },
          "description": "Array of tax brackets in ascending order"
        }
      }
    },
    "Bracket": {
      "type": "object",
      "required": ["min_inclusive", "rate"],
      "properties": {
        "min_inclusive": {
          "type": "number",
          "description": "Minimum amount (inclusive) for this bracket"
        },
        "max_inclusive": {
          "type": ["number", "null"],
          "description": "Maximum amount (inclusive), null = unlimited"
        },
        "rate": {
          "type": "number",
          "minimum": 0,
          "description": "Tax rate for this bracket"
        }
      }
    },
    "RecordingProfile": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier"
        },
        "deed_recording": {
          "$ref": "#/definitions/FeeSchedule"
        },
        "mortgage_recording": {
          "$ref": "#/definitions/FeeSchedule"
        },
        "ancillary_recording": {
          "type": "object",
          "additionalProperties": { "$ref": "#/definitions/FeeSchedule" },
          "description": "Per-document-type ancillary fees"
        },
        "flat_surcharge": {
          "type": "number",
          "minimum": 0,
          "description": "Optional flat surcharge applied to all recording"
        }
      }
    },
    "FeeSchedule": {
      "type": "object",
      "required": ["per_document_fee", "per_page_fee"],
      "properties": {
        "per_document_fee": {
          "type": "number",
          "minimum": 0,
          "description": "Fee per document"
        },
        "per_page_fee": {
          "type": "number",
          "minimum": 0,
          "description": "Fee per page"
        },
        "tiers": {
          "type": "array",
          "items": { "$ref": "#/definitions/FeeTier" },
          "description": "Optional tiered fee overrides based on page count"
        }
      }
    },
    "FeeTier": {
      "type": "object",
      "required": ["pages_min"],
      "properties": {
        "pages_min": {
          "type": "number",
          "description": "Minimum page count for this tier"
        },
        "pages_max": {
          "type": ["number", "null"],
          "description": "Maximum page count (null = unlimited)"
        },
        "per_page_override": {
          "type": "number",
          "description": "Override per_page_fee for this tier"
        },
        "flat_override": {
          "type": "number",
          "description": "Override per_document_fee for this tier"
        }
      }
    },
    "TitleProfile": {
      "type": "object",
      "required": ["id", "pricing_method", "lender_policy"],
      "properties": {
        "id": {
          "type": "string"
        },
        "pricing_method": {
          "type": "string",
          "enum": ["rate_table", "percent", "flat"]
        },
        "lender_policy": {
          "$ref": "#/definitions/TitlePolicyConfig"
        },
        "owner_policy": {
          "$ref": "#/definitions/TitlePolicyConfig"
        },
        "simultaneous_issue_discount": {
          "type": "object",
          "properties": {
            "applies": { "type": "boolean" },
            "discount_pct": {
              "type": "number",
              "minimum": 0,
              "maximum": 100
            }
          }
        },
        "endorsements": {
          "type": "object",
          "additionalProperties": { "type": "number" },
          "description": "Endorsement code to price mapping"
        },
        "cpl": {
          "type": "number",
          "minimum": 0,
          "description": "Closing Protection Letter fee"
        }
      }
    },
    "TitlePolicyConfig": {
      "type": "object",
      "properties": {
        "base_on": {
          "type": "string",
          "enum": ["loan_amount", "purchase_price"]
        },
        "percent": {
          "type": "number",
          "minimum": 0,
          "description": "Rate as decimal (0.005 = 0.5%)"
        },
        "flat": {
          "type": "number",
          "minimum": 0
        },
        "rate_table": {
          "$ref": "#/definitions/RateTable"
        }
      }
    },
    "RateTable": {
      "type": "object",
      "required": ["entries"],
      "properties": {
        "entries": {
          "type": "array",
          "items": { "$ref": "#/definitions/RateTableEntry" }
        }
      }
    },
    "RateTableEntry": {
      "type": "object",
      "required": ["loan_min"],
      "properties": {
        "loan_min": {
          "type": "number",
          "description": "Minimum loan/price amount"
        },
        "loan_max": {
          "type": ["number", "null"],
          "description": "Maximum loan/price amount (null = unlimited)"
        },
        "rate": {
          "type": "number",
          "minimum": 0
        },
        "flat": {
          "type": "number",
          "minimum": 0
        }
      }
    },
    "FeeConfig": {
      "type": "object",
      "required": ["amount", "payer"],
      "properties": {
        "amount": {
          "type": "number",
          "minimum": 0
        },
        "payer": {
          "type": "string",
          "enum": ["buyer", "seller", "split"]
        },
        "split_buyer_pct": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        },
        "split_seller_pct": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        }
      }
    },
    "ProrationProfile": {
      "type": "object",
      "required": ["id", "day_count", "closing_day_owner", "rounding", "default_proration_style"],
      "properties": {
        "id": {
          "type": "string"
        },
        "day_count": {
          "type": "string",
          "enum": ["actual_365", "actual_360", "30_360"],
          "description": "Day count convention"
        },
        "closing_day_owner": {
          "type": "string",
          "enum": ["buyer", "seller"],
          "description": "Who owns property on closing day"
        },
        "rounding": {
          "type": "string",
          "enum": ["cents", "whole_dollars"]
        },
        "default_proration_style": {
          "type": "string",
          "enum": ["paid_in_advance_common", "arrears_common"],
          "description": "Default treatment for unknown bills"
        }
      }
    }
  }
}
```

## Example: Pennsylvania Multi-Bracket Tax

```json
{
  "id": "school_transfer_tax",
  "description": "Pennsylvania School District Transfer Tax",
  "base_type": "price",
  "calc_type": "tiered_brackets",
  "payer_default": "seller",
  "brackets": {
    "brackets": [
      {
        "min_inclusive": 0,
        "max_inclusive": 100000,
        "rate": 0.005
      },
      {
        "min_inclusive": 100000,
        "max_inclusive": 500000,
        "rate": 0.010
      },
      {
        "min_inclusive": 500000,
        "max_inclusive": null,
        "rate": 0.015
      }
    ]
  }
}
```

**For $300,000 property:**
- $0 to $100,000 @ 0.5% = $500
- $100,000 to $300,000 @ 1.0% = $2,000
- **Total: $2,500**

## Example: Rate Table Title Insurance

```json
{
  "id": "title_lender_policy",
  "lender_policy": {
    "base_on": "loan_amount",
    "rate_table": {
      "entries": [
        {
          "loan_min": 0,
          "loan_max": 25000,
          "flat": 300
        },
        {
          "loan_min": 25000,
          "loan_max": 100000,
          "rate": 0.006
        },
        {
          "loan_min": 100000,
          "loan_max": 500000,
          "rate": 0.005
        },
        {
          "loan_min": 500000,
          "loan_max": null,
          "rate": 0.004
        }
      ]
    }
  }
}
```

**For $240,000 loan:**
- Falls in bracket: $100,000 to $500,000
- Calculation: $240,000 × 0.005 = $1,200

## File Naming Conventions

| Level | Example Filename | Jurisdiction ID |
|-------|-----------------|-----------------|
| State | `PA.json` | `PA` |
| County | `PA_ALLEGHENY.json` | `PA_ALLEGHENY` |
| City | `PA_ALLEGHENY_PITTSBURGH.json` | `PA_ALLEGHENY_PITTSBURGH` |
| ZIP | `PA_15213.json` | `PA_15213` |
| Default | `DEFAULT.json` | `DEFAULT` |

---

## Validation Rules

1. **Jurisdiction IDs** must be unique
2. **Transfer taxes**: base_type, calc_type, and payer_default are required
3. **Split percentages**: split_buyer_pct + split_seller_pct must equal 100 when payer_default="split"
4. **Brackets**: Must be in ascending order by min_inclusive
5. **Recording fees**: Both per_document_fee and per_page_fee required
6. **Dates**: Must be ISO format "YYYY-MM-DD"
7. **All amounts**: Must be >= 0
8. **Rates**: Must be 0-1 (e.g., 0.005 for 0.5%)

---

## Configuration Checklist

Before deploying a new state config:

- [ ] Research actual closing costs for 3-5 real transactions
- [ ] Verify transfer tax rates match state tax board
- [ ] Confirm recording fee schedule matches county recorder
- [ ] Validate title insurance rates with local title company
- [ ] Verify settlement fee amounts are market standard
- [ ] Test with realistic deal scenarios
- [ ] Compare outputs to actual Closing Disclosures
- [ ] Document any state-specific rules in comments
