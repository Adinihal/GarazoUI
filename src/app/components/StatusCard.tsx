import React from 'react';
import styles from '../styles/Dashboard.module.css';

const StatusCard = ({ icon, label, count }: { icon: React.ReactNode, label: string, count: number }) => (
  <div className={styles.statusCard}>
    <div className={styles.statusIcon}>{icon}</div>
    <div className={styles.statusLabel}>{label}</div>
    <div className={styles.statusCount}>{count}</div>
  </div>
);
export default StatusCard;