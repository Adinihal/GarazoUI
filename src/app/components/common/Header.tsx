'use client';
import React, { useState } from 'react';
import styles from '../../styles/Header.module.css';
import modalStyles from '../../styles/Modal.module.css';
import { FaHome, FaStar, FaCog, FaBars, FaClock, FaTimes, FaSignOutAlt, FaPowerOff, FaHourglass  } from 'react-icons/fa';
import CustomerRegistrationForm from '@/app/registration/page';


interface HeaderProps {
      onCloseRegistrationModal: () => void;
      // Other props
}

const Header = (onCloseRegistrationModal: HeaderProps) => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleRegistrationClick = () => {
    setShowRegistrationModal(true);
  };

  const handleCloseModal = () => {
    setShowRegistrationModal(false);
  };

  const logOut = () => {
    // Remove auth data in logout
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tokenExpiry');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
  }

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.topBar}>
        <div className={styles.rightIcons}>
          <FaHourglass className={styles.icon}/>
          {/* <FaBars className={styles.icon} />
          <FaClock className={styles.icon} /> */}
          <span className={styles.welcome}>Welcome <strong>OM PRAKASH</strong></span>
          <FaPowerOff className={styles.icon} onClick={logOut}/>
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
        <span className={styles.menuItem} onClick={handleRegistrationClick}>
          NEW CUSTOMER REGISTRATION
        </span>
        <span className={styles.menuItem}>OFFERS AND PROMOTIONS</span>
        <span className={styles.menuItem}>SHORTCUTS</span>
      </div>

      {showRegistrationModal && (
        <div className={modalStyles.modalOverlay} onClick={handleCloseModal}>
          <div className={modalStyles.modalContent} onClick={e => e.stopPropagation()}>
            <button 
              className={modalStyles.closeButton}
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            <h2 className={modalStyles.modalHeader}>New Customer Registration</h2>
            <CustomerRegistrationForm onCloseRegistrationModal={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};


export default Header;
