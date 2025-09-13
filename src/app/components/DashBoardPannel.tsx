import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Dashboard.module.css';
import { FaTruck, FaMoneyBill, FaCheckCircle, FaWrench, FaCalendarDay, FaClock } from 'react-icons/fa';
import DetailCard from './DetailCard';
import StatusCard from './StatusCard';
import Header from './common/Header';

interface Customer {
  name: string;
  phone: string;
  rating: number;
  advisor: string;
  source: string;
}

interface ServiceData {
  underServicing: number;
  nextDayDelivery: number;
  upcomingDelivery: number;
  readyForDelivery: number;
  paymentProcessing: number;
  completedService: number;
  vehicle: string;
  location: string;
  customer: Customer;
  jcNo: string;
  estimate: number;
  invoiceNo: string;
  paid: number;
  due: number;
  doa: string;
  dod: string;
  progress: number;
  kms: number;
  type: string;
}

export default function Home() {
  const [data, setData] = useState<ServiceData[]>([]);

  useEffect(() => {
    axios.get('/assets/service-data.json') // update path as needed
      .then(response => setData(response.data.services))
      .catch(err => console.error(err));
  }, []);

  if (!data.length) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      <Header />
      <div className={styles.container}>
        {data.map((item, index) => (
          <div key={index}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Service Queue</h2>
              <div className={styles.statusGrid}>
                <StatusCard icon={<FaWrench />} label="Under Servicing" count={item.underServicing} />
                <StatusCard icon={<FaCalendarDay />} label="Next Day Delivery" count={item.nextDayDelivery} />
                <StatusCard icon={<FaClock />} label="Upcoming Delivery" count={item.upcomingDelivery} />
                <StatusCard icon={<FaTruck />} label="Ready for Delivery" count={item.readyForDelivery} />
                <StatusCard icon={<FaMoneyBill />} label="Payment Processing" count={item.paymentProcessing} />
                <StatusCard icon={<FaCheckCircle />} label="Completed Service" count={item.completedService} />
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.detailHeader}>
                <div>
                  <h3 className={styles.vehicleTitle}>{item.vehicle}</h3>
                  <p className={styles.vehicleSubtitle}>{item.location}</p>
                </div>
                <div className={styles.vehicleInfo}>
                  KMS: {item.kms} | Type: {item.type}
                </div>
              </div>

              <div className={styles.detailGrid}>
                <DetailCard title="Customer Name" value={item.customer?.name} />
                <DetailCard title="Phone Number" value={item.customer?.phone} />
                <DetailCard title="Advisor Name" value={item.customer?.advisor} />
                <DetailCard title="Customer Source" value={item.customer?.source} />
                <DetailCard title="JC No" value={item.jcNo} />
                <DetailCard title="Estimate" value={`₹${item.estimate}`} />
                <DetailCard title="Invoice No" value={item.invoiceNo} />
                <DetailCard title="Paid" value={`₹${item.paid}`} />
                <DetailCard title="Due" value={`₹${item.due}`} />
                <DetailCard title="DOA" value={item.doa} />
                <DetailCard title="DOD" value={item.dod} />
                <DetailCard title="Progress" value={`${item.progress}%`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
