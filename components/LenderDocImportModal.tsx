import React, { useRef, useState } from 'react';
import { LoanInputs } from '../types';
import { AIConfig } from '../utils/aiProvider';
import { extractJSON, DocPart, looksLikeNoVision } from '../utils/aiClient';

/**
 * Upload documents (PDF, image or text), have the AI (whichever service is picked in Settings → AI Assistant)
 * read them, review the values side by side, and apply the ones you check. Two kinds:
 * - 'lender': term sheet / loan estimate / commitment letter → loan terms
 * - 'title':  title company quote / closing cost estimate / Closing Disclosure / settlement statement →
 *             the buyer's closing costs (title premium, settlement, recording, transfer tax, prorations…)
 */

export type DocImportKind = 'lender' | 'title';

interface Props {
  kind: DocImportKind;
  ai: AIConfig;
  inputs: LoanInputs;
  onApply: (data: Partial<LoanInputs>) => void;
  onClose: () => void;
  onOpenSettings: () => void;
}

type Kind = 'money' | 'percent' | 'number' | 'bool' | 'text' | 'date' | 'loanType';
type Field = { key: string; label: string; kind: Kind; desc: string };
// Field → label + how to show it. `financingPercent` maps onto financingPercentage / custom financing.
const LENDER_FIELDS: Field[] = [
  { key: 'lenderName', label: 'Lender Name', kind: 'text', desc: 'Lender / company name' },
  { key: 'loanType', label: 'Loan Type', kind: 'loanType', desc: 'HARD_MONEY (fix & flip / bridge / private), CONVENTIONAL, PORTFOLIO, or OTHER' },
  { key: 'interestRate', label: 'Interest Rate', kind: 'percent', desc: 'Annual note rate in percent (12 for 12%)' },
  { key: 'originationPoints', label: 'Origination Points', kind: 'percent', desc: 'Origination / lender points in percent of loan (2 for 2 points)' },
  { key: 'loanTermMonths', label: 'Loan Term (months)', kind: 'number', desc: 'Loan term in months (convert years to months)' },
  { key: 'interestOnly', label: 'Interest Only', kind: 'bool', desc: 'true if payments are interest-only' },
  { key: 'financingPercent', label: 'Financing % (LTC)', kind: 'percent', desc: 'Percent of purchase price / cost the lender funds (LTC), e.g. 90' },
  { key: 'underwritingFee', label: 'Underwriting Fee', kind: 'money', desc: 'Underwriting fee in dollars' },
  { key: 'processingFee', label: 'Processing Fee', kind: 'money', desc: 'Processing fee in dollars' },
  { key: 'docPrepFee', label: 'Doc Prep Fee', kind: 'money', desc: 'Document preparation fee in dollars' },
  { key: 'wireFee', label: 'Wire Fee', kind: 'money', desc: 'Wire / funding fee in dollars' },
  { key: 'otherLenderFees', label: 'Other Lender Fees', kind: 'money', desc: 'Sum of all OTHER lender-charged fees due at closing (admin, legal/doc review, flood cert, credit report, servicing setup, etc.) in dollars; list what you summed in notes' },
  { key: 'prepaymentPenalty', label: 'Prepayment Penalty', kind: 'bool', desc: 'true if a prepayment penalty / minimum interest applies' },
  { key: 'prepaymentPenaltyAmount', label: 'Prepay Penalty Amount', kind: 'number', desc: 'Prepayment penalty amount (dollars or percent as written)' },
  { key: 'purchasePrice', label: 'Purchase Price', kind: 'money', desc: 'Property purchase price in dollars' },
  { key: 'rehabBudget', label: 'Rehab Budget', kind: 'money', desc: 'Rehab / construction budget or holdback in dollars' },
  { key: 'arv', label: 'ARV', kind: 'money', desc: 'After-repair value in dollars' },
  { key: 'appraised_value', label: 'Appraised Value', kind: 'money', desc: 'As-is appraised value in dollars' },
  { key: 'appraisalCost', label: 'Appraisal Fee', kind: 'money', desc: 'Appraisal fee in dollars' },
  { key: 'closingDate', label: 'Closing Date', kind: 'date', desc: 'Expected closing date as YYYY-MM-DD' },
];

// Buyer-side closing costs from a title company. `transferTaxBuyer` ($) maps onto transferTaxRate (%);
// `titleInsuranceAmount` includes endorsements, so applying it zeroes numberOfEndorsements.
const TITLE_FIELDS: Field[] = [
  { key: 'titleInsuranceAmount', label: 'Title Insurance (incl. endorsements)', kind: 'money', desc: "Total title insurance premium charged to the BUYER: owner's policy + lender's policy (incl. simultaneous issue) + all endorsements, in dollars. Do NOT include the CPL." },
  { key: 'cplFee', label: 'CPL (Closing Protection Letter)', kind: 'money', desc: 'Closing protection letter fee(s) in dollars' },
  { key: 'legalSettlementFees', label: 'Settlement / Closing Fees', kind: 'money', desc: 'Settlement or closing fee, attorney fee, notary, document preparation, courier/overnight, wire and e-recording service fees charged by the title/settlement company, summed, in dollars' },
  { key: 'titleCompanyCharges', label: 'Title Search & Other Title Co. Charges', kind: 'money', desc: 'Title search/examination, abstract, tax and municipal certifications and any other title-company charges not counted elsewhere, summed, in dollars' },
  { key: 'recordingFees', label: 'Recording Fees', kind: 'money', desc: 'Government recording fees for the deed and mortgage, in dollars (NOT transfer tax)' },
  { key: 'transferTaxBuyer', label: "Transfer Tax (buyer's share)", kind: 'money', desc: "Buyer's share of realty transfer tax (state + local) in dollars" },
  { key: 'surveyFee', label: 'Survey', kind: 'money', desc: 'Survey fee in dollars' },
  { key: 'mechanicsLienInsurance', label: 'Mechanics Lien Insurance', kind: 'money', desc: 'Mechanics lien coverage in dollars' },
  { key: 'domesticLienSearch', label: 'Domestic Lien Search', kind: 'money', desc: 'Domestic lien search fee in dollars' },
  { key: 'patriotActSearch', label: 'Patriot Act Search', kind: 'money', desc: 'Patriot Act / OFAC search fee in dollars' },
  { key: 'schoolTaxAtClosing', label: 'School Tax Proration', kind: 'money', desc: 'School tax proration the buyer pays/reimburses at closing, in dollars' },
  { key: 'countyTaxProration', label: 'County Tax Proration', kind: 'money', desc: 'County tax proration the buyer pays/reimburses at closing, in dollars' },
  { key: 'municipalTaxProration', label: 'Municipal Tax Proration', kind: 'money', desc: 'Municipal/township/city tax proration the buyer pays/reimburses at closing, in dollars' },
  { key: 'lienableUtilities', label: 'Utilities (water/sewer/trash)', kind: 'money', desc: 'Lienable utility prorations or escrows (water, sewer, trash) charged to the buyer, in dollars' },
  { key: 'hoaProration', label: 'HOA Proration', kind: 'money', desc: 'HOA / condo dues proration charged to the buyer, in dollars' },
  { key: 'hoaCapitalContribution', label: 'HOA Capital Contribution', kind: 'money', desc: 'HOA capital contribution / transfer fee charged to the buyer, in dollars' },
  { key: 'prepaidInterestAtClosing', label: 'Prepaid Interest', kind: 'money', desc: 'Prepaid / per-diem interest collected at closing, in dollars' },
  { key: 'lenderEscrowTaxes', label: 'Tax Escrow Deposit', kind: 'money', desc: 'Initial escrow deposit for property taxes collected for the lender, in dollars' },
  { key: 'lenderEscrowInsurance', label: 'Insurance Escrow Deposit', kind: 'money', desc: 'Initial escrow deposit for homeowners insurance collected for the lender, in dollars' },
  { key: 'otherThirdPartyFees', label: 'Other Buyer Closing Costs', kind: 'money', desc: 'Any OTHER buyer closing charge not covered above, summed, in dollars. Exclude lender fees (points, underwriting, processing), the purchase price, deposits and credits. List what you summed in notes.' },
  { key: 'purchasePrice', label: 'Purchase Price', kind: 'money', desc: 'Contract sales price in dollars' },
  { key: 'closingDate', label: 'Closing Date', kind: 'date', desc: 'Settlement / closing date as YYYY-MM-DD' },
];

const typeFor = (k: Kind) => ({
  money: ['number', 'null'], percent: ['number', 'null'], number: ['number', 'null'],
  bool: ['boolean', 'null'], text: ['string', 'null'], date: ['string', 'null'],
  loanType: ['string', 'null'],
}[k]);

const schemaFor = (fields: Field[], notes: string) => ({
  type: 'object',
  additionalProperties: false,
  required: [...fields.map((f) => f.key), 'notes'],
  properties: {
    ...Object.fromEntries(fields.map((f) => [f.key, {
      type: typeFor(f.kind), description: f.desc,
      ...(f.kind === 'loanType' ? { enum: ['HARD_MONEY', 'CONVENTIONAL', 'PORTFOLIO', 'OTHER', null] } : {}),
    }])),
    notes: { type: 'string', description: notes },
  },
});

const RULES = `Rules:
- Only use values explicitly stated in the documents. If a value is not stated, return null. Never guess.
- Percentages as plain numbers (12% -> 12, 2 points -> 2). Dollar amounts as plain numbers (no $ or commas).`;

const CONFIG = {
  lender: {
    title: 'Import Lender Docs',
    noun: 'loan terms',
    subtitle: 'Upload the term sheet / loan estimate — the AI reads the terms, you review before anything changes.',
    pick: '📄 Choose lender documents',
    hint: 'PDF, photos/screenshots (PNG, JPG) or text · several files OK (term sheet + fee sheet)',
    instruction: 'Extract the loan terms from these lender documents.',
    fields: LENDER_FIELDS,
    prompt: `You read real-estate lender documents (term sheets, loan estimates, commitment letters, fee sheets).
Extract the loan terms into the JSON schema. ${RULES}
- If several options/scenarios are quoted, use the one the borrower appears to be getting and mention the others in notes.`,
    schema: schemaFor(LENDER_FIELDS, 'Other important terms that have no field above: draw/inspection fees, extension fees, reserves, exit fees, guaranty, conditions; and what was summed into otherLenderFees. Empty string if none.'),
    notesLabel: 'Lender doc terms',
  },
  title: {
    title: 'Import Title Quote',
    noun: 'closing costs',
    subtitle: "Upload the title company's quote, closing cost estimate, Closing Disclosure or settlement statement — the AI fills in your closing costs.",
    pick: '📄 Choose title quote / settlement statement',
    hint: 'PDF, photos/screenshots or text · title quote, fee sheet, Closing Disclosure, HUD-1/ALTA settlement statement',
    instruction: "Extract the buyer's closing costs from these title / settlement documents.",
    fields: TITLE_FIELDS,
    prompt: `You read real-estate title company documents (title quotes, closing cost estimates, Closing Disclosures,
HUD-1 / ALTA settlement statements). Extract the BUYER's charges only (ignore the seller's column) into the JSON schema.
Put each charge in exactly one field — never count the same charge twice. ${RULES}
- Lender charges (origination, points, underwriting, processing) are NOT title costs — leave them out.`,
    schema: schemaFor(TITLE_FIELDS, "Anything worth knowing that has no field above (e.g. seller-paid items, credits, what was summed into the 'other' fields, quote expiry). Empty string if none."),
    notesLabel: 'Title quote',
  },
} as const;

const readAs = (file: File, how: 'dataUrl' | 'text') => new Promise<string>((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(r.result as string);
  r.onerror = () => rej(new Error(`Could not read ${file.name}`));
  how === 'dataUrl' ? r.readAsDataURL(file) : r.readAsText(file);
});

// ponytail: providers whose chat endpoint takes images, not PDFs (Grok, Gemini, OpenRouter, OmniRoute) get
// the first pages rendered as images; raise if term sheets with more pages show up
const MAX_PDF_PAGES = 10;

/** Render PDF pages to JPEG data URLs in the browser (pdf.js, loaded only when needed). */
const pdfToImages = async (file: File, onPage?: (done: number, total: number) => void) => {
  const pdfjs = await import('pdfjs-dist');
  pdfjs.GlobalWorkerOptions.workerSrc = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const urls: string[] = [];
  const total = Math.min(pdf.numPages, MAX_PDF_PAGES);
  for (let i = 1; i <= total; i++) {
    onPage?.(i - 1, total);
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 }); // ~150 dpi: small print stays readable
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise;
    urls.push(canvas.toDataURL('image/jpeg', 0.85));
  }
  return { urls, skipped: Math.max(0, pdf.numPages - MAX_PDF_PAGES) };
};

/** Most vision endpoints accept JPG/PNG only — re-encode anything else (WebP, GIF, BMP…) as PNG. */
const toPngDataUrl = async (file: File) => {
  const bmp = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bmp.width;
  canvas.height = bmp.height;
  canvas.getContext('2d')!.drawImage(bmp, 0, 0);
  return canvas.toDataURL('image/png');
};

/** One file → the message content parts for the chosen provider (+ a warning if pages were skipped). */
const toContentParts = async (
  file: File, ai: AIConfig, onPage?: (done: number, total: number) => void,
): Promise<{ parts: DocPart[]; warning?: string }> => {
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (isPdf && ai.pdfMode === 'images') {
    const { urls, skipped } = await pdfToImages(file, onPage);
    return {
      parts: [{ type: 'text', text: `--- ${file.name} (${urls.length} page images) ---` }, ...urls.map((dataUrl) => ({ type: 'image' as const, dataUrl }))],
      warning: skipped ? `${file.name}: only the first ${MAX_PDF_PAGES} pages were read (${skipped} skipped).` : undefined,
    };
  }
  if (isPdf) {
    return { parts: [{ type: 'pdf', name: file.name, dataUrl: await readAs(file, 'dataUrl') }] };
  }
  if (file.type.startsWith('image/')) {
    const jpgOrPng = /^image\/(jpe?g|png)$/.test(file.type);
    return { parts: [{ type: 'image', dataUrl: ai.pdfMode !== 'file' && !jpgOrPng ? await toPngDataUrl(file) : await readAs(file, 'dataUrl') }] };
  }
  if (file.type.startsWith('text/') || /\.(txt|csv|md)$/i.test(file.name)) {
    return { parts: [{ type: 'text', text: `--- ${file.name} ---\n${await readAs(file, 'text')}` }] };
  }
  throw new Error(`${file.name}: unsupported file type. Use PDF, an image (PNG/JPG/screenshot), or text. For Word files, save as PDF first.`);
};

// Progress bar bands: preparing files 0–30%, waiting for the AI 30–75%, AI writing its answer 75–98%.
const READ_TIMEOUT_S = 180;  // give up (with a clear message) instead of looking stuck forever
const SLOW_AFTER_S = 45;     // show a "still working" hint after this long
const EXPECTED_ANSWER_CHARS = 1100; // typical size of the loan-terms JSON, for the answer-progress estimate

type Progress = { pct: number; stage: string };

const sizeOfParts = (parts: DocPart[]) =>
  parts.reduce((s, p) => s + (p.type === 'text' ? p.text.length : p.dataUrl.length), 0) / 1_048_576;

const NO_VISION_HINT ='Your AI model may not be able to read images or PDFs. Pick a vision-capable model in Settings → AI Assistant, or paste the text below instead.';

const fmt = (kind: Kind, v: any) => {
  if (v === null || v === undefined || v === '') return '—';
  if (kind === 'money') return Number(v).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  if (kind === 'percent') return `${v}%`;
  if (kind === 'bool') return v ? 'Yes' : 'No';
  if (kind === 'loanType') return String(v).replace('_', ' ');
  return String(v);
};

const currentValue = (inputs: LoanInputs, key: string) =>
  key === 'financingPercent'
    ? (inputs.useCustomFinancing ? inputs.customFinancingPercentage : inputs.financingPercentage)
    : key === 'transferTaxBuyer'
      ? Math.round((inputs.purchasePrice || 0) * (inputs.transferTaxRate || 0)) / 100
      : (inputs as any)[key];

export const LenderDocImportModal: React.FC<Props> = ({ kind, ai, inputs, onApply, onClose, onOpenSettings }) => {
  const cfg = CONFIG[kind];
  const FIELDS = cfg.fields;
  const apiKey = ai.apiKey;
  const [files, setFiles] = useState<File[]>([]);
  const [pasted, setPasted] = useState(''); // terms pasted as text — works with text-only models
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [extracted, setExtracted] = useState<Record<string, any> | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const totalMB = files.reduce((s, f) => s + f.size, 0) / 1_048_576;

  const [progress, setProgress] = useState<Progress>({ pct: 0, stage: '' });
  const [elapsed, setElapsed] = useState(0);
  const abortRef = useRef<AbortController | null>(null);
  const timedOutRef = useRef(false);

  const handleCancel = () => abortRef.current?.abort();

  const handleRead = async () => {
    setLoading(true); setError(null); setExtracted(null); setWarnings([]); setElapsed(0);
    setProgress({ pct: 0, stage: 'Preparing documents…' });
    const controller = new AbortController();
    abortRef.current = controller;
    timedOutRef.current = false;
    const started = Date.now();
    let sentAt = 0;   // when the request went out (0 = not yet)
    let answerChars = 0;
    const tick = setInterval(() => {
      const secs = (Date.now() - started) / 1000;
      setElapsed(Math.floor(secs));
      if (secs > READ_TIMEOUT_S) { timedOutRef.current = true; controller.abort(); }
      if (!sentAt) return;
      if (answerChars) {
        setProgress({ pct: 75 + 23 * Math.min(1, answerChars / EXPECTED_ANSWER_CHARS), stage: `${ai.label} is writing out the ${cfg.noun}…` });
      } else {
        // No answer yet: the AI is reading/thinking. Creep toward 75% so the bar keeps moving.
        const wait = (Date.now() - sentAt) / 1000;
        setProgress({ pct: 30 + 45 * (1 - Math.exp(-wait / 30)), stage: `${ai.label} is reading the documents…` });
      }
    }, 500);

    try {
      // Prepare files one at a time so the bar can show page-by-page progress
      const converted: { parts: DocPart[]; warning?: string }[] = [];
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const base = (i / files.length) * 30, span = 30 / files.length;
        setProgress({ pct: base, stage: `Preparing ${f.name}…` });
        converted.push(await toContentParts(f, ai, (done, total) =>
          setProgress({ pct: base + span * (done / total), stage: `Preparing ${f.name} — page ${done + 1} of ${total}…` })));
        if (controller.signal.aborted) throw new DOMException('Cancelled', 'AbortError');
      }
      setWarnings(converted.map((c) => c.warning).filter(Boolean) as string[]);
      const parts = converted.flatMap((c) => c.parts);
      if (pasted.trim()) parts.push({ type: 'text', text: `--- Pasted ${cfg.noun} ---\n${pasted.trim()}` });

      const mb = sizeOfParts(parts);
      setProgress({ pct: 30, stage: `Sending ${mb < 0.1 ? 'text' : `${mb.toFixed(1)} MB`} to ${ai.label}…` });
      const data = await extractJSON(ai, cfg.prompt, cfg.instruction, parts, cfg.schema, {
        signal: controller.signal,
        onSent: () => { sentAt = Date.now(); answerChars = 0; },
        onText: (chars) => { answerChars = chars; },
      });
      setProgress({ pct: 100, stage: 'Done' });
      setExtracted(data);
      // Pre-check every field the document actually stated and that differs from what's entered
      setChecked(Object.fromEntries(FIELDS.map((f) => [f.key,
        data[f.key] !== null && data[f.key] !== undefined && data[f.key] !== currentValue(inputs, f.key)])));
    } catch (e: any) {
      if (e?.name === 'AbortError') {
        setError(timedOutRef.current
          ? `${ai.label} didn't finish within ${READ_TIMEOUT_S / 60} minutes, so the read was stopped. Free tiers can be slow or overloaded on big PDFs — try again, upload only the term-sheet pages, paste the terms as text, or pick a faster model in Settings → AI Assistant.`
          : 'Reading cancelled.');
      } else {
        const msg = e?.message || 'Failed to read the documents';
        setError(files.length && looksLikeNoVision(msg) ? `${msg}\n\n${NO_VISION_HINT}` : msg);
      }
    } finally {
      clearInterval(tick);
      abortRef.current = null;
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!extracted) return;
    const data: Partial<LoanInputs> & Record<string, any> = {};
    for (const f of FIELDS) {
      if (!checked[f.key] || extracted[f.key] === null) continue;
      if (f.key === 'financingPercent') {
        const pct = Number(extracted.financingPercent);
        const preset = [100, 95, 90, 85, 80].includes(pct);
        Object.assign(data, preset
          ? { financingPercentage: pct, useCustomFinancing: false }
          : { useCustomFinancing: true, customFinancingPercentage: pct });
      } else if (f.key === 'transferTaxBuyer') {
        // $ on the quote → % of price (the app stores transfer tax as a rate)
        const price = (checked.purchasePrice && extracted.purchasePrice) || inputs.purchasePrice;
        if (price > 0) data.transferTaxRate = Math.round((Number(extracted.transferTaxBuyer) / price) * 100 * 10000) / 10000;
      } else if (f.key === 'titleInsuranceAmount') {
        data.titleInsuranceAmount = extracted.titleInsuranceAmount;
        data.numberOfEndorsements = 0; // the quoted premium already includes endorsements
      } else {
        data[f.key] = extracted[f.key];
      }
    }
    if (extracted.notes) data.notes = [inputs.notes, `${cfg.notesLabel}: ${extracted.notes}`].filter(Boolean).join('\n');
    onApply(data);
    onClose();
  };

  const stated = extracted ? FIELDS.filter((f) => extracted[f.key] !== null && extracted[f.key] !== undefined) : [];
  const selectedCount = stated.filter((f) => checked[f.key]).length;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gray-900 text-white px-4 sm:px-6 py-3 rounded-t-xl flex justify-between items-center">
          <div>
            <h2 className="text-base sm:text-lg font-bold uppercase">{cfg.title}</h2>
            <p className="text-[11px] text-gray-300">{cfg.subtitle}</p>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white text-xl px-2" aria-label="Close">×</button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {!apiKey ? (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              Reading documents uses your {ai.label} API key (same as the AI Assistant).
              <button onClick={onOpenSettings} className="ml-2 underline font-bold">Add it in Settings → AI Assistant</button>
            </div>
          ) : (
            <>
              <label className="block border-2 border-dashed border-gray-300 hover:border-amber-400 rounded-lg p-5 text-center cursor-pointer bg-gray-50">
                <input
                  type="file"
                  multiple
                  accept=".pdf,application/pdf,image/*,.txt,text/plain"
                  className="hidden"
                  onChange={(e) => { setFiles(Array.from(e.target.files || [])); setExtracted(null); setError(null); }}
                />
                <div className="text-sm font-semibold text-gray-700">{cfg.pick}</div>
                <div className="text-[11px] text-gray-500 mt-1">{cfg.hint}</div>
              </label>

              {files.length > 0 && (
                <div className="text-xs text-gray-600 space-y-0.5">
                  {files.map((f) => <div key={f.name}>• {f.name} <span className="text-gray-400">({(f.size / 1024).toFixed(0)} KB)</span></div>)}
                  {totalMB > 30 && <div className="text-red-600">Files are {totalMB.toFixed(1)} MB — the AI accepts up to ~30 MB per request. Remove some pages/files.</div>}
                </div>
              )}

              <textarea
                value={pasted}
                onChange={(e) => { setPasted(e.target.value); setExtracted(null); }}
                rows={3}
                placeholder={`…or paste the ${cfg.noun} as text (copy from the email or document). Works with any AI model, even ones that can't read images or PDFs.`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              <button
                onClick={handleRead}
                disabled={(!files.length && !pasted.trim()) || loading || totalMB > 30}
                className="w-full bg-gray-900 hover:bg-gray-700 disabled:bg-gray-300 text-white font-bold py-2 rounded-lg text-sm"
              >
                {loading ? `Reading documents… ${Math.round(progress.pct)}%` : `Read ${cfg.noun}`}
              </button>

              {loading && (
                <div className="border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50" role="status" aria-live="polite">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-700">{progress.stage}</span>
                    <span className="font-mono text-gray-500 whitespace-nowrap ml-2">{Math.round(progress.pct)}% · {elapsed}s</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${Math.max(2, progress.pct)}%` }} />
                  </div>
                  {elapsed >= SLOW_AFTER_S && (
                    <p className="text-[11px] text-amber-700">
                      Still working — {ai.label} can take a minute or two on multi-page PDFs (free tiers are slower). It will stop
                      automatically after {READ_TIMEOUT_S / 60} minutes. To speed it up, upload just the term-sheet pages or paste the terms as text.
                    </p>
                  )}
                  <button onClick={handleCancel} className="text-xs font-semibold text-red-600 hover:underline">Cancel</button>
                </div>
              )}
              <p className="text-[10px] text-gray-400 -mt-2">
                The files are sent to {ai.label} ({ai.docModel || 'no model selected'}) with your key to be read; nothing is stored by this app.
                {ai.pdfMode === 'images' && ` PDFs are read as page images (first ${MAX_PDF_PAGES} pages).`}
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-[11px] text-blue-800">
                <b>Note:</b> PDFs, photos and screenshots only work if your AI model can read images (a “vision” model).
                Some AIs — many free or text-only models — can’t read PDFs or images; with those, paste the terms as text above
                or upload a .txt file. Recommended: Claude, GPT-4o, Gemini Flash, or a vision model in OpenRouter/OmniRoute.
              </div>
            </>
          )}

          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 whitespace-pre-line">{error}</div>}
          {warnings.map((w) => <div key={w} className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg p-2">{w}</div>)}

          {extracted && (
            <div className="space-y-3">
              {stated.length === 0 ? (
                <div className="text-sm text-gray-600">No {cfg.noun} found in these documents.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-gray-500 uppercase border-b">
                        <th className="py-1 pr-2 w-6"></th>
                        <th className="py-1 pr-2">Field</th>
                        <th className="py-1 pr-2">Currently</th>
                        <th className="py-1">From document</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stated.map((f) => {
                        const cur = currentValue(inputs, f.key);
                        const same = cur === extracted[f.key];
                        return (
                          <tr key={f.key} className="border-b border-gray-100">
                            <td className="py-1.5 pr-2">
                              <input
                                type="checkbox"
                                checked={!!checked[f.key]}
                                onChange={(e) => setChecked((c) => ({ ...c, [f.key]: e.target.checked }))}
                              />
                            </td>
                            <td className="py-1.5 pr-2 font-semibold text-gray-700">{f.label}</td>
                            <td className="py-1.5 pr-2 text-gray-500">{fmt(f.kind, cur)}</td>
                            <td className={`py-1.5 font-bold ${same ? 'text-gray-400' : 'text-green-700'}`}>
                              {fmt(f.kind, extracted[f.key])}{same && ' (same)'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {extracted.notes && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900">
                  <div className="font-bold uppercase text-[10px] mb-1">Other terms found (added to deal notes)</div>
                  {extracted.notes}
                </div>
              )}
              <p className="text-[10px] text-gray-500">AI can misread documents — check each value against the document before applying.</p>
            </div>
          )}
        </div>

        <div className="border-t px-4 sm:px-6 py-3 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">Cancel</button>
          <button
            onClick={handleApply}
            disabled={!extracted || (selectedCount === 0 && !extracted?.notes)}
            className="px-4 py-2 text-sm rounded-lg bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-bold"
          >
            Apply {selectedCount} value{selectedCount === 1 ? '' : 's'}
          </button>
        </div>
      </div>
    </div>
  );
};
