import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  requiredIndicator?: boolean;
  multiline?: boolean;
  rows?: number;
}

export default function InputField({ label, error, requiredIndicator, className = "", multiline = false, ...props }: InputFieldProps) {
  const inputClasses = `mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm transition-colors focus:ring-2 focus:ring-teal-300 ${
    error ? 'border-red-400' : 'border-gray-200'
  }`;

  return (
    <div className={`mt-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label} {requiredIndicator && <span className="text-red-500">*</span>}
      </label>
      {multiline ? (
        <textarea className={inputClasses} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input className={inputClasses} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
