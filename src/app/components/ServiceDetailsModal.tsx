'use client';

import React, { useState, useMemo } from 'react';
import { FaTimes, FaSort, FaSortUp, FaSortDown, FaSearch } from 'react-icons/fa';
import styles from '../styles/Modal.module.css';

type StatusColor = 'Under Service' | 'Next Day Delivery' | 'Upcoming' | 'Ready' | 'Payment' | 'Completed';

interface Service {
  id: string;
  arrivalDate: string;
  customerName: string;
  vehicleNo: string;
  vehicleName: string;
  supervisorName: string;
  technicianName: string;
  status: StatusColor;
  invoiceNo: string;
  insurance: string;
  totalAmount: string;
  deliveryDate: string;
}

interface ServiceDetailsModalProps {
  onClose: () => void;
  services: Service[];
}

type SortConfig = {
  key: keyof Service | null;
  direction: 'asc' | 'desc';
};

// Dummy data for testing
const dummyServices: Service[] = Array.from({ length: 50 }, (_, index) => ({
  id: `JC${String(index + 1).padStart(4, '0')}`,
  arrivalDate: new Date(2025, 9, index % 30 + 1).toLocaleDateString(),
  customerName: `Customer ${index + 1}`,
  vehicleNo: `KA${String(Math.floor(Math.random() * 99)).padStart(2, '0')}M${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
  vehicleName: ['Honda City', 'Toyota Innova', 'Hyundai i20', 'Maruti Swift', 'Tata Nexon'][index % 5],
  supervisorName: ['Raj Kumar', 'Amit Shah', 'Priya Singh', 'Deepak Verma'][index % 4],
  technicianName: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams'][index % 4],
  status: (['Under Service', 'Next Day Delivery', 'Upcoming', 'Ready', 'Payment', 'Completed'] as StatusColor[])[index % 6],
  invoiceNo: index % 3 === 0 ? `INV${String(index + 1).padStart(4, '0')}` : '',
  insurance: index % 4 === 0 ? 'Yes' : 'No',
  totalAmount: String(Math.floor(Math.random() * 50000) + 10000),
  deliveryDate: new Date(2025, 9, (index % 30) + 3).toLocaleDateString(),
}));

export default function ServiceDetailsModal({ onClose, services }: ServiceDetailsModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const itemsPerPage = 10;

  // Use dummy data if no services provided
  const allServices = services.length > 0 ? services : dummyServices;

    const getSortIcon = (key: keyof Service) => {
    if (sortConfig.key !== key) return <FaSort className="ml-1" />;
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="ml-1 text-blue-500" /> : 
      <FaSortDown className="ml-1 text-blue-500" />;
  };

  // Search and sort logic
  const filteredAndSortedItems = useMemo(() => {
    let filtered = allServices.filter(service => 
      Object.values(service).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [allServices, searchTerm, sortConfig]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);

  // Reset to first page when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSort = (key: keyof Service) => {
    setSortConfig(prevConfig => ({
      key,
      direction: 
        prevConfig.key === key && prevConfig.direction === 'asc' 
          ? 'desc' 
          : 'asc'
    }));
  };

  // Removed getSortIcon as it's now handled by the Table component

  const getStatusColor = (status: StatusColor) => {
    const statusMap = {
      'Under Service': 'bg-blue-500 text-white',
      'Next Day Delivery': 'bg-yellow-500 text-white',
      'Upcoming': 'bg-yellow-500 text-white',
      'Ready': 'bg-green-500 text-white',
      'Payment': 'bg-purple-500 text-white',
      'Completed': 'bg-teal-500 text-white',
      'Not Ready': 'bg-red-100 text-red-800',
      'Estimation Pending': 'bg-yellow-100 text-yellow-800'
    } as const;
    return statusMap[status] || 'bg-gray-500 text-white';
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-semibold text-gray-800">Service Details</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-500 hover:text-gray-700"
                onClick={onClose}
                aria-label="Close modal"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center">
                    Job Id {getSortIcon('id')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('arrivalDate')}
                >
                  <div className="flex items-center">
                    Arrival Date {getSortIcon('arrivalDate')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('customerName')}
                >
                  <div className="flex items-center">
                    Customer Name {getSortIcon('customerName')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('vehicleNo')}
                >
                  <div className="flex items-center">
                    Vehicle No. {getSortIcon('vehicleNo')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('vehicleName')}
                >
                  <div className="flex items-center">
                    Vehicle Name {getSortIcon('vehicleName')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('supervisorName')}
                >
                  <div className="flex items-center">
                    Supervisor Name {getSortIcon('supervisorName')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('technicianName')}
                >
                  <div className="flex items-center">
                    Technician Name {getSortIcon('technicianName')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status {getSortIcon('status')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('invoiceNo')}
                >
                  <div className="flex items-center">
                    Invoice# {getSortIcon('invoiceNo')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('insurance')}
                >
                  <div className="flex items-center">
                    Insurance {getSortIcon('insurance')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('totalAmount')}
                >
                  <div className="flex items-center">
                    Total Amount {getSortIcon('totalAmount')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('deliveryDate')}
                >
                  <div className="flex items-center">
                    Vehicle Delivery Dt {getSortIcon('deliveryDate')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{service.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{service.arrivalDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{service.customerName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{service.vehicleNo}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{service.vehicleName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{service.supervisorName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{service.technicianName}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{service.invoiceNo || 'NA'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{service.insurance || 'No'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">₹{service.totalAmount || '0'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{service.deliveryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 pb-4">
          <div className="text-sm text-gray-600">
            {filteredAndSortedItems.length > 0 ? (
              <>
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredAndSortedItems.length)} of {filteredAndSortedItems.length} entries
                {searchTerm && ` (filtered from ${allServices.length} total entries)`}
              </>
            ) : (
              <span className="italic">No matching records found</span>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button 
                className="px-3 py-1 border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => {
                  // Show first page, last page, current page, and one page before and after current
                  const pageNum = i + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button 
                        key={pageNum}
                        className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'border bg-white hover:bg-gray-50'
                        }`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return <span key={pageNum} className="px-2">...</span>;
                  }
                  return null;
                })}
              </div>
              <button 
                className="px-3 py-1 border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
