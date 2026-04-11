import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Dashboard.module.css';
import { FaTruck, FaMoneyBill, FaCheckCircle, FaWrench, FaCalendarDay, FaClock } from 'react-icons/fa';
import StatusCard from './StatusCard';
import MenuBar from './common/MenuBar';
import ServiceDetailsModal from './ServiceDetailsModal';
import { fetchVehicleList, fetchVehicleCategories, fetchCustomerSources, fetchMechanicList } from '../reduxStore/dashboardSlice';
import { useDispatch } from "react-redux";
import JobCard from './ui/Jobcard/JobCard';
import { vehicleService } from '../services/vehicleService';

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
  const dispatch = useDispatch();
  const [data, setData] = useState<ServiceData | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [filteredServices, setFilteredServices] = useState<ServiceTableData[]>([]);

  // Use a ref to track if the component is mounted
  const isMounted = React.useRef(false);

  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      axios.get('https://leommservice-bzh5bxgxcnhjbpfq.canadacentral-01.azurewebsites.net/api/Dashboard')
        .then(response => {
          if (isMounted.current) {
            // Transform API response to ServiceData structure
            const apiData = response.data;
            // Map jobStatus to dashboard status counts
            const statusMap = {
              'Under Service': 'underServicing',
              'Next Day Delivery': 'nextDayDelivery',
              'Upcoming': 'upcomingDelivery',
              'Ready': 'readyForDelivery',
              'Payment': 'paymentProcessing',
              'Completed': 'completedService',
              'Open': 'underServicing',
              'In Progress': 'underServicing',
            };
            const statusCounts = {
              underServicing: 0,
              nextDayDelivery: 0,
              upcomingDelivery: 0,
              readyForDelivery: 0,
              paymentProcessing: 0,
              completedService: 0,
            };
            // Count statuses
            apiData.forEach((item: Record<string, unknown>) => {
              const mapped = statusMap[(item.jobStatus as keyof typeof statusMap)] || 'underServicing';
              if (statusCounts[mapped as keyof typeof statusCounts] !== undefined) statusCounts[mapped as keyof typeof statusCounts]++;
            });
            // Map API data to Service[]
            const services = apiData.map((item: Record<string, unknown>) => ({
              id: String(item.jobCardNo),
              status: item.jobStatus,
              vehicle: {
                model: (item.vehicleName || '') as string,
                regNo: (item.vehicleRegNo || '') as string,
                type: (item.vehicleCategory || '') as string,
                kms: (item.kmDriven || 0) as number,
              },
              location: (item.customerAddress || '') as string,
              customer: {
                name: (item.customerName || '') as string,
                phone: (item.phoneNumber || '') as string,
                email: (item.customerEmail || '') as string,
                rating: 0,
                advisor: (item.sourceContactPerson || '') as string,
                source: (item.customerSource || '') as string,
                address: (item.customerAddress || '') as string,
              },
              serviceDetails: {
                jcNo: String(item.jobCardNo),
                estimate: (item.invoiceTotal || 0) as number,
                invoiceNo: item.invoiceId ? String(item.invoiceId) : '',
                paid: (item.netAmount || 0) as number,
                due: ((item.invoiceTotal || 0) as number) - ((item.netAmount || 0) as number),
                type: (item.vehicleCategory || '') as string,
                doa: (item.dateOfArrival || '') as string,
                dod: (item.dateOfDelivery || '') as string,
                progress: 0,
                assignedTechnician: [item.technicianFirstName, item.technicianLastName].filter(Boolean).join(' '),
                supervisor: [item.supervisorFirstName, item.supervisorLastName].filter(Boolean).join(' '),
              },
            }));
            setData({ services, statusCounts });
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const [vehicleCatalog, vehicleCategories, customerSources, mechanics] = await Promise.all([
          vehicleService.fetchVehicleCatalog(),
          vehicleService.fetchVehicleCategories(),
          vehicleService.fetchCustomerSources(),
          vehicleService.fetchMechanics()
        ]);

        dispatch(fetchVehicleList(vehicleCatalog));
        dispatch(fetchVehicleCategories(vehicleCategories));
        dispatch(fetchCustomerSources(customerSources));
        dispatch(fetchMechanicList(mechanics));
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    loadData();
  }, [dispatch]);

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
    setShowServiceModal(true);
  };

  if (!data) return <div className="text-center mt-10">Loading...</div>;

  const { services, statusCounts } = data;

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }


  return (
    <>
      <div className={styles.container}>
        <MenuBar />
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

        {/* {services.map((service) => (
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
        ))} */}
        {services.map((service) => (
          <JobCard key={service.id} service={service} />
        ))}
      </div>
    </>
  );
}
