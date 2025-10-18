'use client';

import React from 'react';
import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaMotorcycle, FaTools, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';

interface ServiceCardProps {
  service: {
    id: string;
    status: string;
    vehicle: {
      model: string;
      regNo: string;
      type: string;
      kms: number;
    };
    location: string;
    customer: {
      name: string;
      phone: string;
      email: string;
      rating: number;
      advisor: string;
      source: string;
      address: string;
    };
    serviceDetails: {
      jcNo: string;
      estimate: number;
      invoiceNo: string;
      paid: number;
      due: number;
      type: string;
      doa: string;
      dod: string;
      progress: number;
      assignedTechnician: string;
      supervisor: string;
    };
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      underServicing: 'bg-blue-100 text-blue-800',
      readyForDelivery: 'bg-green-100 text-green-800',
      paymentProcessing: 'bg-yellow-100 text-yellow-800',
      nextDayDelivery: 'bg-purple-100 text-purple-800',
      upcomingDelivery: 'bg-indigo-100 text-indigo-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{service.vehicle.model}</h3>
          <p className="text-sm text-gray-600">{service.vehicle.regNo}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
          {service.status.replace(/([A-Z])/g, ' $1').trim()}
        </span>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Customer Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
            <div className="space-y-2">
              <p className="text-sm flex items-center justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{service.customer.name}</span>
              </p>
              <p className="text-sm flex items-center gap-2">
                <FaPhone className="text-gray-400" />
                <a href={`tel:${service.customer.phone}`} className="text-blue-600 hover:text-blue-800">
                  {service.customer.phone}
                </a>
              </p>
              <p className="text-sm flex items-center gap-2">
                <FaEnvelope className="text-gray-400" />
                <a href={`mailto:${service.customer.email}`} className="text-blue-600 hover:text-blue-800">
                  {service.customer.email}
                </a>
              </p>
              <p className="text-sm flex items-start gap-2">
                <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-600">{service.customer.address}</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Rating:</span>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{service.customer.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Vehicle Details</h4>
            <div className="space-y-2">
              <p className="text-sm flex items-center gap-2">
                <FaMotorcycle className="text-gray-400" />
                <span>{service.vehicle.type} - {service.vehicle.model}</span>
              </p>
              <p className="text-sm flex items-center justify-between">
                <span className="text-gray-600">Odometer:</span>
                <span>{service.vehicle.kms.toLocaleString()} km</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Service Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Service Information</h4>
            <div className="space-y-2">
              <p className="text-sm flex items-center justify-between">
                <span className="text-gray-600">Job Card:</span>
                <span className="font-medium">{service.serviceDetails.jcNo}</span>
              </p>
              <p className="text-sm flex items-center justify-between">
                <span className="text-gray-600">Service Type:</span>
                <span>{service.serviceDetails.type}</span>
              </p>
              <div className="text-sm flex items-center gap-2">
                <FaTools className="text-gray-400" />
                <span>Technician: {service.serviceDetails.assignedTechnician}</span>
              </div>
              <p className="text-sm flex items-center justify-between">
                <span className="text-gray-600">Supervisor:</span>
                <span>{service.serviceDetails.supervisor}</span>
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Payment Details</h4>
            <div className="space-y-2">
              <p className="text-sm flex items-center justify-between">
                <span className="text-gray-600">Estimate:</span>
                <span className="flex items-center">
                  <FaRupeeSign className="text-gray-400" />
                  {service.serviceDetails.estimate.toLocaleString()}
                </span>
              </p>
              <p className="text-sm flex items-center justify-between">
                <span className="text-gray-600">Paid:</span>
                <span className="flex items-center text-green-600">
                  <FaRupeeSign className="text-gray-400" />
                  {service.serviceDetails.paid.toLocaleString()}
                </span>
              </p>
              {service.serviceDetails.due > 0 && (
                <p className="text-sm flex items-center justify-between">
                  <span className="text-gray-600">Due:</span>
                  <span className="flex items-center text-red-600">
                    <FaRupeeSign className="text-gray-400" />
                    {service.serviceDetails.due.toLocaleString()}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Date of Arrival</p>
                <p className="text-sm font-medium flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-400" />
                  {formatDate(service.serviceDetails.doa)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Expected Delivery</p>
                <p className="text-sm font-medium flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-400" />
                  {formatDate(service.serviceDetails.dod)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Service Progress</span>
          <span className="text-sm text-gray-600">{service.serviceDetails.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${service.serviceDetails.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
