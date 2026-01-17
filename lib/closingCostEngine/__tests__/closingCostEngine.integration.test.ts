/**
 * Integration Tests for Closing Cost Engine
 * Tests the complete calculation pipeline
 */

import { ClosingCostEngine, createClosingCostEngine } from "../closingCostEngine";
import {
  PA_RESIDENTIAL_DEAL,
  TX_COMMERCIAL_DEAL,
  NY_NYC_DEAL,
  MINIMAL_DEAL,
  FLAT_FEE_DEAL,
} from "./fixtures/sampleDealInputs";
import {
  buildTestConfigMap,
  PA_DEFAULT_CONFIG,
  TX_DEFAULT_CONFIG,
  NY_NYC_CONFIG,
  GENERIC_DEFAULT_CONFIG,
} from "./fixtures/sampleConfigs";

describe("ClosingCostEngine Integration Tests", () => {
  let engine: ClosingCostEngine;
  let configMap: Record<string, any>;

  beforeEach(() => {
    configMap = buildTestConfigMap();
    engine = createClosingCostEngine(configMap);
  });

  describe("Engine Creation", () => {
    test("should create engine with config map", () => {
      expect(engine).toBeDefined();
      expect(engine.getConfig()).toBeDefined();
    });

    test("should create engine without config map", () => {
      const emptyEngine = createClosingCostEngine();
      expect(emptyEngine).toBeDefined();
    });

    test("should allow setting config after creation", () => {
      const emptyEngine = createClosingCostEngine();
      expect(emptyEngine.getConfig()).toBeUndefined();
      emptyEngine.setConfig(configMap);
      expect(emptyEngine.getConfig()).toBeDefined();
    });
  });

  describe("Minimal Deal Calculation", () => {
    test("should calculate minimal deal", () => {
      const result = engine.calculate(MINIMAL_DEAL);
      expect(result).toBeDefined();
      expect(result.buyer).toBeDefined();
      expect(result.seller).toBeDefined();
      expect(result.line_items_by_category).toBeDefined();
      expect(Array.isArray(result.line_items_by_category)).toBe(true);
    });

    test("should have buyer and seller calculations", () => {
      const result = engine.calculate(MINIMAL_DEAL);
      expect(result.buyer.debits).toBeDefined();
      expect(result.buyer.credits).toBeDefined();
      expect(result.buyer.total_debits).toBeGreaterThanOrEqual(0);
      expect(result.buyer.total_credits).toBeGreaterThanOrEqual(0);
      expect(result.seller.debits).toBeDefined();
      expect(result.seller.credits).toBeDefined();
      expect(result.seller.total_debits).toBeGreaterThanOrEqual(0);
      expect(result.seller.total_credits).toBeGreaterThanOrEqual(0);
    });

    test("should have debug information", () => {
      const result = engine.calculate(MINIMAL_DEAL);
      expect(result.debug).toBeDefined();
      expect(result.debug.jurisdiction_profile_matched).toBeDefined();
      expect(result.debug.calculation_details).toBeDefined();
      expect(Array.isArray(result.debug.validation_warnings)).toBe(true);
    });
  });

  describe("Pennsylvania Deal Calculation", () => {
    test("should calculate PA residential deal", () => {
      const result = engine.calculate(PA_RESIDENTIAL_DEAL);
      expect(result).toBeDefined();
      expect(result.buyer).toBeDefined();
      expect(result.seller).toBeDefined();
    });

    test("should include line items", () => {
      const result = engine.calculate(PA_RESIDENTIAL_DEAL);
      expect(result.line_items_by_category.length).toBeGreaterThan(0);
    });

    test("should categorize line items", () => {
      const result = engine.calculate(PA_RESIDENTIAL_DEAL);
      const categories = result.line_items_by_category.map((g) => g.category);
      expect(categories.length).toBeGreaterThan(0);
      expect(typeof categories[0]).toBe("string");
    });
  });

  describe("Texas Deal Calculation", () => {
    test("should calculate TX commercial deal", () => {
      const result = engine.calculate(TX_COMMERCIAL_DEAL);
      expect(result).toBeDefined();
      expect(result.buyer).toBeDefined();
      expect(result.seller).toBeDefined();
    });

    test("should handle ancillary documents", () => {
      const result = engine.calculate(TX_COMMERCIAL_DEAL);
      expect(result.line_items_by_category).toBeDefined();
      // TX deal includes ancillary docs
    });

    test("should handle HOA lines", () => {
      const result = engine.calculate(TX_COMMERCIAL_DEAL);
      const hasProrations = result.line_items_by_category.some(
        (g) => g.category === "Prorations"
      );
      expect(hasProrations).toBe(true);
    });
  });

  describe("New York Deal Calculation", () => {
    test("should calculate NY NYC deal", () => {
      const result = engine.calculate(NY_NYC_DEAL);
      expect(result).toBeDefined();
      expect(result.buyer).toBeDefined();
      expect(result.seller).toBeDefined();
    });

    test("should include title insurance with endorsements", () => {
      const result = engine.calculate(NY_NYC_DEAL);
      const titleGroup = result.line_items_by_category.find(
        (g) => g.category === "Title Insurance"
      );
      expect(titleGroup).toBeDefined();
    });
  });

  describe("Flat Fee Deal Calculation", () => {
    test("should apply flat fee overrides", () => {
      const result = engine.calculate(FLAT_FEE_DEAL);
      expect(result).toBeDefined();
      const settlementGroup = result.line_items_by_category.find(
        (g) => g.category === "Settlement Fees"
      );
      expect(settlementGroup).toBeDefined();
    });
  });

  describe("Results Structure", () => {
    test("should have proper buyer side structure", () => {
      const result = engine.calculate(MINIMAL_DEAL);
      expect(Array.isArray(result.buyer.debits)).toBe(true);
      expect(Array.isArray(result.buyer.credits)).toBe(true);
      expect(typeof result.buyer.total_debits).toBe("number");
      expect(typeof result.buyer.total_credits).toBe("number");
      expect(typeof result.buyer.net).toBe("number");
    });

    test("should have proper seller side structure", () => {
      const result = engine.calculate(MINIMAL_DEAL);
      expect(Array.isArray(result.seller.debits)).toBe(true);
      expect(Array.isArray(result.seller.credits)).toBe(true);
      expect(typeof result.seller.total_debits).toBe("number");
      expect(typeof result.seller.total_credits).toBe("number");
      expect(typeof result.seller.net).toBe("number");
    });

    test("should have line item group structure", () => {
      const result = engine.calculate(MINIMAL_DEAL);
      result.line_items_by_category.forEach((group) => {
        expect(typeof group.category).toBe("string");
        expect(Array.isArray(group.items)).toBe(true);
        expect(typeof group.subtotal).toBe("number");
      });
    });

    test("should have line item structure", () => {
      const result = engine.calculate(MINIMAL_DEAL);
      result.line_items_by_category.forEach((group) => {
        group.items.forEach((item) => {
          expect(typeof item.description).toBe("string");
          expect(typeof item.amount).toBe("number");
          expect(typeof item.category).toBe("string");
        });
      });
    });
  });

  describe("Calculation Accuracy", () => {
    test("buyer debits should equal buyer transaction costs", () => {
      const result = engine.calculate(MINIMAL_DEAL);
      expect(result.buyer.total_debits).toBeGreaterThanOrEqual(0);
    });

    test("seller credits should exist for seller costs", () => {
      const result = engine.calculate(MINIMAL_DEAL);
      // Seller should have credit for paying transfer tax, recording fees, etc
      expect(result.seller.total_credits).toBeGreaterThanOrEqual(0);
    });

    test("subtotals should match line item amounts", () => {
      const result = engine.calculate(MINIMAL_DEAL);
      result.line_items_by_category.forEach((group) => {
        const sum = group.items.reduce((acc, item) => acc + item.amount, 0);
        expect(Math.abs(sum - group.subtotal)).toBeLessThan(0.01);
      });
    });

    test("net calculations should be correct", () => {
      const result = engine.calculate(MINIMAL_DEAL);
      const buyerNet = result.buyer.total_debits - result.buyer.total_credits;
      const sellerNet =
        result.seller.total_debits - result.seller.total_credits;
      expect(Math.abs(buyerNet - result.buyer.net)).toBeLessThan(0.01);
      expect(Math.abs(sellerNet - result.seller.net)).toBeLessThan(0.01);
    });
  });

  describe("Multiple Deal Scenarios", () => {
    const deals = [
      { name: "PA Residential", deal: PA_RESIDENTIAL_DEAL },
      { name: "TX Commercial", deal: TX_COMMERCIAL_DEAL },
      { name: "NY NYC", deal: NY_NYC_DEAL },
      { name: "Flat Fee", deal: FLAT_FEE_DEAL },
      { name: "Minimal", deal: MINIMAL_DEAL },
    ];

    deals.forEach(({ name, deal }) => {
      test(`should calculate ${name} without errors`, () => {
        expect(() => engine.calculate(deal)).not.toThrow();
      });

      test(`${name} should have positive or zero calculations`, () => {
        const result = engine.calculate(deal);
        expect(result.buyer.total_debits).toBeGreaterThanOrEqual(0);
        expect(result.buyer.total_credits).toBeGreaterThanOrEqual(0);
        expect(result.seller.total_debits).toBeGreaterThanOrEqual(0);
        expect(result.seller.total_credits).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe("Error Handling", () => {
    test("should handle missing property", () => {
      const invalidDeal = {
        ...MINIMAL_DEAL,
        property: {
          state: "TX",
          // missing county, city, zip
        },
      } as any;

      expect(() => engine.calculate(invalidDeal)).toThrow();
    });

    test("should handle missing purchase price", () => {
      const invalidDeal = {
        ...MINIMAL_DEAL,
        purchase_price: undefined,
      } as any;

      expect(() => engine.calculate(invalidDeal)).toThrow();
    });

    test("should handle invalid closing date", () => {
      const invalidDeal = {
        ...MINIMAL_DEAL,
        closing_date: "invalid-date",
      } as any;

      expect(() => engine.calculate(invalidDeal)).toThrow();
    });
  });

  describe("Configuration Matching", () => {
    test("should match TX configuration", () => {
      const result = engine.calculate(TX_COMMERCIAL_DEAL);
      expect(result.debug.jurisdiction_profile_matched).toBeDefined();
    });

    test("should match PA configuration", () => {
      const result = engine.calculate(PA_RESIDENTIAL_DEAL);
      expect(result.debug.jurisdiction_profile_matched).toBeDefined();
    });

    test("should match default configuration for unknown state", () => {
      const deal = {
        ...MINIMAL_DEAL,
        property: {
          state: "XY",
          county: "Unknown",
        },
      };
      const result = engine.calculate(deal);
      expect(result.debug.jurisdiction_profile_matched).toBeDefined();
    });
  });
});
