
import React from 'react';

// Added max prop to interface to allow input constraints and resolve TS errors
interface InputGroupProps {
  label: string;
  id: string;
  type?: string;
  value: number | string;
  onChange: (val: string | number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  label,
  id,
  type = "number",
  value,
  onChange,
  prefix,
  suffix,
  step,
  min,
  max // Destructured max prop
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id} className="text-xs font-semibold text-gray-500 uppercase tracking-wide print:text-gray-800">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm print:shadow-none">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 print:pl-0 print:hidden">
            <span className="text-gray-500 sm:text-sm">{prefix}</span>
          </div>
        )}
        {/* Added max={max} attribute to the input element */}
        <input
          type={type}
          name={id}
          id={id}
          step={step}
          min={min}
          max={max}
          className={`block w-full rounded-md border-gray-300 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm border pl-3 pr-3 ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-12' : ''} print:border-none print:shadow-none print:p-0 print:pl-0 print:bg-transparent print:font-medium`}
          value={value}
          onChange={(e) => {
            const val = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
            onChange(val);
          }}
        />
        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 print:hidden">
            <span className="text-gray-500 sm:text-sm">{suffix}</span>
          </div>
        )}
        {/* Print-only suffix/prefix text helper if needed, usually value + text is enough context */}
        {(prefix || suffix) && (
            <div className="hidden print:inline-block absolute top-0 right-0 text-sm text-gray-600">
                {prefix}{' '}{suffix}
            </div>
        )}
      </div>
    </div>
  );
};
