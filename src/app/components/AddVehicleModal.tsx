'use client';

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from '../styles/Modal.module.css';

interface AddVehicleModalProps {
  onClose: () => void;
  onSave: (vehicleData: { brand: string; model: string; variant: string }) => void;
}

export default function AddVehicleModal({ onClose, onSave }: AddVehicleModalProps) {
  const [vehicleData, setVehicleData] = useState({
    brand: '',
    model: '',
    variant: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(vehicleData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVehicleData(prev => ({ ...prev, [name]: value }));
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
        <h2 className={styles.modalHeader}>Add New Vehicle</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Brand <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="brand"
              value={vehicleData.brand}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
              placeholder="Enter vehicle brand"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Model <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="model"
              value={vehicleData.model}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
              placeholder="Enter vehicle model"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Variant</label>
            <input
              type="text"
              name="variant"
              value={vehicleData.variant}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm border-gray-200"
              placeholder="Enter vehicle variant (optional)"
            />
          </div>

          <div className="flex gap-4 mt-6">
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
