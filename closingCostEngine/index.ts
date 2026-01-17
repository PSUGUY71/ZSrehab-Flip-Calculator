/**
 * Closing Cost Engine - Public API and exports
 */

export { ClosingCostEngine as default } from './closingCostEngine';
export { ClosingCostEngine } from './closingCostEngine';

// Types
export type {
  DealInput,
  ClosingCostOutput,
  LineItem,
  JurisdictionProfile,
  TransferTaxConfig,
  BracketTable,
  Bracket,
  RecordingProfile,
  FeeSchedule,
  FeeTier,
  TitleProfile,
  RateTable,
  RateTableEntry,
  SettlementProfile,
  FeeConfig,
  ProrationProfile,
  AncillaryDoc,
  TaxLine,
  EngineOptions,
  EngineValidationError,
} from './types';

// Utilities
export { ValidationError, validateDealInput, validateJurisdictionProfile, roundMoney, parseISODate } from './validation';
export { FileSystemConfigLoader, InMemoryConfigLoader } from './configLoader';

// Calculations
export {
  calculateTransferTax,
  calculateBracketPremium,
  calculateRecordingFees,
  calculateTitleInsurance,
  calculateSettlementFees,
} from './calculations';

// Proration
export {
  prorateAmount,
  calculateDaysInPeriod,
  calculateBuyerSellerDays,
  createProratedLineItems,
} from './proration';
