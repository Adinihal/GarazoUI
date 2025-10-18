'use client';

import React from 'react';

interface BadgeProps {
  status: string;
  className?: string;
}

export function Badge({ status, className = '' }: BadgeProps) {
  const getStatusColor = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'Under Service': 'bg-blue-500 text-white',
      'Next Day Delivery': 'bg-yellow-500 text-white',
      'Upcoming': 'bg-yellow-500 text-white',
      'Ready': 'bg-green-500 text-white',
      'Payment': 'bg-purple-500 text-white',
      'Completed': 'bg-teal-500 text-white',
      'Not Ready': 'bg-red-100 text-red-800',
      'Estimation Pending': 'bg-yellow-100 text-yellow-800'
    };
    return statusMap[status] || 'bg-gray-500 text-white';
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)} ${className}`}>
      {status}
    </span>
  );
}
