'use client';

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader, showToast } from '../reduxStore/appSlice';
import { vehicleService } from '../services/vehicleService';
import styles from '../styles/Modal.module.css';
import InputField from './common/InputField';
import { Button } from './ui/Button';

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

interface AddPersonnelModalProps {
  type: 'Technician' | 'Supervisor';
  onClose: () => void;
  // onSave: (personnelData: Personnel) => void;
}

export default function AddPersonnelModal({ type, onClose }: AddPersonnelModalProps) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Personnel>({
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    emailId: '',
    contactNumber: '',
    password: '',
    passwordExpiryDate: '',
    designation: type,
    dateOfBirth: '',
    dateOfAnniversary: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(showLoader(`Saving ${type}...`));
    try {
      // Remove id before saving as it's auto-generated in backend
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...dataToSave } = formData;
      await vehicleService.createPersonnel(type, dataToSave);
      
      dispatch(hideLoader());
      dispatch(showToast({ message: `${type} added successfully!`, type: "success" }));
      onClose();
    } catch (error) {
      console.error(error);
      dispatch(hideLoader());
      dispatch(showToast({ message: `Failed to add ${type}.`, type: "error" }));
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>
        <h2 className={styles.modalHeader}>Add New {type}</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0">
          <InputField
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            requiredIndicator
            placeholder="Enter first name"
          />

          <InputField
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />

          <InputField
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            requiredIndicator
            placeholder="Enter username"
          />

          <InputField
            type="email"
            name="emailId"
            label="Email ID"
            value={formData.emailId}
            onChange={handleChange}
            placeholder="Enter email address"
          />

          <InputField
            type="tel"
            name="contactNumber"
            label="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            requiredIndicator
            placeholder="Enter contact number"
          />

          <InputField
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            requiredIndicator
            placeholder="Enter password"
          />

          <InputField
            type="date"
            name="passwordExpiryDate"
            label="Password Expiry Date"
            value={formData.passwordExpiryDate}
            onChange={handleChange}
            requiredIndicator
          />

          <InputField
            type="date"
            name="dateOfBirth"
            label="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />

          <InputField
            type="date"
            name="dateOfAnniversary"
            label="Date of Anniversary"
            value={formData.dateOfAnniversary}
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <InputField
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={3}
              placeholder="Enter address"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-4 mt-6">
            <Button
              type="submit"
              variant="success"
              size="sm"
              className="w-[152px]"
            >
              Save
            </Button>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={onClose}
              className="w-[152px]"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
