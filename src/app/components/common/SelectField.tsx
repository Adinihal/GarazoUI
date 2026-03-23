import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  requiredIndicator?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

export default function SelectField({ label, error, requiredIndicator, options, placeholder = "Select...", className = "", ...props }: SelectFieldProps) {
  return (
    <div className={`mt-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label} {requiredIndicator && <span className="text-red-500">*</span>}
      </label>
      <select
        className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm transition-colors focus:ring-2 focus:ring-teal-300 ${
          error ? 'border-red-400' : 'border-gray-200'
        }`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
