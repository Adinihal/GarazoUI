'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  showingFrom: number;
  showingTo: number;
  filteredFrom?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  showingFrom,
  showingTo,
  filteredFrom
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= currentPage - 1 && i <= currentPage + 1) // Pages around current
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 pb-4">
      <div className="text-sm text-gray-600 order-2 sm:order-1">
        {totalItems > 0 ? (
          <>
            Showing {showingFrom} to {showingTo} of {totalItems} entries
            {filteredFrom && filteredFrom !== totalItems && 
              ` (filtered from ${filteredFrom} total entries)`}
          </>
        ) : (
          <span className="italic">No matching records found</span>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center gap-2 order-1 sm:order-2">
          <button 
            className="px-3 py-1 border rounded-md bg-white hover:bg-gray-50 
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200
              text-sm font-medium text-gray-700"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex gap-1">
            {getPageNumbers().map((pageNum, index) => (
              pageNum === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
              ) : (
                <button 
                  key={pageNum}
                  className={`px-3 py-1 rounded-md transition-colors duration-200 text-sm font-medium
                    ${currentPage === pageNum
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border bg-white hover:bg-gray-50 text-gray-700'
                    }`}
                  onClick={() => onPageChange(pageNum as number)}
                >
                  {pageNum}
                </button>
              )
            ))}
          </div>
          <button 
            className="px-3 py-1 border rounded-md bg-white hover:bg-gray-50 
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200
              text-sm font-medium text-gray-700"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
