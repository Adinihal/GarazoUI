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
      <Loader />
      <Toast />
      {showHeader && <Header />}
      {children}
    </ReduxProvider>
  );
}
