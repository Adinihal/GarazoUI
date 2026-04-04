'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '../../styles/Header.module.css';
import {
  FaHome, FaStar, FaCog, FaPowerOff, FaHourglass, FaKey, FaPhoneAlt,  FaBars
} from 'react-icons/fa';
import SidePanelMenu from './SidePanelMenu';


const Header = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();



  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  const handleChangePassword = () => {
    alert('Change password feature coming soon!');
    setShowDropdown(false);
  };

  const handleContactSupport = () => {
    alert('Support: +91 9121223601\nEmail: services@shannon.com');
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.headerWrapper}>
      {/* --- Top bar --- */}
      <div className={styles.topBar}>
        {/* <div className={styles.rightIcons}> */}
          <div className='flex gap-4'>
          <div className="w-1/2"></div>
          <div className="w-1/2 flex justify-end">

          
          <div className="group relative inline-flex items-center justify-center rounded-full transition-colors duration-200 pr-5">
            <FaHourglass className="text-xl cursor-pointer" />
            <span className="absolute top-[140%] left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 after:absolute after:left-1/2 after:bottom-full after:-translate-x-1/2 after:border-4 after:border-transparent after:border-b-gray-800">
              Progress Bar
            </span>
          </div>

            {/* Profile section */}
            <div className={`${styles.profileContainer} pr-5`} ref={dropdownRef}>
              <span
                className={styles.welcome}
                onClick={() => setShowDropdown(!showDropdown)}
                style={{ cursor: 'pointer' }}
              >
                Welcome <strong>Bike_Master <FaPowerOff className={styles.icon}/></strong>
              </span>

              {/* Dropdown */}
              {showDropdown && (
                <div className={styles.dropdownMenu}>
                  <button onClick={handleChangePassword}>
                    <FaKey /> Change Password
                  </button>
                  <button onClick={handleContactSupport}>
                    <FaPhoneAlt /> Contact Support
                  </button>
                  <button onClick={logOut}>
                    <FaPowerOff /> Logout
                  </button>
                </div>
              )}
            </div>
            {/* Profile section */}

              <SidePanelMenu />

            {/* <div className="group relative inline-flex items-center justify-center rounded-full transition-colors duration-200 pr-5">
            <FaBars className='text-xl cursor-pointer'/>
            <span className="absolute top-[140%] left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 after:absolute after:left-1/2 after:bottom-full after:-translate-x-1/2 after:border-4 after:border-transparent after:border-b-gray-800">
              Menu
            </span>
          </div> */}
            
          </div>
          {/* <FaHourglass className={styles.icon} /> */}
          {/* <div className="group relative inline-flex items-center justify-center p-2 rounded-full transition-colors duration-200 hover:bg-[#16cba7]">
            <FaHourglass className="text-xl cursor-pointer" />
            <span className="absolute top-[140%] left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 after:absolute after:left-1/2 after:bottom-full after:-translate-x-1/2 after:border-4 after:border-transparent after:border-b-gray-800">
              Progress Bar
            </span>
          </div>
          <div className="group relative inline-flex items-center justify-center p-2 rounded-full transition-colors duration-200 hover:bg-[#16cba7]">
            <FaHourglass className="text-xl cursor-pointer" />
            <span className="absolute top-[140%] left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 after:absolute after:left-1/2 after:bottom-full after:-translate-x-1/2 after:border-4 after:border-transparent after:border-b-gray-800">
              Subscription Details
            </span>
          </div> */}

          

          {/* <FaPowerOff className={styles.icon} onClick={logOut} /> */}
        </div>
      </div>

      {/* --- Logo & Header --- */}
      <div className={styles.whiteBanner}>
        <div className={styles.header}>
          <div 
            className={styles.leftMenu} 
            onClick={() => router.push('/dashboard')}
            style={{ cursor: 'pointer' }}
            title="Go to Dashboard"
          >
            <div className={styles.logoBox}>
              <img src="assets/GarazoOfficialLogo.png" alt="Logo" className={styles.logo} />
            </div>
            <div className={styles.title}>
              <FaHome /> Bike Masters
            </div>
          </div>

          <div className={styles.broContainer}>
            <div className={styles.broLabel}>BRO Code:</div>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={styles.star} />
              ))}
            </div>
            <div className={styles.settings}>
              <FaCog /> Settings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;