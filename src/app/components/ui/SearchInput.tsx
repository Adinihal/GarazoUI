'use client';

import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, placeholder = "Search...", className = "" }: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          bg-white border-gray-300 text-gray-900
          transition-all duration-200 ease-in-out"
      />
      <FaSearch 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400
          pointer-events-none transition-colors duration-200"
      />
    </div>
  );
}
