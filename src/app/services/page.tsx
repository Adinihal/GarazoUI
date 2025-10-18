'use client';

import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

interface Vehicle {
  model: string;
  regNo: string;
  type: string;
  kms: number;
}

interface Customer {
  name: string;
  phone: string;
  email: string;
  rating: number;
  advisor: string;
  source: string;
  address: string;
}

interface ServiceDetails {
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
}

interface Service {
  id: string;
  status: string;
  vehicle: Vehicle;
  location: string;
  customer: Customer;
  serviceDetails: ServiceDetails;
}

export default function ServiceList() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // In a real application, this would be an API call
    fetch('/assets/service-data.json')
      .then(res => res.json())
      .then(data => {
        setServices(data.services);
        setFilteredServices(data.services);
      });
  }, []);

  useEffect(() => {
    let filtered = services;

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(service => service.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.vehicle.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.serviceDetails.jcNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  }, [searchTerm, statusFilter, services]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
        <p className="mt-2 text-gray-600">Manage and track all vehicle services</p>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer name, vehicle number, or job card..."
            className="pl-10 w-full rounded-lg border border-gray-200 px-4 py-2.5"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            className="pl-10 w-full rounded-lg border border-gray-200 px-4 py-2.5 appearance-none bg-white"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="underServicing">Under Servicing</option>
            <option value="readyForDelivery">Ready for Delivery</option>
            <option value="paymentProcessing">Payment Processing</option>
            <option value="nextDayDelivery">Next Day Delivery</option>
            <option value="upcomingDelivery">Upcoming Delivery</option>
          </select>
        </div>
      </div>

      {/* Service Cards */}
      <div className="space-y-6">
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No services found matching your criteria</p>
          </div>
        ) : (
          filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))
        )}
      </div>
    </div>
  );
}
