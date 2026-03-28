'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader, showToast } from "../reduxStore/appSlice";

import AddVehicleModal from '../components/AddVehicleModal';
import AddPersonnelModal from '../components/AddPersonnelModal';
import RegistrationHeader from '../components/RegistrationHeader';
import InputField from '../components/common/InputField';
import SelectField from '../components/common/SelectField';
import { Button } from '../components/ui/Button';

import { FormData, FormErrors, Personnel, initialFormData } from '../types/registration';
import { validateRegistrationForm } from '../utils/validation';
import { BASE_URL } from '../utils/apiConfig';
import { NUMBER_PLATE_COLORS } from '../utils/constants';
import { isNull } from '../utils/helpers';
import axios from "axios";
import { VehicleCatalog } from "../types/vehicle";
import { fetchVehicleList, fetchVehicleCategories, fetchCustomerSources, fetchMechanicList } from "../reduxStore/dashboardSlice";
import { vehicleService } from "../services/vehicleService";

export default function CustomerRegistrationForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [showAddTechnicianModal, setShowAddTechnicianModal] = useState(false);
  const [showAddSupervisorModal, setShowAddSupervisorModal] = useState(false);

  const [form, setForm] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

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

useEffect(() => {
  const loadAllData = async () => {
    try {
      const promises = [];

      // Load vehicle data conditionally
      if (isNull(vehicles) || vehicles.length === 0) {
        promises.push(
          vehicleService.fetchVehicleCatalog().then(data => {
            dispatch(fetchVehicleList(data));
          })
        );
      }

      // Load vehicle categories conditionally
      if (isNull(vehicleCategories) || vehicleCategories.length === 0) {
        promises.push(
          vehicleService.fetchVehicleCategories().then(data => {
            dispatch(fetchVehicleCategories(data));
          })
        );
      }

      // Load customer sources conditionally
      if (isNull(customerSources) || customerSources.length === 0) {
        promises.push(
          vehicleService.fetchCustomerSources().then(data => {
            dispatch(fetchCustomerSources(data));
          })
        );
      }

      // Load mechanics conditionally
      if (isNull(technicians) || technicians.length === 0) {
        promises.push(
          vehicleService.fetchMechanics().then(data => {
            dispatch(fetchMechanicList(data));
          })
        );
      }

      // Execute all conditional API calls concurrently
      if (promises.length > 0) {
        await Promise.all(promises);
      }
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  loadAllData();
}, [vehicles, vehicleCategories, customerSources, technicians, dispatch])
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const validationErrors = validateRegistrationForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsLoading(false);
      return;
    }

    dispatch(showLoader("Submitting vehicle registration..."));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectedVehicle = (vehicles || []).find((v: any) => v.vehicleId?.toString() === form.vehicleName);
    const registrationNumber = selectedVehicle ? selectedVehicle.registrationNumber : "";
    const catalogId = selectedVehicle ? selectedVehicle.catalogId : 0;

    const payload = {
      "name": form.customerName,
      "phone": form.mobile,
      "email": form.email,
      "address": form.customerAddress,
      "sourceId": Number(form.customerSource),
      "registrationNumber": registrationNumber,
      "vehicleName": form.vehicleName,
      "category": form.vehicleCategory,
      "kilometreDriven": Number(form.kmDriven),
      "numberPlateColor": form.numberPlateColor,
      "chassisNumber": form.chassisNumber,
      "manufacturedYear": Number(form.manufacturedYear),
      "dateOfRegistration": form.dateOfRegistration,
      "catalogId": catalogId,
      "createJobCard": true,
      "mechanicId": Number(form.supervisor),
      "supervisorId": Number(form.supervisor),
      "status": "open",
      "arrivalDate": new Date().toISOString() // current date and time
    };

    try {
      const response = await fetch(`${BASE_URL}/CustomerVehicle/create-full`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Registration failed');

      setForm(initialFormData);
      dispatch(hideLoader());
      dispatch(showToast({ message: "Registration successful!", type: "success" }));
      router.push('/dashboard');

    } catch (error) {
      console.error('Registration error:', error);
      dispatch(hideLoader());
      dispatch(showToast({ message: "Failed to submit registration. Please try again.", type: "error" }));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <RegistrationHeader />
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-[0_-4px_8px_-2px_rgba(0,0,0,0.20),0_4px_6px_-1px_rgba(0,0,0,0.06),0_2px_4px_-2px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
          {/* Column 1 */}
          <div>
            <InputField
              className="mt-0 lg:mt-4"
              name="vehicleNo"
              label="Vehicle No."
              value={form.vehicleNo}
              onChange={handleChange}
              placeholder="Type / select vehicle no."
              error={errors.vehicleNo}
              requiredIndicator
            />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <SelectField
              name="customerSource"
              label="Customer Source"
              value={form.customerSource}
              onChange={handleChange}
              options={(customerSources || []).map((s: any) => ({ value: s.sourceId, label: s.companyName }))}
              placeholder="Select customer source"
            />
            <InputField
              name="chassisNumber"
              label="Chassis Number / VIN"
              value={form.chassisNumber}
              onChange={handleChange}
              placeholder="Chassis Number"
            />
          </div>

          {/* Column 2 */}
          <div>
            <div className="flex justify-between items-end mb-[-12px] mt-0 lg:mt-4">
              <div className="flex-1">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <SelectField
                  className="mt-0"
                  name="vehicleName"
                  label="Vehicle Name"
                  requiredIndicator
                  value={form.vehicleName}
                  onChange={handleChange}
                  error={errors.vehicleName}
                  options={(vehicles || []).map((v: any) => ({ value: v.catalogId, label: v.model }))}
                  placeholder="Select vehicle"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowAddVehicleModal(true)}
                className="ml-2 mb-[4px] inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap"
                title="Add New Vehicle"
              >
                <FaPlus className="mr-1" /> Add New
              </button>
            </div>

            <InputField
              name="email"
              label="Email Id"
              value={form.email}
              onChange={handleChange}
              placeholder="Email id"
              error={errors.email}
            />
            <InputField
              name="engineNumber"
              label="Engine Number"
              value={form.engineNumber}
              onChange={handleChange}
              placeholder="Engine Number"
            />
          </div>

          {/* Column 3 */}
          <div>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <SelectField
              className="mt-0 lg:mt-4"
              name="vehicleCategory"
              label="Vehicle Category"
              requiredIndicator
              value={form.vehicleCategory}
              onChange={handleChange}
              error={errors.vehicleCategory}
              options={(vehicleCategories || []).map((c: any) => ({ value: c.id, label: c.categoryName }))}
              placeholder="Select vehicle category"
            />
            <InputField
              name="kmDriven"
              label="Kilometre Driven"
              value={form.kmDriven}
              onChange={handleChange}
              placeholder="Kilometer Driven"
            />
            <InputField
              name="manufacturedYear"
              label="Manufactured Year"
              value={form.manufacturedYear}
              onChange={handleChange}
              placeholder="YYYY"
              error={errors.manufacturedYear}
            />
          </div>
        </div>

        {/* second row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 mt-4">
          <div>
            <SelectField
              className="mt-0"
              name="numberPlateColor"
              label="Number Plate Color"
              value={form.numberPlateColor}
              onChange={handleChange}
              options={NUMBER_PLATE_COLORS}
              placeholder="Select number plate color"
            />
            <InputField
              name="mobile"
              label="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              placeholder="(+91) INDIA"
              error={errors.mobile}
              requiredIndicator
            />
            <InputField
              name="dateOfRegistration"
              label="Date Of Registration"
              type="date"
              value={form.dateOfRegistration}
              onChange={handleChange}
            />
          </div>

          <div>
            <InputField
              className="mt-0"
              name="customerName"
              label="Customer Name"
              value={form.customerName}
              onChange={handleChange}
              placeholder="Customer's Name"
              error={errors.customerName}
              requiredIndicator
            />
            <InputField
              name="customerAddress"
              label="Customer Address"
              value={form.customerAddress}
              onChange={handleChange}
              placeholder="Customer Address"
              multiline
              rows={3}
            />
          </div>

          <div>
            <div className="flex justify-between items-end mb-[-12px]">
              <div className="flex-1">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <SelectField
                  className="mt-0"
                  name="technician"
                  label="Technician"
                  value={form.technician}
                  onChange={handleChange}
                  options={(technicians || []).map((t: any) => ({ value: t.id || t.mechanicId, label: `${t.firstName} ${t.lastName}` }))}
                  placeholder="Select technician"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowAddTechnicianModal(true)}
                className="ml-2 mb-[4px] inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap"
              >
                <FaPlus className="mr-1" /> Add New
              </button>
            </div>

            <div className="flex justify-between items-end mb-[-12px]">
              <div className="flex-1">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <SelectField
                  name="supervisor"
                  label="Supervisor"
                  value={form.supervisor}
                  onChange={handleChange}
                  options={(supervisors || []).map((s: any) => ({ value: s.mechanicId || s.id, label: `${s.firstName} ${s.lastName}` }))}
                  placeholder="Select supervisor"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowAddSupervisorModal(true)}
                className="ml-2 mb-[4px] inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap"
              >
                <FaPlus className="mr-1" /> Add New
              </button>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6">Note: <span className="text-red-500">*</span> Fields Are Mandatory</p>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="submit"
            variant="success"
            size="sm"
            loading={isLoading}
            loadingText="Submitting..."
            className="w-[152px]"
          >
            Submit
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            disabled={isLoading}
            onClick={() => { setForm(initialFormData); setErrors({}); router.push('/dashboard'); }}
            className="w-[152px]"
          >
            Close
          </Button>
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
            setForm(prev => ({ ...prev, vehicleName: newVehicle.vehicleName }));
          }}
        />
      )}

      {showAddTechnicianModal && (
        <AddPersonnelModal
          type="Technician"
          onClose={() => setShowAddTechnicianModal(false)}
          onSave={(personnelData) => {
            const newTechnician: Personnel = { ...personnelData, id: (technicians.length + 1).toString() };
            setForm(prev => ({ ...prev, technician: newTechnician.id }));
          }}
        />
      )}

      {showAddSupervisorModal && (
        <AddPersonnelModal
          type="Supervisor"
          onClose={() => setShowAddSupervisorModal(false)}
          onSave={(personnelData) => {
            const newSupervisor: Personnel = { ...personnelData, id: (supervisors.length + 1).toString() };
            setForm(prev => ({ ...prev, supervisor: newSupervisor.id }));
          }}
        />
      )}
    </div>
  );
}
