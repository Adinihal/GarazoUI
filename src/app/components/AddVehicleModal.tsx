'use client';

import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader, showToast } from '../reduxStore/appSlice';
import { vehicleService } from '../services/vehicleService';
import styles from '../styles/Modal.module.css';
import InputField from './common/InputField';
import { Button } from './ui/Button';

interface AddVehicleModalProps {
  onClose: () => void;
  // onSave: (vehicleData: { brand: string; model: string; variant: string; catalogId?: number }) => void;
}

export default function AddVehicleModal({ onClose }: AddVehicleModalProps) {
  const dispatch = useDispatch();
  const [vehicleData, setVehicleData] = useState({
    brand: '',
    model: '',
    variant: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(showLoader('Saving vehicle...'));
    try {
      const response = await vehicleService.createVehicleCatalog(vehicleData);
      dispatch(hideLoader());
      dispatch(showToast({ message: "Vehicle added successfully!", type: "success" }));
      // onSave({ ...vehicleData, catalogId: response?.catalogId });
      onClose();
    } catch (error) {
      console.error(error);
      dispatch(hideLoader());
      dispatch(showToast({ message: "Failed to add vehicle.", type: "error" }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVehicleData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} style={{ maxWidth: '400px' }} onClick={e => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>
        <h2 className={styles.modalHeader}>Add New Vehicle</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            name="brand"
            label="Vehicle Brand"
            value={vehicleData.brand}
            onChange={handleChange}
            requiredIndicator
            placeholder="Enter vehicle brand"
          />

          <InputField
            name="model"
            label="Vehicle Model"
            value={vehicleData.model}
            onChange={handleChange}
            requiredIndicator
            placeholder="Enter vehicle model"
          />

          <InputField
            name="variant"
            label="Vehicle Variant"
            value={vehicleData.variant}
            onChange={handleChange}
            placeholder="Enter vehicle variant (optional)"
          />

          <div className="flex justify-end gap-4 mt-6">
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
