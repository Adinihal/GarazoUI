'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import DashBoardPannel from '../components/DashBoardPannel';

export default function DashboardRoute() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded token:', decodedToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (typeof decodedToken.exp === 'number') {
          console.log('Token expiration time:', decodedToken.exp);
          console.log('Current time:', currentTime);

          if (decodedToken.exp < currentTime) {
            console.log('Token expired');
            // router.push('/login'); // Commented for testing
          }
        } else {
          console.log('Token does not have a valid expiration field.');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        router.push('/login'); // Commented for testing
      }
    } else {
      router.push('/login'); // Commented for testing
    }
  }, [router]);

  return <DashBoardPannel />;
}