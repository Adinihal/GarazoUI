'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/MenuBar.module.css';

const MenuBar = () => {
  const router = useRouter();

  return (
    <div className={styles.menuBar}>
      <span
        role="button"
        tabIndex={0}
        className={styles.menuItem}
        onClick={() => router.push('/registration')}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/registration'); }}
      >
        NEW CUSTOMER REGISTRATION
      </span>
      <span className={styles.menuItem}>OFFERS AND PROMOTIONS</span>
      <span className={styles.menuItem}>SHORTCUTS</span>
    </div>
  );
};

export default MenuBar;
