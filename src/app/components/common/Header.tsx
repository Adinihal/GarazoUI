// components/Header.tsx
import React from 'react';
import styles from '../../styles/Header.module.css';
import { FaHome, FaStar, FaCog, FaBars, FaClock } from 'react-icons/fa';

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.topBar}>
        <div className={styles.rightIcons}>
          <FaBars className={styles.icon} />
          <FaClock className={styles.icon} />
          <span className={styles.welcome}>Welcome <strong>OM PRAKASH</strong></span>
        </div>
      </div>

      <div className={styles.whiteBanner}>
        <div className={styles.header}>
          <div className={styles.leftMenu}>
            <div className={styles.logoBox}>
              <img src="assets/bike_master_logo.jpg" alt="Logo" className={styles.logo} />
            </div>
            <div className={styles.title}><FaHome /> Bike Masters</div>
          </div>

          <div className={styles.broContainer}>
            <div className={styles.broLabel}>BRO Code:</div>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => <FaStar key={i} className={styles.star} />)}
            </div>
            <div className={styles.settings}>
              <FaCog /> Settings
            </div>
          </div>
        </div>
      </div>

      <div className={styles.menuBar}>
        <span className={styles.menuItem}>NEW CUSTOMER REGISTRATION</span>
        <span className={styles.menuItem}>OFFERS AND PROMOTIONS</span>
        <span className={styles.menuItem}>SHORTCUTS</span>
      </div>
    </div>
  );
};

export default Header;
