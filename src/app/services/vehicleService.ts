import axios from 'axios';
import { VehicleCatalog } from '../types/vehicle';

const API_BASE_URL = 'https://leommservice-bzh5bxgxcnhjbpfq.canadacentral-01.azurewebsites.net/api';

export const vehicleService = {
  /**
   * Fetches vehicle catalog data from the API
   * @returns Promise<VehicleCatalog[]>
   */
  fetchVehicleCatalog: async (): Promise<VehicleCatalog[]> => {
    try {
      const response = await axios.get<VehicleCatalog[]>(`${API_BASE_URL}/VehicleCatalog`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle catalog:', error);
      throw error;
    }
  },

  /**
   * Fetches vehicle categories from the API
   * @returns Promise<any[]>
   */
  fetchVehicleCategories: async (): Promise<any[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/VehicleCategory`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle categories:', error);
      throw error;
    }
  },

  /**
   * Fetches customer sources from the API
   * @returns Promise<any[]>
   */
  fetchCustomerSources: async (): Promise<any[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/CustomerSource`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer sources:', error);
      throw error;
    }
  },

  /**
   * Fetches mechanics list from the API
   * @returns Promise<any[]>
   */
  fetchMechanics: async (): Promise<any[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Mechanic`);
      return response.data;
    } catch (error) {
      console.error('Error fetching mechanics:', error);
      throw error;
    }
  }
};