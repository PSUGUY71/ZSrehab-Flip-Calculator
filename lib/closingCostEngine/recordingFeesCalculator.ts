/**
 * Recording Fees Calculator
 * Calculates government recording fees for deed, mortgage, and ancillary documents
 */

import { DealInput, RecordingProfile, RecordingFeesResult } from "./types";

/**
 * Calculate all recording fees
 */
export function calculateRecordingFees(
  input: DealInput,
  profile: RecordingProfile
): RecordingFeesResult {
  const breakdown: Record<string, number> = {};

  // Deed recording fees
  const deedFee =
    input.docs.deed_docs_count * profile.deed.per_document_fee +
    input.docs.deed_pages * profile.deed.per_page_fee;

  breakdown["deed"] = deedFee;

  // Mortgage recording fees
  const mortgageFee =
    input.docs.mortgage_docs_count * profile.mortgage.per_document_fee +
    input.docs.mortgage_pages * profile.mortgage.per_page_fee;

  breakdown["mortgage"] = mortgageFee;

  // Ancillary document fees
  let ancillaryFees = 0;

  if (input.docs.ancillary && input.docs.ancillary.length > 0) {
    for (const ancDoc of input.docs.ancillary) {
      const ancProfile = profile.ancillary?.[ancDoc.doc_type];

      if (ancProfile) {
        const fee =
          ancDoc.count * ancProfile.per_document_fee +
          ancDoc.pages * ancProfile.per_page_fee;

        breakdown[`ancillary_${ancDoc.doc_type}`] = fee;
        ancillaryFees += fee;
      }
    }
  }

  const total = deedFee + mortgageFee + ancillaryFees;

  return {
    deed_fee: deedFee,
    mortgage_fee: mortgageFee,
    ancillary_fees: ancillaryFees,
    total,
    breakdown,
  };
}

/**
 * Calculate recording fees for a specific document type
 */
export function calculateDocumentRecordingFee(
  docsCount: number,
  pages: number,
  perDocFee: number,
  perPageFee: number
): number {
  return docsCount * perDocFee + pages * perPageFee;
}

/**
 * Format recording fees for display
 */
export function formatRecordingFeeBreakdown(result: RecordingFeesResult): string[] {
  const lines: string[] = [];

  lines.push(`Deed: ${result.breakdown["deed"]?.toFixed(2) || "0.00"}`);
  lines.push(
    `Mortgage: ${result.breakdown["mortgage"]?.toFixed(2) || "0.00"}`
  );

  if (result.ancillary_fees > 0) {
    for (const [key, value] of Object.entries(result.breakdown)) {
      if (key.startsWith("ancillary_")) {
        const docType = key.replace("ancillary_", "");
        lines.push(`${docType}: ${value.toFixed(2)}`);
      }
    }
  }

  lines.push(`Total: ${result.total.toFixed(2)}`);

  return lines;
}

/**
 * Allocate all recording fees to buyer (standard practice)
 */
export function allocateRecordingFees(
  recordingFees: number
): { buyer_debit: number; seller_debit: number } {
  return {
    buyer_debit: recordingFees,
    seller_debit: 0,
  };
}
