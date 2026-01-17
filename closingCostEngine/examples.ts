/**
 * Closing Cost Engine - Usage Examples and Demos
 */

import ClosingCostEngine from './closingCostEngine';
import { DealInput } from './types';

/**
 * Example 1: Simple Pennsylvania purchase with prorations
 */
export function examplePA_SimplePurchase() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║  EXAMPLE 1: Pennsylvania - Simple Purchase                      ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  const engine = new ClosingCostEngine({
    config_dir: './closingCostEngine/config',
    debug: false,
  });

  const deal: DealInput = {
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
      endorsements: ['ALTA-1'],
      cpl: true,
    },

    tax_lines: [
      {
        id: 'prop_tax_2024',
        description: '2024 Annual Property Tax',
        amount: 4200,
        period_start: '2024-01-01',
        period_end: '2024-12-31',
        payment_status: 'paid',
        payer_of_bill: 'seller',
      },
    ],
  };

  const result = engine.calculate(deal);

  console.log('BUYER CLOSING COSTS');
  console.log('━━━━━━━━━━━━━━━━━━');
  for (const [category, items] of Object.entries(result.all_items_by_category)) {
    const buyer_charges = items.filter(i => i.buyer_debit > 0 || i.buyer_credit > 0);
    if (buyer_charges.length === 0) continue;

    console.log(`\n${category}:`);
    for (const item of buyer_charges) {
      if (item.buyer_debit > 0) {
        console.log(`  ${item.description}: +$${item.buyer_debit.toFixed(2)}`);
      }
      if (item.buyer_credit > 0) {
        console.log(`  ${item.description}: -$${item.buyer_credit.toFixed(2)}`);
      }
    }
  }

  console.log(`\nTotal Debits                   $${result.buyer_total_debit.toFixed(2)}`);
  console.log(`Total Credits                  $${result.buyer_total_credit.toFixed(2)}`);
  console.log(`──────────────────────────── ─────────────────`);
  console.log(`NET CASH AT CLOSING            $${result.buyer_net.toFixed(2)}`);

  console.log('\n\nSELLER NET PROCEEDS');
  console.log('━━━━━━━━━━━━━━━━━━');
    console.log(`Sales Price:      $${deal.purchase_price.toFixed(2)}`);
    console.log(`Less: Closing Costs: $${result.seller_net.toFixed(2)}`);
    console.log(`──────────────────────────── ─────────────────`);
    console.log(`NET PROCEEDS: $${(deal.purchase_price - result.seller_net).toFixed(2)}`);
}

/**
 * Example 2: Texas purchase (no transfer tax)
 */
export function exampleTX_NoTransferTax() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║  EXAMPLE 2: Texas - No State Transfer Tax                      ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  const engine = new ClosingCostEngine({
    config_dir: './closingCostEngine/config',
  });

  const deal: DealInput = {
    property: {
      state: 'TX',
      county: 'Harris',
      city: 'Houston',
    },
    purchase_price: 400000,
    loan_amount: 320000,
    closing_date: '2024-07-01',

    docs: {
      deed_docs_count: 1,
      deed_pages: 2,
      mortgage_docs_count: 1,
      mortgage_pages: 4,
    },

    selections: {
      owner_policy: true,
      endorsements: [],
      cpl: false,
    },
  };

  try {
    const result = engine.calculate(deal);

    console.log('KEY METRICS');
    console.log('━━━━━━━━━━━');
    console.log(`Purchase Price:      $${deal.purchase_price.toFixed(2)}`);
    console.log(`Loan Amount:         $${deal.loan_amount.toFixed(2)}`);
    console.log(`Down Payment:        $${(deal.purchase_price - deal.loan_amount).toFixed(2)}`);
    console.log(`LTV:                 ${(deal.loan_amount / deal.purchase_price * 100).toFixed(2)}%`);

    console.log('\n\nBUYER CLOSING COSTS SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Total Debits:        $${result.buyer_total_debit.toFixed(2)}`);
    console.log(`Total Credits:       $${result.buyer_total_credit.toFixed(2)}`);
    console.log(`Net at Closing:      $${result.buyer_net.toFixed(2)}`);
    console.log(`(Percentage of Sale) ${(result.buyer_net / deal.purchase_price * 100).toFixed(2)}%`);

    console.log('\n\nSELLER CLOSING COSTS SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Total Debits:        $${result.seller_total_debit.toFixed(2)}`);
    console.log(`Total Credits:       $${result.seller_total_credit.toFixed(2)}`);
    console.log(`Net Cost:            $${result.seller_net.toFixed(2)}`);
    console.log(`(Percentage of Sale) ${(result.seller_net / deal.purchase_price * 100).toFixed(2)}%`);

    console.log('\n\nDETAILED BREAKDOWN');
    console.log('━━━━━━━━━━━━━━━━━');
    for (const [category, items] of Object.entries(result.all_items_by_category)) {
      if (items.length === 0) continue;
      console.log(`\n${category}:`);
      for (const item of items) {
        let desc = `  ${item.description}`;
        if (item.buyer_debit > 0 || item.buyer_credit > 0) {
          console.log(`${desc} Buyer: $${item.buyer_debit.toFixed(2)}`);
        }
        if (item.seller_debit > 0 || item.seller_credit > 0) {
          console.log(`${desc} Seller: $${item.seller_debit.toFixed(2)}`);
        }
      }
    }
  } catch (e) {
    console.error('Error:', e);
  }
}

/**
 * Example 3: With flat fee overrides
 */
export function exampleWithFeeOverrides() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║  EXAMPLE 3: Custom Flat Fee Overrides                          ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  const engine = new ClosingCostEngine({
    config_dir: './closingCostEngine/config',
  });

  const deal: DealInput = {
    property: { state: 'PA', county: 'Allegheny' },
    purchase_price: 250000,
    loan_amount: 200000,
    closing_date: '2024-05-20',

    docs: {
      deed_docs_count: 1,
      deed_pages: 2,
      mortgage_docs_count: 1,
      mortgage_pages: 4,
    },

    selections: {
      owner_policy: false,
      endorsements: [],
      cpl: false,
    },

    // Override default settlement fees
    flat_fees: {
      attorney_fee: 750, // instead of default 600
      settlement_fee: 600,
    },
  };

  const result = engine.calculate(deal);

  console.log('Settlement Fees (with overrides):');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  const settlement_items = result.all_items_by_category['Settlement & Attorney Fees'] || [];
  for (const item of settlement_items) {
    if (item.seller_debit > 0) {
      console.log(`  ${item.description.padEnd(30)} $${item.seller_debit.toFixed(2)}`);
    }
  }

  console.log(`\nTotal Seller Closing Costs: $${result.seller_net.toFixed(2)}`);
}

/**
 * Example 4: Complex scenario with HOA and multiple tax lines
 */
export function exampleComplexProrations() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║  EXAMPLE 4: Complex Prorations (Property Tax + HOA)            ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  const engine = new ClosingCostEngine({
    config_dir: './closingCostEngine/config',
  });

  const deal: DealInput = {
    property: { state: 'PA', county: 'Allegheny' },
    purchase_price: 350000,
    loan_amount: 280000,
    closing_date: '2024-09-30', // End of Q3

    docs: {
      deed_docs_count: 1,
      deed_pages: 3,
      mortgage_docs_count: 1,
      mortgage_pages: 5,
    },

    selections: {
      owner_policy: true,
      endorsements: ['ALTA-1'],
      cpl: false,
    },

    // Property tax - paid in advance by seller
    tax_lines: [
      {
        id: 'prop_tax_2024',
        description: '2024 Property Tax (Annual)',
        amount: 5200,
        period_start: '2024-01-01',
        period_end: '2024-12-31',
        payment_status: 'paid',
        payer_of_bill: 'seller',
      },
    ],

    // HOA dues - unpaid, will be paid by buyer
    hoa_lines: [
      {
        id: 'hoa_q4_2024',
        description: 'HOA Dues Q4 2024',
        amount: 1200,
        period_start: '2024-10-01',
        period_end: '2024-12-31',
        payment_status: 'unpaid',
        payer_of_bill: 'buyer',
      },
    ],
  };

  const result = engine.calculate(deal);

  console.log('PRORATIONS DETAIL');
  console.log('━━━━━━━━━━━━━━━');

  const proration_items = result.all_items_by_category['Prorations'] || [];
  for (const item of proration_items) {
    console.log(`\n${item.description}`);
    console.log(`  Notes: ${item.notes}`);
    if (item.buyer_debit > 0) {
      console.log(`  Buyer debit:  $${item.buyer_debit.toFixed(2)}`);
    }
    if (item.buyer_credit > 0) {
      console.log(`  Buyer credit: $${item.buyer_credit.toFixed(2)}`);
    }
    if (item.seller_debit > 0) {
      console.log(`  Seller debit: $${item.seller_debit.toFixed(2)}`);
    }
    if (item.seller_credit > 0) {
      console.log(`  Seller credit: $${item.seller_credit.toFixed(2)}`);
    }
  }

  console.log(`\n\nBUYER IMPACT`);
  console.log('━━━━━━━━━━━');
  const buyer_prorations = proration_items.reduce(
    (sum, item) => sum + item.buyer_debit - item.buyer_credit,
    0
  );
  console.log(`Net prorations impact: $${buyer_prorations.toFixed(2)}`);
  console.log(`(Positive = buyer pays; negative = seller pays)`);
}

/**
 * Run all examples
 */
export function runAllExamples() {
  console.log(
    '\n╔════════════════════════════════════════════════════════════════╗'
  );
  console.log('║     CLOSING COST ENGINE - PRACTICAL EXAMPLES                 ║');
  console.log(
    '╚════════════════════════════════════════════════════════════════╝'
  );

  try {
    examplePA_SimplePurchase();
    exampleTX_NoTransferTax();
    exampleWithFeeOverrides();
    exampleComplexProrations();

    console.log(
      '\n╔════════════════════════════════════════════════════════════════╗'
    );
    console.log('║  ✓ All examples completed successfully                       ║');
    console.log(
      '╚════════════════════════════════════════════════════════════════╝\n'
    );
  } catch (e) {
    console.error('Error in examples:', e);
  }
}

if (require.main === module) {
  runAllExamples();
}
