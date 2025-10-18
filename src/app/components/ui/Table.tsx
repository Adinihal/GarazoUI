'use client';

import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface Column<T> {
  key: keyof T;
  header: string;
  width?: string;
  render?: (value: any, item: T) => React.ReactNode;
}

interface SortConfig<T> {
  key: keyof T | null;
  direction: 'asc' | 'desc';
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortConfig?: SortConfig<T>;
  onSort?: (key: keyof T) => void;
  rowClassName?: string;
  headerClassName?: string;
}

export function Table<T>({ 
  data, 
  columns, 
  sortConfig, 
  onSort,
  rowClassName = "hover:bg-gray-50",
  headerClassName = "bg-gray-50"
}: TableProps<T>) {
  const getSortIcon = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) return <FaSort className="ml-1" />;
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="ml-1 text-blue-500" /> : 
      <FaSortDown className="ml-1 text-blue-500" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className={headerClassName}>
          <tr>
            {columns.map((column) => (
              <th 
                key={String(column.key)}
                style={{ width: column.width }}
                className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                  ${onSort ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                onClick={() => onSort?.(column.key)}
              >
                <div className="flex items-center">
                  {column.header}
                  {onSort && getSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className={rowClassName}>
              {columns.map((column) => (
                <td 
                  key={String(column.key)} 
                  className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                >
                  {column.render ? 
                    column.render(item[column.key], item) : 
                    String(item[column.key] || '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
