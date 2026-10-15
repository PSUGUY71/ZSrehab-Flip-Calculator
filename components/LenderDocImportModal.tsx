import React, { useState } from 'react';
import { LoanInputs } from '../types';
import { AIConfig } from '../utils/aiProvider';

/**
 * Upload lender documents (term sheet, loan estimate, commitment letter — PDF, image or text),
 * have the AI (OpenAI or Grok, per Settings → AI Assistant) read the loan terms, review them
 * side by side, and apply the ones you check.
 */

interface Props {
  ai: AIConfig;
  inputs: LoanInputs;
  onApply: (data: Partial<LoanInputs>) => void;
  onClose: () => void;
  onOpenSettings: () => void;
}

type Kind = 'money' | 'percent' | 'number' | 'bool' | 'text' | 'date' | 'loanType';
// Field → label + how to show it. `financingPercent` maps onto financingPercentage / custom financing.
const FIELDS: { key: string; label: string; kind: Kind; desc: string }[] = [
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

const typeFor = (k: Kind) => ({
  money: ['number', 'null'], percent: ['number', 'null'], number: ['number', 'null'],
  bool: ['boolean', 'null'], text: ['string', 'null'], date: ['string', 'null'],
  loanType: ['string', 'null'],
}[k]);

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [...FIELDS.map((f) => f.key), 'notes'],
  properties: {
    ...Object.fromEntries(FIELDS.map((f) => [f.key, {
      type: typeFor(f.kind), description: f.desc,
      ...(f.kind === 'loanType' ? { enum: ['HARD_MONEY', 'CONVENTIONAL', 'PORTFOLIO', 'OTHER', null] } : {}),
    }])),
    notes: { type: 'string', description: 'Other important terms that have no field above: draw/inspection fees, extension fees, reserves, exit fees, guaranty, conditions; and what was summed into otherLenderFees. Empty string if none.' },
  },
};

const PROMPT = `You read real-estate lender documents (term sheets, loan estimates, commitment letters, fee sheets).
Extract the loan terms into the JSON schema. Rules:
- Only use values explicitly stated in the documents. If a value is not stated, return null. Never guess.
- Percentages as plain numbers (12% -> 12, 2 points -> 2). Dollar amounts as plain numbers (no $ or commas).
- If several options/scenarios are quoted, use the one the borrower appears to be getting and mention the others in notes.`;

const readAs = (file: File, how: 'dataUrl' | 'text') => new Promise<string>((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(r.result as string);
  r.onerror = () => rej(new Error(`Could not read ${file.name}`));
  how === 'dataUrl' ? r.readAsDataURL(file) : r.readAsText(file);
});

// ponytail: Grok's chat endpoint takes images, not PDFs — render the first pages instead of using xAI's
// Files API + Responses flow; raise if term sheets with more pages show up
const MAX_PDF_PAGES = 10;

const imagePart = (url: string) => ({ type: 'image_url', image_url: { url, detail: 'high' } });

/** Render PDF pages to JPEG data URLs in the browser (pdf.js, loaded only when needed). */
const pdfToImages = async (file: File) => {
  const pdfjs = await import('pdfjs-dist');
  pdfjs.GlobalWorkerOptions.workerSrc = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const urls: string[] = [];
  for (let i = 1; i <= Math.min(pdf.numPages, MAX_PDF_PAGES); i++) {
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

/** Grok accepts JPG/PNG only — re-encode anything else (WebP, GIF, BMP…) as PNG. */
const toPngDataUrl = async (file: File) => {
  const bmp = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bmp.width;
  canvas.height = bmp.height;
  canvas.getContext('2d')!.drawImage(bmp, 0, 0);
  return canvas.toDataURL('image/png');
};

/** One file → the message content parts for the chosen provider (+ a warning if pages were skipped). */
const toContentParts = async (file: File, ai: AIConfig): Promise<{ parts: any[]; warning?: string }> => {
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (isPdf && ai.provider === 'grok') {
    const { urls, skipped } = await pdfToImages(file);
    return {
      parts: [{ type: 'text', text: `--- ${file.name} (${urls.length} page images) ---` }, ...urls.map(imagePart)],
      warning: skipped ? `${file.name}: only the first ${MAX_PDF_PAGES} pages were read (${skipped} skipped).` : undefined,
    };
  }
  if (isPdf) {
    return { parts: [{ type: 'file', file: { filename: file.name, file_data: await readAs(file, 'dataUrl') } }] };
  }
  if (file.type.startsWith('image/')) {
    const jpgOrPng = /^image\/(jpe?g|png)$/.test(file.type);
    return { parts: [imagePart(ai.provider === 'grok' && !jpgOrPng ? await toPngDataUrl(file) : await readAs(file, 'dataUrl'))] };
  }
  if (file.type.startsWith('text/') || /\.(txt|csv|md)$/i.test(file.name)) {
    return { parts: [{ type: 'text', text: `--- ${file.name} ---\n${await readAs(file, 'text')}` }] };
  }
  throw new Error(`${file.name}: unsupported file type. Use PDF, an image (PNG/JPG/screenshot), or text. For Word files, save as PDF first.`);
};

/** Chat-completions call with strict JSON schema; if the provider rejects the schema, retry once in plain JSON mode. */
const extractTerms = async (ai: AIConfig, parts: any[]) => {
  const call = (strict: boolean) => fetch(ai.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ai.apiKey}` },
    body: JSON.stringify({
      model: ai.docModel,
      temperature: 0,
      messages: [
        { role: 'system', content: strict ? PROMPT : `${PROMPT}\nReply with only a JSON object matching this JSON schema (every key present, null when unknown):\n${JSON.stringify(SCHEMA)}` },
        { role: 'user', content: [{ type: 'text', text: 'Extract the loan terms from these lender documents.' }, ...parts] },
      ],
      response_format: strict
        ? { type: 'json_schema', json_schema: { name: 'loan_terms', strict: true, schema: SCHEMA } }
        : { type: 'json_object' },
    }),
  });
  let resp = await call(true);
  let body = await resp.json();
  if (resp.status === 400 && /schema|response_format/i.test(body?.error?.message || JSON.stringify(body))) {
    resp = await call(false);
    body = await resp.json();
  }
  if (!resp.ok) {
    const msg = body?.error?.message || body?.error || `${ai.label} error ${resp.status}`;
    throw new Error(resp.status === 401 ? `Invalid ${ai.label} API key — check Settings → AI Assistant.` : String(msg));
  }
  const msg = body.choices?.[0]?.message;
  if (msg?.refusal) throw new Error(msg.refusal);
  const json = String(msg?.content || '{}').replace(/^```(?:json)?\s*|\s*```$/g, '');
  return JSON.parse(json);
};

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
    : (inputs as any)[key];

export const LenderDocImportModal: React.FC<Props> = ({ ai, inputs, onApply, onClose, onOpenSettings }) => {
  const apiKey = ai.apiKey;
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [extracted, setExtracted] = useState<Record<string, any> | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const totalMB = files.reduce((s, f) => s + f.size, 0) / 1_048_576;

  const handleRead = async () => {
    setLoading(true); setError(null); setExtracted(null); setWarnings([]);
    try {
      const converted = await Promise.all(files.map((f) => toContentParts(f, ai)));
      setWarnings(converted.map((c) => c.warning).filter(Boolean) as string[]);
      const data = await extractTerms(ai, converted.flatMap((c) => c.parts));
      setExtracted(data);
      // Pre-check every field the document actually stated and that differs from what's entered
      setChecked(Object.fromEntries(FIELDS.map((f) => [f.key,
        data[f.key] !== null && data[f.key] !== undefined && data[f.key] !== currentValue(inputs, f.key)])));
    } catch (e: any) {
      setError(e.message || 'Failed to read the documents');
    } finally {
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
      } else {
        data[f.key] = extracted[f.key];
      }
    }
    if (extracted.notes) data.notes = [inputs.notes, `Lender doc terms: ${extracted.notes}`].filter(Boolean).join('\n');
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
            <h2 className="text-base sm:text-lg font-bold uppercase">Import Lender Docs</h2>
            <p className="text-[11px] text-gray-300">Upload the term sheet / loan estimate — the AI reads the terms, you review before anything changes.</p>
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
                <div className="text-sm font-semibold text-gray-700">📄 Choose lender documents</div>
                <div className="text-[11px] text-gray-500 mt-1">PDF, photos/screenshots (PNG, JPG) or text · several files OK (term sheet + fee sheet)</div>
              </label>

              {files.length > 0 && (
                <div className="text-xs text-gray-600 space-y-0.5">
                  {files.map((f) => <div key={f.name}>• {f.name} <span className="text-gray-400">({(f.size / 1024).toFixed(0)} KB)</span></div>)}
                  {totalMB > 30 && <div className="text-red-600">Files are {totalMB.toFixed(1)} MB — the AI accepts up to ~30 MB per request. Remove some pages/files.</div>}
                </div>
              )}

              <button
                onClick={handleRead}
                disabled={!files.length || loading || totalMB > 30}
                className="w-full bg-gray-900 hover:bg-gray-700 disabled:bg-gray-300 text-white font-bold py-2 rounded-lg text-sm"
              >
                {loading ? 'Reading documents…' : 'Read loan terms'}
              </button>
              <p className="text-[10px] text-gray-400 -mt-2">
                The files are sent to {ai.label} with your key to be read; nothing is stored by this app.
                {ai.provider === 'grok' && ` PDFs are read as page images (first ${MAX_PDF_PAGES} pages).`}
              </p>
            </>
          )}

          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">{error}</div>}
          {warnings.map((w) => <div key={w} className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg p-2">{w}</div>)}

          {extracted && (
            <div className="space-y-3">
              {stated.length === 0 ? (
                <div className="text-sm text-gray-600">No loan terms found in these documents.</div>
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
