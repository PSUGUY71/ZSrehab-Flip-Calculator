/**
 * Main Closing Cost Engine
 */

import { DealInput, ClosingCostOutput, LineItem, JurisdictionProfile, EngineOptions } from './types';
import { ConfigLoader, FileSystemConfigLoader, InMemoryConfigLoader } from './configLoader';
import { validateDealInput, ValidationError } from './validation';
import { calculateTransferTax, calculateRecordingFees, calculateTitleInsurance, calculateSettlementFees } from './calculations';
import { createProratedLineItems } from './proration';

export class ClosingCostEngine {
  private config_loader: ConfigLoader;
  private debug: boolean;

  constructor(options: EngineOptions) {
    this.debug = options.debug || false;
    
    if (options.config_dir.startsWith('MEMORY:')) {
      // Special case for testing
      this.config_loader = new InMemoryConfigLoader([]);
    } else {
      this.config_loader = new FileSystemConfigLoader(options.config_dir, this.debug);
    }
  }

  /**
   * Main entry point: Calculate closing costs
   */
  calculate(input: DealInput): ClosingCostOutput {
    // Validate input
    const validation_errors = validateDealInput(input);
    if (validation_errors.length > 0) {
      throw new ValidationError(validation_errors);
    }

    // Load jurisdiction profile
    const profile = this.config_loader.load_profile(
      input.property.state,
      input.property.county,
      input.property.city,
      input.property.zip
    );

    if (this.debug) {
      console.log(`Using jurisdiction profile: ${profile.jurisdiction_id}`);
    }

    // Process all line items
    const all_items: LineItem[] = [];

    // 1. Transfer taxes
    if (profile.transfer_taxes) {
      for (let i = 0; i < profile.transfer_taxes.length; i++) {
        const item = calculateTransferTax(profile.transfer_taxes[i], input, i);
        all_items.push(item);
      }
    }

    // 2. Recording fees
    if (profile.recording) {
      const recording_items = calculateRecordingFees(profile.recording, input);
      all_items.push(...recording_items);
    }

    // 3. Title insurance
    if (profile.title) {
      const title_items = calculateTitleInsurance(profile.title, input);
      all_items.push(...title_items);
    }

    // 4. Settlement & flat fees
    const settlement_items = calculateSettlementFees(profile.settlement, input.flat_fees);
    all_items.push(...settlement_items);

    // 5. Prorations (taxes)
    if (profile.proration && input.tax_lines) {
      const proration_items = createProratedLineItems(input.tax_lines, input.closing_date, profile.proration);
      all_items.push(...proration_items);
    }

    // 6. HOA prorations
    if (profile.proration && input.hoa_lines) {
      const hoa_items = createProratedLineItems(input.hoa_lines, input.closing_date, profile.proration);
      all_items.push(...hoa_items);
    }

    // Aggregate by side
    const buyer_debits = all_items.filter(item => item.buyer_debit > 0);
    const buyer_credits = all_items.filter(item => item.buyer_credit > 0);
    const seller_debits = all_items.filter(item => item.seller_debit > 0);
    const seller_credits = all_items.filter(item => item.seller_credit > 0);

    const buyer_total_debit = buyer_debits.reduce((sum, item) => sum + item.buyer_debit, 0);
    const buyer_total_credit = buyer_credits.reduce((sum, item) => sum + item.buyer_credit, 0);
    const seller_total_debit = seller_debits.reduce((sum, item) => sum + item.seller_debit, 0);
    const seller_total_credit = seller_credits.reduce((sum, item) => sum + item.seller_credit, 0);

    // Group by category
    const all_items_by_category: Record<string, LineItem[]> = {};
    for (const item of all_items) {
      if (!all_items_by_category[item.category]) {
        all_items_by_category[item.category] = [];
      }
      all_items_by_category[item.category].push(item);
    }

    return {
      buyer_debits,
      buyer_credits,
      buyer_total_debit,
      buyer_total_credit,
      buyer_net: buyer_total_debit - buyer_total_credit,

      seller_debits,
      seller_credits,
      seller_total_debit,
      seller_total_credit,
      seller_net: seller_total_debit - seller_total_credit,

      all_items_by_category,

      diagnostics: {
        jurisdiction_selected: profile.jurisdiction_id,
        config_path: profile.jurisdiction_id,
        profile_matched_by: 'state', // TODO: track this
        debug_info: this.debug ? { profile_keys: Object.keys(profile) } : undefined,
      },
    };
  }

  /**
   * Create engine with in-memory config for testing
   */
  static withTestProfiles(profiles: JurisdictionProfile[]): ClosingCostEngine {
    const engine = new ClosingCostEngine({ config_dir: 'MEMORY:' });
    // Inject loader
    (engine as any).config_loader = new InMemoryConfigLoader(profiles);
    return engine;
  }
}

export default ClosingCostEngine;
