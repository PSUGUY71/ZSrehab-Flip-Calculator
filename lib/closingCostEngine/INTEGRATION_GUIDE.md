# Integration Guide - Closing Cost Engine with React App

## Overview

This guide shows how to integrate the production Closing Cost Engine into the existing ZS Rehab Flip Calculator React application.

## Step 1: Set Up Configuration

### 1.1 Initialize Engine in App Component

```typescript
// App.tsx
import { useEffect, useRef, useState } from 'react';
import { ClosingCostEngine, createClosingCostEngine } from './lib/closingCostEngine';
import { ClosingCostResult, DealInput } from './lib/closingCostEngine/types';
import { buildTestConfigMap } from './lib/closingCostEngine/__tests__/fixtures/sampleConfigs';

export default function App() {
  const engineRef = useRef<ClosingCostEngine | null>(null);
  const [result, setResult] = useState<ClosingCostResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize engine once
  useEffect(() => {
    const configMap = buildTestConfigMap();
    engineRef.current = createClosingCostEngine(configMap);
  }, []);

  const handleCalculate = (deal: DealInput) => {
    try {
      if (!engineRef.current) {
        throw new Error('Engine not initialized');
      }
      const result = engineRef.current.calculate(deal);
      setResult(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setResult(null);
    }
  };

  return (
    <div>
      {/* Existing UI */}
      {error && <div className="error">{error}</div>}
      {result && <ClosingCostResults result={result} />}
    </div>
  );
}
```

### 1.2 Add Config Loading (Optional: Load from API)

```typescript
// lib/configLoader.ts (app-level)
export async function loadProductionConfigs(): Promise<Record<string, any>> {
  // Option 1: Use test configs (development)
  if (process.env.NODE_ENV === 'development') {
    const { buildTestConfigMap } = await import('./closingCostEngine/__tests__/fixtures/sampleConfigs');
    return buildTestConfigMap();
  }

  // Option 2: Load from API (production)
  const response = await fetch('/api/closing-cost-configs');
  return response.json();
}
```

## Step 2: Convert Form Data to DealInput

### 2.1 Map Form State to DealInput

```typescript
// utils/dealInputConverter.ts
import { DealInput } from '../lib/closingCostEngine/types';

export function convertFormToDealInput(formData: AppState): DealInput {
  const {
    property,
    financials,
    selections,
    tax_lines,
    hoa_lines,
  } = formData;

  return {
    property: {
      state: property.state,
      county: property.county,
      city: property.city,
      zip: property.zip,
    },
    purchase_price: financials.purchase_price,
    loan_amount: financials.loan_amount,
    closing_date: financials.closing_date, // ISO 8601
    docs: {
      deed_docs_count: selections.deed_docs || 1,
      deed_pages: selections.deed_pages || 1,
      mortgage_docs_count: selections.mortgage_docs || 1,
      mortgage_pages: selections.mortgage_pages || 1,
      ancillary: selections.ancillary_docs || [],
    },
    selections: {
      owner_policy: selections.owner_policy,
      endorsements: selections.endorsements || [],
      cpl_fee: selections.cpl_fee || false,
    },
    tax_lines: tax_lines.map(line => ({
      description: line.description,
      amount: line.amount,
      period_start: line.period_start,
      period_end: line.period_end,
      closing_date: financials.closing_date,
      payment_status: line.status || 'unpaid',
      payer_of_bill: line.payer || 'seller',
    })),
    hoa_lines: hoa_lines?.map(line => ({
      description: line.description,
      amount: line.amount,
      period_start: line.period_start,
      period_end: line.period_end,
      closing_date: financials.closing_date,
      payment_status: line.status || 'unpaid',
      payer_of_bill: line.payer || 'seller',
    })),
    flat_fee_overrides: selections.flat_fee_overrides,
  };
}
```

## Step 3: Create Results Display Component

### 3.1 Main Results Display

```typescript
// components/ClosingCostResults.tsx
import { ClosingCostResult } from '../lib/closingCostEngine/types';

export interface ClosingCostResultsProps {
  result: ClosingCostResult;
}

export default function ClosingCostResults({ result }: ClosingCostResultsProps) {
  return (
    <div className="closing-cost-results">
      <h2>Closing Cost Breakdown</h2>

      {/* Line Items by Category */}
      <LineItemsView items={result.line_items_by_category} />

      {/* Buyer Summary */}
      <div className="buyer-section">
        <h3>Buyer Costs</h3>
        <SideCalculationView side={result.buyer} label="Buyer" />
      </div>

      {/* Seller Summary */}
      <div className="seller-section">
        <h3>Seller Credits</h3>
        <SideCalculationView side={result.seller} label="Seller" />
      </div>

      {/* Debug Info (Optional) */}
      {process.env.NODE_ENV === 'development' && (
        <DebugInfo debug={result.debug} />
      )}
    </div>
  );
}
```

### 3.2 Line Items Component

```typescript
// components/LineItemsView.tsx
import { LineItemGroup } from '../lib/closingCostEngine/types';

interface LineItemsViewProps {
  items: LineItemGroup[];
}

export function LineItemsView({ items }: LineItemsViewProps) {
  return (
    <table className="line-items-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {items.map((group, i) => (
          <tr key={i}>
            <td colSpan={3} className="category-header">
              <strong>{group.category}</strong>
            </td>
          </tr>
        ))}
        {items.flatMap((group) =>
          group.items.map((item, i) => (
            <tr key={`${group.category}-${i}`}>
              <td></td>
              <td>{item.description}</td>
              <td className="amount">${item.amount.toFixed(2)}</td>
            </tr>
          ))
        )}
        {items.map((group, i) => (
          <tr key={`subtotal-${i}`} className="subtotal-row">
            <td></td>
            <td>
              <strong>{group.category} Subtotal</strong>
            </td>
            <td className="amount">
              <strong>${group.subtotal.toFixed(2)}</strong>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### 3.3 Buyer/Seller Summary Component

```typescript
// components/SideCalculationView.tsx
import { SideCalculation } from '../lib/closingCostEngine/types';

interface SideCalculationViewProps {
  side: SideCalculation;
  label: string;
}

export function SideCalculationView({ side, label }: SideCalculationViewProps) {
  const owesOrReceives = side.net > 0 ? 'owes' : 'receives';
  const amount = Math.abs(side.net);

  return (
    <div className="side-calculation">
      <div className="row">
        <span>Debits (costs):</span>
        <span className="amount">${side.total_debits.toFixed(2)}</span>
      </div>
      <div className="row">
        <span>Credits (paid):</span>
        <span className="amount">${side.total_credits.toFixed(2)}</span>
      </div>
      <div className="row total">
        <span>
          <strong>
            {label} {owesOrReceives} ${amount.toFixed(2)}
          </strong>
        </span>
        <span className="amount">
          <strong>${side.net.toFixed(2)}</strong>
        </span>
      </div>

      {/* Detail Lists (optional) */}
      {side.debits.length > 0 && (
        <details>
          <summary>Debits</summary>
          <ul>
            {side.debits.map((item, i) => (
              <li key={i}>
                {item.description}: ${item.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </details>
      )}

      {side.credits.length > 0 && (
        <details>
          <summary>Credits</summary>
          <ul>
            {side.credits.map((item, i) => (
              <li key={i}>
                {item.description}: ${item.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
```

## Step 4: Wire Up Calculation

### 4.1 Add Calculate Button to Form

```typescript
// components/DealModal.tsx (existing component)
import { convertFormToDealInput } from '../utils/dealInputConverter';

export default function DealModal({ isOpen, onClose, onCalculate }) {
  const [formData, setFormData] = useState<AppState>(...);

  const handleCalculateClosingCosts = () => {
    try {
      const dealInput = convertFormToDealInput(formData);
      onCalculate(dealInput);
      // Results will be displayed via ClosingCostResults component
    } catch (error) {
      console.error('Failed to calculate closing costs:', error);
      alert('Error calculating closing costs. Please check your inputs.');
    }
  };

  return (
    <div className="deal-modal">
      {/* Existing form fields */}

      <button onClick={handleCalculateClosingCosts}>
        Calculate Closing Costs
      </button>
    </div>
  );
}
```

## Step 5: Add Styling

### 5.1 Basic CSS

```css
/* styles/closingCosts.css */

.closing-cost-results {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.line-items-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.line-items-table th,
.line-items-table td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.line-items-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.category-header {
  background-color: #f9f9f9;
  font-weight: bold;
  padding-top: 1rem;
}

.subtotal-row {
  background-color: #f5f5f5;
  font-weight: bold;
}

.amount {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.side-calculation {
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f9f9f9;
  border-left: 4px solid #007bff;
  border-radius: 4px;
}

.side-calculation .row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.side-calculation .row.total {
  font-size: 1.2rem;
  border-top: 2px solid #ddd;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
}

.buyer-section {
  border-left: 4px solid #28a745;
}

.seller-section {
  border-left: 4px solid #dc3545;
}
```

## Step 6: Error Handling

### 6.1 Add Error Boundary

```typescript
// components/ClosingCostErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ClosingCostErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('Closing cost calculation error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-message">
          <h3>Calculation Error</h3>
          <p>{this.state.error?.message}</p>
          <p>Please check your inputs and try again.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 6.2 Use Error Boundary

```typescript
// App.tsx
<ClosingCostErrorBoundary>
  <ClosingCostResults result={result} />
</ClosingCostErrorBoundary>
```

## Step 7: Testing Integration

### 7.1 Component Test

```typescript
// components/__tests__/ClosingCostResults.test.tsx
import { render, screen } from '@testing-library/react';
import ClosingCostResults from '../ClosingCostResults';
import { buildTestConfigMap } from '../../lib/closingCostEngine/__tests__/fixtures/sampleConfigs';
import { PA_RESIDENTIAL_DEAL } from '../../lib/closingCostEngine/__tests__/fixtures/sampleDealInputs';
import { createClosingCostEngine } from '../../lib/closingCostEngine';

describe('ClosingCostResults', () => {
  test('should display closing cost breakdown', () => {
    const engine = createClosingCostEngine(buildTestConfigMap());
    const result = engine.calculate(PA_RESIDENTIAL_DEAL);

    render(<ClosingCostResults result={result} />);

    expect(screen.getByText('Closing Cost Breakdown')).toBeInTheDocument();
    expect(screen.getByText('Buyer Costs')).toBeInTheDocument();
    expect(screen.getByText('Seller Credits')).toBeInTheDocument();
  });

  test('should display line items by category', () => {
    const engine = createClosingCostEngine(buildTestConfigMap());
    const result = engine.calculate(PA_RESIDENTIAL_DEAL);

    render(<ClosingCostResults result={result} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
```

## Step 8: Data Flow Diagram

```
User Input (Form)
       ↓
convertFormToDealInput()
       ↓
DealInput object
       ↓
engine.calculate(deal)
       ↓
ClosingCostResult object
       ↓
<ClosingCostResults /> displays result
```

## Step 9: Configuration Override (Optional)

### 9.1 Allow Custom Rates

```typescript
// Allow user to override jurisdiction config
export function overrideJurisdictionConfig(
  base: JurisdictionProfile,
  overrides: Partial<JurisdictionProfile>
): JurisdictionProfile {
  return {
    ...base,
    ...overrides,
    transfer_taxes: overrides.transfer_taxes ?? base.transfer_taxes,
    recording_fees: overrides.recording_fees ?? base.recording_fees,
    title_insurance: overrides.title_insurance ?? base.title_insurance,
    settlement_fees: { ...base.settlement_fees, ...overrides.settlement_fees },
    prorations: overrides.prorations ?? base.prorations,
  };
}
```

## Troubleshooting

### Issue: "Engine not initialized"

**Solution**: Make sure `useEffect` runs before calculation.

```typescript
useEffect(() => {
  const configMap = buildTestConfigMap();
  engineRef.current = createClosingCostEngine(configMap);
}, []); // Empty deps means runs once on mount
```

### Issue: "Invalid closing date"

**Solution**: Ensure date is ISO 8601 format (YYYY-MM-DD).

```typescript
const date = new Date('2024-06-15').toISOString().split('T')[0]; // "2024-06-15"
```

### Issue: "Unknown jurisdiction"

**Solution**: Engine falls back to DEFAULT config automatically. Check debug info:

```typescript
console.log(result.debug.jurisdiction_profile_matched);
```

## Performance Optimization

### Cache Engine Instance

```typescript
// Don't recreate engine on every render
const engineRef = useRef<ClosingCostEngine | null>(null);

if (!engineRef.current) {
  engineRef.current = createClosingCostEngine(configMap);
}
```

### Memoize Results

```typescript
const memoizedResult = useMemo(() => {
  if (!deal) return null;
  return engineRef.current?.calculate(deal);
}, [deal]);
```

### Lazy Load Configs

```typescript
const [configs, setConfigs] = useState<Record<string, JurisdictionProfile> | null>(null);

useEffect(() => {
  loadProductionConfigs().then(setConfigs);
}, []);

if (!configs) return <LoadingSpinner />;
```

## Production Checklist

- ✅ Engine module imported and working
- ✅ Configuration loaded (test or production)
- ✅ Form inputs converted to DealInput
- ✅ Calculation function wired up
- ✅ Results display component created
- ✅ Error handling and boundaries in place
- ✅ Styling applied
- ✅ Tests passing
- ✅ Performance optimized
- ✅ Documentation added

## Next Steps

1. Copy this integration guide into your app
2. Create the converter utility
3. Build the results display components
4. Wire up the form
5. Test with sample deals
6. Deploy!

Ready to integrate? The engine is production-ready. Start with the `convertFormToDealInput()` function and results display component.
