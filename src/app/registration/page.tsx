'use client';

import React, { useState, useEffect } from "react";
import { Readable } from 'stream';
import { useRouter } from "next/navigation";
import { FaPlus } from 'react-icons/fa';
import AddVehicleModal from '../components/AddVehicleModal';
import AddPersonnelModal from '../components/AddPersonnelModal';
import {useSelector} from "react-redux";
// import { RootState } from '../store/store';

interface Vehicle {
  vehicleId: string;
  vehicleName: string;
}

interface FormData {
  vehicleNo: string;
  vehicleName: string;
  vehicleCategory: string;
  kmDriven: string;
  numberPlateColor: string;
  customerName: string;
  customerSource: string;
  email: string;
  mobile: string;
  customerAddress: string;
  chassisNumber: string;
  engineNumber: string;
  dateOfRegistration: string;
  manufacturedYear: string;
  technician: string;
  supervisor: string;
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

interface CustomerRegistrationFormProps {
  onCloseRegistrationModal: () => void;
}

export default function CustomerRegistrationForm({onCloseRegistrationModal}: CustomerRegistrationFormProps) {
  const router = useRouter();
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [showAddTechnicianModal, setShowAddTechnicianModal] = useState(false);
  const [showAddSupervisorModal, setShowAddSupervisorModal] = useState(false);
  
  // const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const vehicles = useSelector((state: any) => state.dashboard.vehicleList);
  const vehicleCategories = useSelector((state: any) => state.dashboard.vehicleCategories);
  const customerSources = useSelector((state: any) => state.dashboard.customerSources);
  const technicians = useSelector((state: any) => state.dashboard.mechanicList);
  const supervisors = useSelector((state: any) => state.dashboard.mechanicList);


  const initial: FormData = {
    vehicleNo: "",
    vehicleName: "",
    vehicleCategory: "",
    kmDriven: "",
    numberPlateColor: "",
    customerName: "",
    customerSource: "",
    email: "",
    mobile: "",
    customerAddress: "",
    chassisNumber: "",
    engineNumber: "",
    dateOfRegistration: "",
    manufacturedYear: "",
    technician: "",
    supervisor: "",
  };

  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

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
    if (!form.vehicleNo) err.vehicleNo = "Vehicle No. is required";
    if (!form.vehicleName) err.vehicleName = "Vehicle Name is required";
    if (!form.vehicleCategory) err.vehicleCategory = "Vehicle Category is required";
    if (!form.customerName) err.customerName = "Customer Name is required";
    
    // Mobile validation
    if (!form.mobile) {
      err.mobile = "Mobile Number is required";
    } else if (!validateMobile(form.mobile)) {
      err.mobile = "Please enter a valid 10-digit mobile number";
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

    setIsLoading(true);
    try {
      // TODO: Replace with your API endpoint
      const response = await fetch('/api/customer-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
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

  function handleClose() {
    // go back or close modal — in a modal you would call the modal close handler
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
            <input name="vehicleNo" value={form.vehicleNo} onChange={handleChange} placeholder="Type / select vehicle no." className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:ring-2 focus:ring-teal-300 ${errors.vehicleNo ? 'border-red-400' : 'border-gray-200'}`} />
            {errors.vehicleNo && <p className="text-xs text-red-500 mt-1">{errors.vehicleNo}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-4">Customer Source</label>
            <select name="customerSource" value={form.customerSource} onChange={handleChange} className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200">
              <option value="">Select customer source</option>
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
              {vehicles.map((vehicle:any, index:any) => (
                <option key={index} value={`${vehicle.vehicleId}`}>
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
            <select name="vehicleCategory" value={form.vehicleCategory} onChange={handleChange} className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm ${errors.vehicleCategory ? 'border-red-400' : 'border-gray-200'}`}>
              <option value="">Select vehicle category</option>
              {vehicleCategories.map((category:any, index:any) => (
                <option key={index} value={`${category.id}`}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            {errors.vehicleCategory && <p className="text-xs text-red-500 mt-1">{errors.vehicleCategory}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-4">Kilometre Driven</label>
            <input name="kmDriven" value={form.kmDriven} onChange={handleChange} placeholder="Kilometer Driven" className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200" />

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
            <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="(+91) INDIA" className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm ${errors.mobile ? 'border-red-400' : 'border-gray-200'}`} />
            {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-4">Date Of Registration</label>
            <input name="dateOfRegistration" value={form.dateOfRegistration} onChange={handleChange} type="date" className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name <span className="text-red-500">*</span></label>
            <input name="customerName" value={form.customerName} onChange={handleChange} placeholder="Customer's Name" className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm ${errors.customerName ? 'border-red-400' : 'border-gray-200'}`} />
            {errors.customerName && <p className="text-xs text-red-500 mt-1">{errors.customerName}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-4">Customer Address</label>
            <textarea name="customerAddress" value={form.customerAddress} onChange={handleChange} rows={3} placeholder="Customer Address" className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200" />
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
              name="technician"
              value={form.technician}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
            >
              <option value="">Select technician</option>
              {technicians.map((tech) => (
                <option key={tech.id} value={tech.id}>
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
              name="supervisor"
              value={form.supervisor}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
            >
              <option value="">Select supervisor</option>
              {supervisors.map((sup) => (
                <option key={sup.id} value={sup.id}>
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
            className={`flex-1 py-3 rounded-2xl bg-blue-50 border border-blue-300 text-blue-800 shadow-sm transition-all
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100'}`}
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onCloseRegistrationModal}
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
            const newVehicle: Vehicle = {
              id: (vehicles.length + 1).toString(),
              ...vehicleData
            };
            setVehicles(prev => [...prev, newVehicle]);
            setForm(prev => ({
              ...prev,
              vehicleName: `${vehicleData.brand} ${vehicleData.model} ${vehicleData.variant || ''}`.trim()
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
            setTechnicians(prev => [...prev, newTechnician]);
            setForm(prev => ({
              ...prev,
              technician: newTechnician.id
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
            setSupervisors(prev => [...prev, newSupervisor]);
            setForm(prev => ({
              ...prev,
              supervisor: newSupervisor.id
            }));
          }}
        />
      )}
    </div>
  );
}
