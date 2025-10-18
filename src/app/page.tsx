'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from './dashboard/page';
import styles from './styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return <Dashboard />;
}