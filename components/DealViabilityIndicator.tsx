import React from 'react';

interface DealViabilityProps {
  profitMargin: number | null;
  irr: number | null;
  seventyPercentRuleMet: boolean;
  ltv: number | null;
  arv: number | null;
  purchasePrice: number | null;
  afterTaxProfit: number | null;
}

export const DealViabilityIndicator: React.FC<DealViabilityProps> = ({
  profitMargin,
  irr,
  seventyPercentRuleMet,
  ltv,
  arv,
  purchasePrice,
  afterTaxProfit,
}) => {
  // Determine viability status
  let status: 'green' | 'yellow' | 'red' = 'yellow';
  const issues: string[] = [];

  // Check profit margin (target: > 20%)
  if (profitMargin !== null && profitMargin < 0.20) {
    issues.push(`Profit margin ${(profitMargin * 100).toFixed(1)}% (target: 20%+)`);
  }

  // Check IRR (target: > 20%)
  if (irr !== null && irr < 0.20) {
    issues.push(`IRR ${(irr * 100).toFixed(1)}% (target: 20%+)`);
  }

  // Check 70% rule
  if (!seventyPercentRuleMet) {
    issues.push('70% Rule not met');
  }

  // Check LTV (target: < 75%)
  if (ltv !== null && ltv > 0.75) {
    issues.push(`LTV ${(ltv * 100).toFixed(1)}% (target: < 75%)`);
  }

  // Check for negative profit
  if (afterTaxProfit !== null && afterTaxProfit < 0) {
    issues.push('Deal results in loss');
    status = 'red';
  } else if (issues.length === 0 && profitMargin !== null && irr !== null) {
    // All metrics pass
    status = 'green';
  } else if (issues.length > 0) {
    // Some issues but not critical
    status = issues.length > 2 ? 'red' : 'yellow';
  }

  const statusColors = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      text: 'text-green-700',
      badge: 'bg-green-100 text-green-800',
      icon: '✓',
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-400',
      text: 'text-yellow-700',
      badge: 'bg-yellow-100 text-yellow-800',
      icon: '⚠',
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-700',
      badge: 'bg-red-100 text-red-800',
      icon: '✕',
    },
  };

  const colors = statusColors[status];

  const statusLabels = {
    green: 'Strong Deal',
    yellow: 'Marginal Deal',
    red: 'Deal Not Viable',
  };

  return (
    <div className={`${colors.bg} border-2 ${colors.border} rounded-lg p-4 mb-4`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`text-2xl ${colors.text}`}>{colors.icon}</span>
          <h3 className={`font-bold text-lg ${colors.text}`}>{statusLabels[status]}</h3>
        </div>
        <span className={`${colors.badge} px-3 py-1 rounded-full text-sm font-semibold`}>
          {status.toUpperCase()}
        </span>
      </div>

      {issues.length > 0 && (
        <ul className={`${colors.text} text-sm space-y-1 ml-8`}>
          {issues.map((issue, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-0.5">•</span>
              <span>{issue}</span>
            </li>
          ))}
        </ul>
      )}

      {status === 'green' && (
        <p className={`${colors.text} text-sm mt-2 ml-8 font-medium`}>
          All key metrics exceeded. This deal meets investor standards.
        </p>
      )}

      {status === 'yellow' && (
        <p className={`${colors.text} text-sm mt-2 ml-8`}>
          Deal passes basic criteria but some metrics below preferred targets. Review numbers carefully.
        </p>
      )}

      {status === 'red' && (
        <p className={`${colors.text} text-sm mt-2 ml-8 font-medium`}>
          Deal does not meet minimum investor requirements. Consider revising purchase price, rehab estimate, or exit strategy.
        </p>
      )}

      {/* Key Metrics Summary */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        {profitMargin !== null && (
          <div className="bg-white rounded px-2 py-1">
            <span className="font-semibold">Profit Margin:</span> {(profitMargin * 100).toFixed(1)}%
          </div>
        )}
        {irr !== null && (
          <div className="bg-white rounded px-2 py-1">
            <span className="font-semibold">IRR:</span> {(irr * 100).toFixed(1)}%
          </div>
        )}
        {ltv !== null && (
          <div className="bg-white rounded px-2 py-1">
            <span className="font-semibold">LTV:</span> {(ltv * 100).toFixed(1)}%
          </div>
        )}
        {seventyPercentRuleMet && (
          <div className="bg-white rounded px-2 py-1">
            <span className="font-semibold">70% Rule:</span> ✓ Met
          </div>
        )}
      </div>
    </div>
  );
};
