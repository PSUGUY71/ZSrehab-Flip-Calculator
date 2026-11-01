import { CalculatedResults } from '../types';
import { formatCurrency } from './calculations';

export const DEFAULT_MARGIN_TARGET = 12; // net profit as % of ARV

/** "Short $X — cash runs out in month N" when Total Cash Needed is more than the liquidity entered, else null. */
export const cashShortIssue = (liquidity: number, r: Pick<CalculatedResults, 'cashShortfall' | 'cashRunwayMonth'>) => {
  if (!(liquidity > 0) || !(r.cashShortfall > 0)) return null;
  const when = r.cashRunwayMonth === 0 ? 'not enough to close'
    : r.cashRunwayMonth ? `cash runs out in month ${r.cashRunwayMonth}`
    : 'cash lasts the hold but not the full total';
  return `Short ${formatCurrency(r.cashShortfall)} — ${when}`;
};

/** Verdict box: green / yellow / red and the reasons. A loss or a cash shortfall is always red. */
export const dealVerdict = (p: {
  profitMargin: number | null; // decimal (0.12 = 12%)
  irr: number | null;
  seventyPercentRuleMet: boolean;
  ltv: number | null;
  afterTaxProfit: number | null;
  cashIssue?: string | null;
  marginTarget?: number; // percent
}) => {
  const target = p.marginTarget ?? DEFAULT_MARGIN_TARGET;
  const issues: string[] = [];
  if (p.cashIssue) issues.push(p.cashIssue);
  if (p.profitMargin !== null && p.profitMargin < target / 100) {
    issues.push(`Profit margin ${(p.profitMargin * 100).toFixed(1)}% (target: ${target}%+ of ARV)`);
  }
  if (p.irr !== null && p.irr < 0.20) issues.push(`IRR ${(p.irr * 100).toFixed(1)}% (target: 20%+)`);
  if (!p.seventyPercentRuleMet) issues.push('70% Rule not met');
  if (p.ltv !== null && p.ltv > 75) issues.push(`LTV ${p.ltv.toFixed(1)}% (target: < 75%)`);
  const loss = p.afterTaxProfit !== null && p.afterTaxProfit < 0;
  if (loss) issues.push('Deal results in loss');

  let status: 'green' | 'yellow' | 'red' = 'yellow';
  if (loss || p.cashIssue) status = 'red';
  else if (issues.length === 0 && p.profitMargin !== null && p.irr !== null) status = 'green';
  else if (issues.length > 2) status = 'red';
  return { status, issues };
};
