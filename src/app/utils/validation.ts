import { FormData, FormErrors } from '../types/registration';

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateMobile(mobile: string): boolean {
  return /^[6-9]\d{9}$/.test(mobile);
}

export function validateRegistrationForm(form: FormData): FormErrors {
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
