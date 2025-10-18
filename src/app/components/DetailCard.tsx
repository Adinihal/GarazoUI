import React from 'react';
import styles from '../styles/Dashboard.module.css';
const DetailCard = ({ title, value }: { title: string, value: string | number }) => (
  <div className={styles.detailCard}>
    <div className={styles.detailTitle}>{title}</div>
    <div className={styles.detailValue}>{value}</div>
  </div>
);
export default DetailCard;