'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from 'react-icons/fa';
import AddVehicleModal from '../components/AddVehicleModal';
import AddPersonnelModal from '../components/AddPersonnelModal';
import {useSelector} from "react-redux";
// import { RootState } from '../store/store';

interface FormData {
  registrationNumber: string;
  vehicleName: string;
  category: string;
  kilometreDriven: string;
  numberPlateColor: string;
  name: string;
  sourceId: string;
  email: string;
  phone: string;
  address: string;
  chassisNumber: string;
  engineNumber: string;
  dateOfRegistration: string;
  manufacturedYear: string;
  mechanicId: string;
  supervisorId: string;
}

interface FormErrors {
  [key: string]: string;
}

interface Personnel {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  emailId: string;
  contactNumber: string;
  password: string;
  passwordExpiryDate: string;
  designation: string;
  dateOfBirth: string;
  dateOfAnniversary: string;
  address: string;
}

export default function CustomerRegistrationForm() {
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [showAddTechnicianModal, setShowAddTechnicianModal] = useState(false);
  const [showAddSupervisorModal, setShowAddSupervisorModal] = useState(false);
  
  // const [vehicles,setVehicles] = useState<Vehicle[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vehicles = useSelector((state: any) => state.dashboard.vehicleList);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vehicleCategories = useSelector((state: any) => state.dashboard.vehicleCategories);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customerSources = useSelector((state: any) => state.dashboard.customerSources);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const technicians = useSelector((state: any) => state.dashboard.mechanicList);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supervisors = useSelector((state: any) => state.dashboard.mechanicList);


  const initial: FormData = {
    registrationNumber: "",
    vehicleName: "",
    category: "",
    kilometreDriven: "",
    numberPlateColor: "",
    name: "",
    sourceId: "",
    email: "",
    phone: "",
    address: "",
    chassisNumber: "",
    engineNumber: "",
    dateOfRegistration: "",
    manufacturedYear: "",
    mechanicId: "",
    supervisorId: "",
  };

  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Remove the error for this field when it's changed
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }

  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateMobile(mobile: string): boolean {
    return /^[6-9]\d{9}$/.test(mobile);
  }

  function validate(): FormErrors {
    const err: FormErrors = {};
    
    // Required fields validation
    if (!form.registrationNumber) err.registrationNumber = "Vehicle No. is required";
    if (!form.vehicleName) err.vehicleName = "Vehicle Name is required";
    if (!form.category) err.category = "Vehicle Category is required";
    if (!form.name) err.name = "Customer Name is required";
    
    // Mobile validation
    if (!form.phone) {
      err.phone = "Mobile Number is required";
    } else if (!validateMobile(form.phone)) {
      err.phone = "Please enter a valid 10-digit mobile number";
    }

    // Email validation (only if provided)
    if (form.email && !validateEmail(form.email)) {
      err.email = "Please enter a valid email address";
    }

    // Year validation
    if (form.manufacturedYear) {
      const year = parseInt(form.manufacturedYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear) {
        err.manufacturedYear = `Year must be between 1900 and ${currentYear}`;
      }
    }

    return err;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const reqBody = {
      registrationNumber: form.registrationNumber,
      address: form.address,
      category: form.category,
      chassisNumber: form.chassisNumber,
      dateOfRegistration: form.dateOfRegistration,
      email: form.email,
      engineNumber: form.engineNumber,
      kilometreDriven: parseInt(form.kilometreDriven),
      manufacturedYear: parseInt(form.manufacturedYear),
      mechanicId: parseInt(form.mechanicId),
      name: form.name,
      numberPlateColor: form.numberPlateColor,
      phone: form.phone,
      vehicleName: form.vehicleName,
      sourceId: parseInt(form.sourceId),
      supervisorId: parseInt(form.supervisorId),
    }

    setIsLoading(true);
    try {
      // TODO: Replace with your API endpoint

      const response = await fetch('https://garazo-api-25110123.azurewebsites.net/api/CustomerVehicle/create-full', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      setForm(initial);
      // TODO: Add success toast notification here
    } catch (error) {
      console.error('Registration error:', error);
      setErrors((prev) => ({
        ...prev,
        submit: 'Failed to submit registration. Please try again.',
      }));
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setForm(initial);
    setErrors({});
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle No. <span className="text-red-500">*</span></label>
            <input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} placeholder="Type / select vehicle no." className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:ring-2 focus:ring-teal-300 ${errors.registrationNumber ? 'border-red-400' : 'border-gray-200'}`} />
            {errors.registrationNumber && <p className="text-xs text-red-500 mt-1">{errors.registrationNumber}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-4">Customer Source</label>
            <select name="sourceId" value={form.sourceId} onChange={handleChange} className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200">
              <option value="">Select customer source</option>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {customerSources.map((source:any, index:any) => (
                <option key={index} value={`${source.sourceId}`}>
                  {source.companyName}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium text-gray-700 mt-4">Chassis Number / VIN</label>
            <input name="chassisNumber" value={form.chassisNumber} onChange={handleChange} placeholder="Chassis Number" className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200" />
          </div>

          {/* Column 2 */}
          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Vehicle Name <span className="text-red-500">*</span></label>
              <button
                type="button"
                onClick={() => setShowAddVehicleModal(true)}
                className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                title="Add New Vehicle"
              >
                <FaPlus className="mr-1" /> Add New
              </button>
            </div>
            <select
              name="vehicleName"
              value={form.vehicleName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:ring-2 focus:ring-teal-300 ${
                errors.vehicleName ? 'border-red-400' : 'border-gray-200'
              }`}
            >
              <option value="">Select vehicle</option>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {vehicles.map((vehicle:any, index:any) => (
                <option key={index} value={`${vehicle.vehicleName}`}>
                  {vehicle.vehicleName}
                </option>
              ))}
            </select>
            {errors.vehicleName && <p className="text-xs text-red-500 mt-1">{errors.vehicleName}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-4">Email Id</label>
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email id" className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200" />

            <label className="block text-sm font-medium text-gray-700 mt-4">Engine Number</label>
            <input name="engineNumber" value={form.engineNumber} onChange={handleChange} placeholder="Engine Number" className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200" />
          </div>

          {/* Column 3 vehicleCategories */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Category <span className="text-red-500">*</span></label>
            <select name="category" value={form.category} onChange={handleChange} className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm ${errors.category ? 'border-red-400' : 'border-gray-200'}`}>
              <option value="">Select vehicle category</option>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {vehicleCategories.map((category:any, index:any) => (
                <option key={index} value={`${category.categoryName}`}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-4">Kilometre Driven</label>
            <input name="kilometreDriven" value={form.kilometreDriven} onChange={handleChange} placeholder="Kilometer Driven" className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200" />

            <label className="block text-sm font-medium text-gray-700 mt-4">Manufactured Year</label>
            <input name="manufacturedYear" value={form.manufacturedYear} onChange={handleChange} placeholder="YYYY" className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200" />
          </div>
        </div>

        {/* second row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Number Plate Color</label>
            <select name="numberPlateColor" value={form.numberPlateColor} onChange={handleChange} className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200">
              <option value="">Select number plate color</option>
              <option value="white">White</option>
              <option value="yellow">Yellow</option>
              <option value="black">Black</option>
            </select>

            <label className="block text-sm font-medium text-gray-700 mt-4">Mobile Number <span className="text-red-500">*</span></label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="(+91) INDIA" className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm ${errors.phone ? 'border-red-400' : 'border-gray-200'}`} />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-4">Date Of Registration</label>
            <input name="dateOfRegistration" value={form.dateOfRegistration} onChange={handleChange} type="date" className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name <span className="text-red-500">*</span></label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Customer's Name" className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm ${errors.name ? 'border-red-400' : 'border-gray-200'}`} />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-4">Customer Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} rows={3} placeholder="Customer Address" className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200" />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Technician</label>
              <button
                type="button"
                onClick={() => setShowAddTechnicianModal(true)}
                className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                title="Add New Technician"
              >
                <FaPlus className="mr-1" /> Add New
              </button>
            </div>
            <select
              name="mechanicId"
              value={form.mechanicId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
            >
              <option value="">Select technician</option>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {technicians.map((tech: any) => (
                <option key={tech.mechanicId} value={tech.mechanicId}>
                  {tech.firstName} {tech.lastName}
                </option>
              ))}
            </select>

            <div className="flex justify-between items-center mt-4">
              <label className="block text-sm font-medium text-gray-700">Supervisor</label>
              <button
                type="button"
                onClick={() => setShowAddSupervisorModal(true)}
                className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                title="Add New Supervisor"
              >
                <FaPlus className="mr-1" /> Add New
              </button>
            </div>
            <select
              name="supervisorId"
              value={form.supervisorId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
            >
              <option value="">Select supervisor</option>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {supervisors.map((sup: any) => (
                <option key={sup.mechanicId} value={sup.mechanicId}>
                  {sup.firstName} {sup.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4">Note: <span className="text-red-500">*</span> Fields Are Mandatory</p>

        {errors.submit && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {errors.submit}
          </div>
        )}

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 py-3 rounded-2xl bg-green-50 border border-green-300 text-green-800 hover:opacity-90 shadow-sm transition-all
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-100'}`}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className={`flex-1 py-3 rounded-2xl bg-red-50 border border-red-300 text-red-800 shadow-sm transition-all
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-100'}`}
          >
            Close
          </button>
        </div>
      </form>

      {showAddVehicleModal && (
        <AddVehicleModal
          onClose={() => setShowAddVehicleModal(false)}
          onSave={(vehicleData) => {
            const newVehicle = {
              vehicleId: (vehicles.length + 1).toString(),
              vehicleName: `${vehicleData.brand} ${vehicleData.model} ${vehicleData.variant || ''}`.trim()
            };
            setForm(prev => ({
              ...prev,
              vehicleName: newVehicle.vehicleName
            }));
          }}
        />
      )}

      {showAddTechnicianModal && (
        <AddPersonnelModal
          type="Technician"
          onClose={() => setShowAddTechnicianModal(false)}
          onSave={(personnelData) => {
            const newTechnician: Personnel = {
              ...personnelData,
              id: (technicians.length + 1).toString(),
            };
            setForm(prev => ({
              ...prev,
              mechanicId: newTechnician.id
            }));
          }}
        />
      )}

      {showAddSupervisorModal && (
        <AddPersonnelModal
          type="Supervisor"
          onClose={() => setShowAddSupervisorModal(false)}
          onSave={(personnelData) => {
            const newSupervisor: Personnel = {
              ...personnelData,
              id: (supervisors.length + 1).toString(),
            };
            setForm(prev => ({
              ...prev,
              supervisorId: newSupervisor.id
            }));
          }}
        />
      )}
    </div>
  );
}
