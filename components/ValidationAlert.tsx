import React from 'react';
import { ValidationError } from '../utils/inputValidator';

interface ValidationAlertProps {
  errors: ValidationError[];
  warnings: ValidationError[];
}

export const ValidationAlert: React.FC<ValidationAlertProps> = ({ errors, warnings }) => {
  if (errors.length === 0 && warnings.length === 0) {
    return null; // No issues, don't show anything
  }

  return (
    <div className="mb-4">
      {/* ERRORS - Show prominently */}
      {errors.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-500 rounded-lg p-3 mb-3">
          <div className="flex items-start gap-2">
            <div className="text-2xl leading-none">❌</div>
            <div className="flex-1">
              <h3 className="font-bold text-amber-900 text-sm uppercase mb-2">
                Input Validation Errors
              </h3>
              <ul className="space-y-1">
                {errors.map((error, idx) => (
                  <li key={idx} className="text-sm text-amber-800">
                    <span className="font-semibold">{error.field}:</span> {error.message}
                  </li>
                ))}
              </ul>
              <div className="text-xs text-amber-600 mt-2 italic">
                Please fix these errors before proceeding.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WARNINGS - Show but allow proceeding */}
      {warnings.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <div className="text-2xl leading-none">⚠️</div>
            <div className="flex-1">
              <h3 className="font-bold text-amber-900 text-sm uppercase mb-2">
                Validation Warnings
              </h3>
              <ul className="space-y-1">
                {warnings.map((warning, idx) => (
                  <li key={idx} className="text-sm text-yellow-800">
                    <span className="font-semibold">{warning.field}:</span> {warning.message}
                  </li>
                ))}
              </ul>
              <div className="text-xs text-yellow-700 mt-2 italic">
                These don't prevent calculation but may indicate unrealistic assumptions.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
