import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Dashboard.module.css';
import { FaTruck, FaMoneyBill, FaCheckCircle, FaWrench, FaCalendarDay, FaClock } from 'react-icons/fa';
import DetailCard from './DetailCard';
import StatusCard from './StatusCard';
import Header from './common/Header';
import ServiceDetailsModal from './ServiceDetailsModal';

interface Customer {
  name: string;
  phone: string;
  email: string;
  rating: number;
  advisor: string;
  source: string;
  address: string;
}

interface Vehicle {
  model: string;
  regNo: string;
  type: string;
  kms: number;
}

interface ServiceDetails {
  jcNo: string;
  estimate: number;
  invoiceNo: string;
  paid: number;
  due: number;
  type: string;
  doa: string;
  dod: string;
  progress: number;
  assignedTechnician: string;
  supervisor: string;
}

interface Service {
  id: string;
  status: string;
  vehicle: Vehicle;
  location: string;
  customer: Customer;
  serviceDetails: ServiceDetails;
}

interface ServiceData {
  services: Service[];
  statusCounts: {
    underServicing: number;
    nextDayDelivery: number;
    upcomingDelivery: number;
    readyForDelivery: number;
    paymentProcessing: number;
    completedService: number;
  };
}

type StatusType = 'Under Service' | 'Next Day Delivery' | 'Upcoming' | 'Ready' | 'Payment' | 'Completed';

interface ServiceTableData {
  id: string;
  arrivalDate: string;
  customerName: string;
  vehicleNo: string;
  vehicleName: string;
  supervisorName: string;
  technicianName: string;
  status: StatusType;
  invoiceNo: string;
  insurance: string;
  totalAmount: string;
  deliveryDate: string;
}

export default function Home() {
  const [data, setData] = useState<ServiceData | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusType | ''>('');
  const [filteredServices, setFilteredServices] = useState<ServiceTableData[]>([]);
  
  // Use a ref to track if the component is mounted
  const isMounted = React.useRef(false);

  useEffect(() => {
    isMounted.current = true;
    // Only fetch data if we're mounted
    if (isMounted.current) {
      axios.get('/assets/service-data.json')
        .then(response => {
          if (isMounted.current) {
            setData(response.data);
          }
        })
        .catch(err => console.error(err));
    }
    
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    axios.get('/assets/service-data.json')
      .then(response => setData(response.data))
      .catch(err => console.error(err));
  }, []);

  // Helper function to format dates consistently
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    } catch {
      return dateStr;
    }
  };

  const handleStatusClick = (status: StatusType) => {
    // Transform the services data to match the table format
    const tableData = data?.services
      .filter(service => service.status.toLowerCase() === status.toLowerCase())
      .map(service => ({
        id: service.serviceDetails.jcNo,
        arrivalDate: formatDate(service.serviceDetails.doa),
        customerName: service.customer.name,
        vehicleNo: service.vehicle.regNo,
        vehicleName: service.vehicle.model,
        supervisorName: service.serviceDetails.supervisor,
        technicianName: service.serviceDetails.assignedTechnician,
        status: status as StatusType,
        invoiceNo: service.serviceDetails.invoiceNo || '',
        insurance: "No",
        totalAmount: service.serviceDetails.estimate.toString(),
        deliveryDate: formatDate(service.serviceDetails.dod)
      })) || [];

    setFilteredServices(tableData);
    setSelectedStatus(status);
    setShowServiceModal(true);
  };

  if (!data) return <div className="text-center mt-10">Loading...</div>;

  const { services, statusCounts } = data;

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Service Queue</h2>
          <div className={styles.statusGrid}>
            <div onClick={() => handleStatusClick("Under Service" as StatusType)} className="cursor-pointer">
              <StatusCard icon={<FaWrench />} label="Under Servicing" count={statusCounts.underServicing} />
            </div>
            <div onClick={() => handleStatusClick("Next Day Delivery" as StatusType)} className="cursor-pointer">
              <StatusCard icon={<FaCalendarDay />} label="Next Day Delivery" count={statusCounts.nextDayDelivery} />
            </div>
            <div onClick={() => handleStatusClick("Upcoming" as StatusType)} className="cursor-pointer">
              <StatusCard icon={<FaClock />} label="Upcoming Delivery" count={statusCounts.upcomingDelivery} />
            </div>
            <div onClick={() => handleStatusClick("Ready" as StatusType)} className="cursor-pointer">
              <StatusCard icon={<FaTruck />} label="Ready for Delivery" count={statusCounts.readyForDelivery} />
            </div>
            <div onClick={() => handleStatusClick("Payment" as StatusType)} className="cursor-pointer">
              <StatusCard icon={<FaMoneyBill />} label="Payment Processing" count={statusCounts.paymentProcessing} />
            </div>
            <div onClick={() => handleStatusClick("Completed" as StatusType)} className="cursor-pointer">
              <StatusCard icon={<FaCheckCircle />} label="Completed Service" count={statusCounts.completedService} />
            </div>
          </div>
        </div>

        {/* Service Details Modal */}
        {showServiceModal && (
          <ServiceDetailsModal
            services={filteredServices}
            onClose={() => setShowServiceModal(false)}
          />
        )}

        {services.map((service) => (
          <div key={service.id} className={styles.section}>
            <div className={styles.detailHeader}>
              <div>
                <h3 className={styles.vehicleTitle}>{service.vehicle.model}</h3>
                <p className={styles.vehicleSubtitle}>{service.location}</p>
              </div>
              <div className={styles.vehicleInfo}>
                KMS: {service.vehicle.kms} | Type: {service.vehicle.type}
              </div>
            </div>

            <div className={styles.detailGrid}>
              <DetailCard title="Customer Name" value={service.customer.name} />
              <DetailCard title="Phone Number" value={service.customer.phone} />
              <DetailCard title="Advisor Name" value={service.customer.advisor} />
              <DetailCard title="Customer Source" value={service.customer.source} />
              <DetailCard title="JC No" value={service.serviceDetails.jcNo} />
              <DetailCard title="Estimate" value={`₹${service.serviceDetails.estimate}`} />
              <DetailCard title="Invoice No" value={service.serviceDetails.invoiceNo} />
              <DetailCard title="Paid" value={`₹${service.serviceDetails.paid}`} />
              <DetailCard title="Due" value={`₹${service.serviceDetails.due}`} />
              <DetailCard title="DOA" value={service.serviceDetails.doa} />
              <DetailCard title="DOD" value={service.serviceDetails.dod} />
              <DetailCard title="Progress" value={`${service.serviceDetails.progress}%`} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
