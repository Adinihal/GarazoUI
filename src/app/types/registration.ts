export const initialFormData = {
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

// Automatically infer the type directly from the object! No more repeating yourself.
export type FormData = typeof initialFormData;

// Cleaner shorthand for key-value dictionary types
export type FormErrors = Record<string, string>;

export interface Personnel {
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
