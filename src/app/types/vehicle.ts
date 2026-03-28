export interface VehicleCatalog {
  catalogId: number;
  brand: string;
  model: string;
  variant: string;
  vehicles: Vehicle[];
  vehicleId?: string;
  registrationNumber?: string;
}

export interface Vehicle {
  vehicleId: string;
  registrationNumber: string;
  catalogId?: number;
  // Add other vehicle-specific properties as needed
}

// Combined interface for how vehicles are used in the app
export interface VehicleOption {
  catalogId: number;
  model: string;
  vehicleId?: string;
  registrationNumber?: string;
  brand?: string;
  variant?: string;
}