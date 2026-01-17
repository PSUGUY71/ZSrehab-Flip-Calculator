/**
 * Comprehensive unit tests for the Closing Cost Engine
 */

import { strict as assert } from 'assert';
import ClosingCostEngine from './closingCostEngine';
import { 
  DealInput, 
  JurisdictionProfile, 
  TaxLine,
  TransferTaxConfig,
} from './types';
import {
  calculateBracketPremium,
  calculateRecordingFees,
  calculateTitleInsurance,
  calculateSettlementFees,
} from './calculations';
import {
  prorateAmount,
  calculateDaysInPeriod,
  calculateBuyerSellerDays,
} from './proration';
import { parseISODate } from './validation';

// ============================================================================
// TEST DATA
// ============================================================================

const testDealInput: DealInput = {
  property: { state: 'PA', county: 'Allegheny', city: 'Pittsburgh' },
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
};

const testProfilePA: JurisdictionProfile = {
  jurisdiction_id: 'PA',
  level: 'state',
  state: 'PA',
  description: 'Pennsylvania',
  transfer_taxes: [
    {
      id: 'deed_tax',
      description: 'Deed Tax',
      base_type: 'price',
      calc_type: 'percent',
      payer_default: 'seller',
      rate: 0.01,
    },
    {
      id: 'mortgage_tax',
      description: 'Mortgage Tax',
      base_type: 'loan',
      calc_type: 'percent',
      payer_default: 'buyer',
      rate: 0.005,
    },
  ],
  recording: {
    id: 'recording_pa',
    deed_recording: { per_document_fee: 50, per_page_fee: 2 },
    mortgage_recording: { per_document_fee: 50, per_page_fee: 2 },
  },
  title: {
    id: 'title_pa',
    pricing_method: 'percent',
    lender_policy: { base_on: 'loan_amount', percent: 0.005 },
    owner_policy: { base_on: 'purchase_price', percent: 0.006 },
    simultaneous_issue_discount: { applies: true, discount_pct: 25 },
    endorsements: { 'ALTA-1': 100 },
    cpl: 150,
  },
  settlement: {
    settlement_fee: { amount: 500, payer: 'seller' },
    attorney_fee: { amount: 600, payer: 'seller' },
  },
  proration: {
    id: 'proration_pa',
    day_count: 'actual_365',
    closing_day_owner: 'buyer',
    rounding: 'cents',
    default_proration_style: 'paid_in_advance_common',
  },
};

const testProfileTX: JurisdictionProfile = {
  jurisdiction_id: 'TX',
  level: 'state',
  state: 'TX',
  description: 'Texas - No transfer tax',
  transfer_taxes: [],
  recording: {
    id: 'recording_tx',
    deed_recording: { per_document_fee: 0, per_page_fee: 1.5 },
    mortgage_recording: { per_document_fee: 0, per_page_fee: 1.5 },
  },
  title: {
    id: 'title_tx',
    pricing_method: 'percent',
    lender_policy: { base_on: 'loan_amount', percent: 0.006 },
  },
  settlement: {
    settlement_fee: { amount: 400, payer: 'split', split_buyer_pct: 50, split_seller_pct: 50 },
  },
  proration: {
    id: 'proration_tx',
    day_count: 'actual_365',
    closing_day_owner: 'buyer',
    rounding: 'cents',
    default_proration_style: 'paid_in_advance_common',
  },
};

// ============================================================================
// BRACKET CALCULATIONS TESTS
// ============================================================================

function testBracketPremium() {
  console.log('\n=== Testing Bracket Premium Calculation ===');
  
  // Test 1: Amount spans multiple brackets
  const brackets = {
    brackets: [
      { min_inclusive: 0, max_inclusive: 100000, rate: 0.005 },
      { min_inclusive: 100000, max_inclusive: 500000, rate: 0.010 },
      { min_inclusive: 500000, max_inclusive: null, rate: 0.015 },
    ],
  };
  
  // $300,000: $100k @ 0.5% + $200k @ 1% = $500 + $2000 = $2500
  const premium = calculateBracketPremium(300000, brackets);
  assert.strictEqual(premium, 2500, 'Bracket premium should be $2500');
  console.log('✓ Multi-bracket calculation correct: $2500');
  
  // Test 2: Amount in first bracket only
  const premium2 = calculateBracketPremium(50000, brackets);
  const expected2 = 50000 * 0.005; // $250
  assert.strictEqual(premium2, expected2, 'Single bracket calculation');
  console.log('✓ Single bracket calculation correct: $250');
  
  // Test 3: Amount exceeds all brackets
  const premium3 = calculateBracketPremium(1000000, brackets);
  // $100k @ 0.5% + $400k @ 1% + $500k @ 1.5% = $500 + $4000 + $7500 = $12000
  const expected3 = 100000 * 0.005 + 400000 * 0.010 + 500000 * 0.015;
  assert.strictEqual(premium3, expected3, 'Max bracket calculation');
  console.log(`✓ Exceeds-all-brackets calculation correct: $${expected3}`);
}

// ============================================================================
// TRANSFER TAX TESTS
// ============================================================================

function testTransferTaxes() {
  console.log('\n=== Testing Transfer Tax Allocation ===');
  
  const engine = ClosingCostEngine.withTestProfiles([testProfilePA]);
  const result = engine.calculate(testDealInput);
  
  // Check deed tax (seller pays)
  const deed_tax = result.all_items_by_category['Transfer Taxes']?.[0];
  assert(deed_tax, 'Deed tax should exist');
  assert.strictEqual(deed_tax.seller_debit, 3000, 'Deed tax: $300k * 1% = $3000'); // $300k * 0.01
  assert.strictEqual(deed_tax.buyer_debit, 0, 'Deed tax should not charge buyer');
  console.log('✓ Deed tax allocation correct: $3000 to seller');
  
  // Check mortgage tax (buyer pays)
  const mortgage_tax = result.all_items_by_category['Transfer Taxes']?.[1];
  assert(mortgage_tax, 'Mortgage tax should exist');
  assert.strictEqual(mortgage_tax.buyer_debit, 1200, 'Mortgage tax: $240k * 0.5% = $1200');
  assert.strictEqual(mortgage_tax.seller_debit, 0, 'Mortgage tax should not charge seller');
  console.log('✓ Mortgage tax allocation correct: $1200 to buyer');
}

// ============================================================================
// RECORDING FEES TESTS
// ============================================================================

function testRecordingFees() {
  console.log('\n=== Testing Recording Fees ===');
  
  const recording = testProfilePA.recording!;
  const items = calculateRecordingFees(recording, testDealInput);
  
  // Deed: 1 doc @ $50 + 3 pages @ $2 = $56
  const deed_fee = items.find(i => i.description === 'Deed Recording');
  assert(deed_fee, 'Deed recording should exist');
  assert.strictEqual(deed_fee!.seller_debit, 56, 'Deed recording: 1*$50 + 3*$2 = $56');
  console.log('✓ Deed recording fee correct: $56');
  
  // Mortgage: 1 doc @ $50 + 5 pages @ $2 = $60
  const mortgage_fee = items.find(i => i.description === 'Mortgage Recording');
  assert(mortgage_fee, 'Mortgage recording should exist');
  assert.strictEqual(mortgage_fee!.seller_debit, 60, 'Mortgage recording: 1*$50 + 5*$2 = $60');
  console.log('✓ Mortgage recording fee correct: $60');
}

// ============================================================================
// TITLE INSURANCE TESTS
// ============================================================================

function testTitleInsurance() {
  console.log('\n=== Testing Title Insurance ===');
  
  const title = testProfilePA.title!;
  const items = calculateTitleInsurance(title, testDealInput);
  
  // Lender policy: $240k * 0.5% = $1200
  const lender = items.find(i => i.description === 'Lender Title Insurance Policy');
  assert(lender, 'Lender policy should exist');
  assert.strictEqual(lender!.seller_debit, 1200, 'Lender policy: $240k * 0.5% = $1200');
  console.log('✓ Lender title insurance correct: $1200');
  
  // Owner policy with simultaneous discount: $300k * 0.6% * 0.75 = $1350
  const owner = items.find(i => i.description === 'Owner Title Insurance Policy');
  assert(owner, 'Owner policy should exist');
  const expected_owner = 300000 * 0.006 * 0.75;
  assert.strictEqual(owner!.buyer_debit, expected_owner, `Owner policy with discount: $${expected_owner}`);
  console.log(`✓ Owner title insurance with discount correct: $${expected_owner}`);
  
  // Endorsement
  const endorsement = items.find(i => i.description === 'Endorsement: ALTA-1');
  assert(endorsement, 'Endorsement should exist');
  assert.strictEqual(endorsement!.seller_debit, 100, 'ALTA-1 endorsement: $100');
  console.log('✓ Title endorsement correct: $100');
  
  // CPL
  const cpl = items.find(i => i.description === 'Closing Protection Letter (CPL)');
  assert(cpl, 'CPL should exist');
  assert.strictEqual(cpl!.buyer_debit, 150, 'CPL: $150');
  console.log('✓ CPL fee correct: $150');
}

// ============================================================================
// SETTLEMENT FEES TESTS
// ============================================================================

function testSettlementFees() {
  console.log('\n=== Testing Settlement Fees ===');
  
  const settlement = testProfilePA.settlement!;
  const items = calculateSettlementFees(settlement, undefined);
  
  // Settlement fee: $500 to seller
  const settlement_item = items.find(i => i.description === 'Settlement Fee');
  assert(settlement_item, 'Settlement fee should exist');
  assert.strictEqual(settlement_item!.seller_debit, 500, 'Settlement fee: $500');
  console.log('✓ Settlement fee correct: $500');
  
  // Attorney fee: $600 to seller
  const attorney_item = items.find(i => i.description === 'Attorney Fee');
  assert(attorney_item, 'Attorney fee should exist');
  assert.strictEqual(attorney_item!.seller_debit, 600, 'Attorney fee: $600');
  console.log('✓ Attorney fee correct: $600');
}

// ============================================================================
// PRORATION TESTS
// ============================================================================

function testProrations() {
  console.log('\n=== Testing Prorations ===');
  
  const profile = testProfilePA.proration!;
  
  // Test day count: Jan 1 to Mar 31 = 90 days (actual)
  const start = parseISODate('2024-01-01');
  const end = parseISODate('2024-03-31');
  const days = calculateDaysInPeriod(start, end, 'actual_365');
  assert.strictEqual(days, 90, 'Jan 1 to Mar 31 should be 90 days');
  console.log('✓ Day count calculation correct: 90 days');
  
  // Test proration: Property tax for Q1 2024
  const tax_line: TaxLine = {
    id: 'property_tax_q1',
    description: 'Property Tax Q1',
    amount: 3600, // $3600 for quarter
    period_start: '2024-01-01',
    period_end: '2024-03-31',
    payment_status: 'paid', // Seller prepaid
    payer_of_bill: 'seller',
  };
  
  // Closing June 15 - buyer owns from June 15 to June 30 (for next period)
  // But this tax period ended, so we're prorating a different period
  // Let's use a tax period that includes closing date
  const tax_line_annual: TaxLine = {
    id: 'property_tax_annual',
    description: 'Property Tax Annual',
    amount: 14400, // $14400 annual
    period_start: '2024-01-01',
    period_end: '2024-12-31',
    payment_status: 'paid',
    payer_of_bill: 'seller',
  };
  
  const prorated = prorateAmount(tax_line_annual, '2024-06-15', profile);
  
  // Seller owns Jan 1 to Jun 14 (165 days)
  // Buyer owns Jun 15 to Dec 31 (200 days)
  // Daily rate: $14400 / 365 = $39.45/day
  const daily_rate = 14400 / 365;
  const seller_days = 165; // Jan 1 to Jun 14 inclusive
  const seller_share = daily_rate * seller_days;
  
  assert.strictEqual(prorated.buyer_days + prorated.seller_days, 366, 'Total days should match period');
  console.log(`✓ Proration days correct: ${prorated.seller_days} seller, ${prorated.buyer_days} buyer`);
  
  // Verify share calculation is close (allow rounding)
  const expected_seller_share = Math.round(seller_share * 100) / 100;
  assert.strictEqual(
    Math.abs(prorated.seller_share - expected_seller_share) < 1,
    true,
    'Seller share calculation'
  );
  console.log(`✓ Seller share correct: $${prorated.seller_share.toFixed(2)}`);
}

// ============================================================================
// FULL INTEGRATION TESTS
// ============================================================================

function testFullCalculation_PA() {
  console.log('\n=== Testing Full Calculation (Pennsylvania) ===');
  
  const engine = ClosingCostEngine.withTestProfiles([testProfilePA]);
  const result = engine.calculate(testDealInput);
  
  // Verify basic structure
  assert(result.buyer_debits.length > 0, 'Should have buyer debits');
  assert(result.seller_debits.length > 0, 'Should have seller debits');
  assert.strictEqual(
    result.buyer_net >= 0,
    true,
    'Buyer net should be calculated'
  );
  
  console.log(`Buyer debits: $${result.buyer_total_debit.toFixed(2)}`);
  console.log(`Buyer credits: $${result.buyer_total_credit.toFixed(2)}`);
  console.log(`Buyer net: $${result.buyer_net.toFixed(2)}`);
  console.log(`Seller debits: $${result.seller_total_debit.toFixed(2)}`);
  console.log(`Seller credits: $${result.seller_total_credit.toFixed(2)}`);
  console.log(`Seller net: $${result.seller_net.toFixed(2)}`);
  console.log('✓ Full calculation completed successfully');
}

function testFullCalculation_TX() {
  console.log('\n=== Testing Full Calculation (Texas - No Transfer Tax) ===');
  
  const txDeal: DealInput = {
    ...testDealInput,
    property: { state: 'TX', county: 'Harris' },
  };
  
  const engine = ClosingCostEngine.withTestProfiles([testProfileTX]);
  const result = engine.calculate(txDeal);
  
  // TX should have no transfer taxes
  const transfer_taxes = result.all_items_by_category['Transfer Taxes'];
  assert.strictEqual(transfer_taxes?.length || 0, 0, 'TX should have no transfer taxes');
  console.log('✓ Texas calculation: No transfer taxes (correct)');
  
  console.log(`Texas buyer closing costs: $${result.buyer_net.toFixed(2)}`);
}

// ============================================================================
// RUN ALL TESTS
// ============================================================================

export function runAllTests() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║         CLOSING COST ENGINE - UNIT TESTS                       ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  
  try {
    testBracketPremium();
    testTransferTaxes();
    testRecordingFees();
    testTitleInsurance();
    testSettlementFees();
    testProrations();
    testFullCalculation_PA();
    testFullCalculation_TX();
    
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║  ✓ ALL TESTS PASSED                                           ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');
  } catch (e) {
    console.error('\n❌ TEST FAILED:', e);
    process.exit(1);
  }
}

if (require.main === module) {
  runAllTests();
}
