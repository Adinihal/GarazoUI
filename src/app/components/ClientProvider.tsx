'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ReduxProvider from '../reduxProvider';
import Header from './common/Header';
import Loader from './common/Loader';
import Toast from './common/Toast';

interface ClientProviderProps {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR and initial hydration, render a simple div to avoid layout shifts
  if (!isClient) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  const showHeader = pathname !== '/login';

  return (
    <ReduxProvider>
      <GlobalDataLoader showHeader={showHeader} />
      <Loader />
      <Toast />
      {showHeader && <Header />}
      {children}
    </ReduxProvider>
  );
}

import { useDispatch } from 'react-redux';
import { 
  fetchDashboardData, 
  fetchVehicleList, 
  fetchVehicleCategories, 
  fetchCustomerSources, 
  fetchMechanicList 
} from '../reduxStore/dashboardSlice';
import { vehicleService } from '../services/vehicleService';

function GlobalDataLoader({ showHeader }: { showHeader: boolean }) {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (showHeader) {
      dispatch(fetchDashboardData());
      
      const loadMasterData = async () => {
        try {
          const [vehicleCatalog, vehicleCategories, customerSources, mechanics] = await Promise.all([
            vehicleService.fetchVehicleCatalog(),
            vehicleService.fetchVehicleCategories(),
            vehicleService.fetchCustomerSources(),
            vehicleService.fetchMechanics()
          ]);

          dispatch(fetchVehicleList(vehicleCatalog));
          dispatch(fetchVehicleCategories(vehicleCategories));
          dispatch(fetchCustomerSources(customerSources));
          dispatch(fetchMechanicList(mechanics));
        } catch (err) {
          console.error('Error loading master data:', err);
        }
      };

      loadMasterData();
    }
  }, [showHeader, dispatch]);

  return null;
}
