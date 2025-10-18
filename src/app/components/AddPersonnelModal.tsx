'use client';

import React, { useState } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import styles from '../styles/Modal.module.css';

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
  onSave: (personnelData: Personnel) => void;
}

export default function AddPersonnelModal({ type, onClose, onSave }: AddPersonnelModalProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
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
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
              placeholder="Enter last name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email ID</label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number <span className="text-red-500">*</span></label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
              placeholder="Enter contact number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password Expiry Date <span className="text-red-500">*</span></label>
            <input
              type="date"
              name="passwordExpiryDate"
              value={formData.passwordExpiryDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Anniversary</label>
            <input
              type="date"
              name="dateOfAnniversary"
              value={formData.dateOfAnniversary}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
              placeholder="Enter address"
            />
          </div>

          <div className="md:col-span-2 flex gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 py-2 px-4 rounded-lg bg-green-50 border border-green-300 text-green-800 hover:bg-green-100 transition-all"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 rounded-lg bg-red-50 border border-red-300 text-red-800 hover:bg-red-100 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
