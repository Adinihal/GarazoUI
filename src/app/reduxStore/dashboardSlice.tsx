import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/apiConfig";

export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchDashboardData',
    async () => {
        const response = await axios.get(`${BASE_URL}/Dashboard`);
        const apiData = response.data;
        
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
        
        apiData.forEach((item: any) => {
            const mapped = statusMap[item.jobStatus as keyof typeof statusMap] || 'underServicing';
            if (statusCounts[mapped as keyof typeof statusCounts] !== undefined) {
                statusCounts[mapped as keyof typeof statusCounts]++;
            }
        });

        const services = apiData.map((item: any) => ({
            id: String(item.jobCardNo),
            status: item.jobStatus,
            vehicle: {
                model: item.vehicleName || '',
                regNo: item.vehicleRegNo || '',
                type: item.vehicleCategory || '',
                kms: item.kmDriven || 0,
            },
            location: item.customerAddress || '',
            customer: {
                name: item.customerName || '',
                phone: item.phoneNumber || '',
                email: item.customerEmail || '',
                rating: 0,
                advisor: item.sourceContactPerson || '',
                source: item.customerSource || '',
                address: item.customerAddress || '',
            },
            serviceDetails: {
                jcNo: String(item.jobCardNo),
                estimate: item.invoiceTotal || 0,
                invoiceNo: item.invoiceId ? String(item.invoiceId) : '',
                paid: item.netAmount || 0,
                due: (item.invoiceTotal || 0) - (item.netAmount || 0),
                type: item.vehicleCategory || '',
                doa: item.dateOfArrival || '',
                dod: item.dateOfDelivery || '',
                progress: 0,
                assignedTechnician: [item.technicianFirstName, item.technicianLastName].filter(Boolean).join(' '),
                supervisor: [item.supervisorFirstName, item.supervisorLastName].filter(Boolean).join(' '),
            },
        }));

        return { services, statusCounts };
    }
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        vehicleList: [],
        vehicleCategories: [],
        customerSources: [],
        mechanicList: [],
        supervisorList: [],
        dashboardData: null as any,
        loadingDashboard: false,
    },
    reducers: {
        fetchVehicleList(state, action) {
            state.vehicleList = action.payload;
        },
        fetchVehicleCategories(state, action) {
            state.vehicleCategories = action.payload;
        },
        fetchCustomerSources(state, action) {
            state.customerSources = action.payload;
        },
        fetchMechanicList(state, action) {
            state.mechanicList = action.payload;
        },
        fetchSupervisorList(state, action) {
            state.supervisorList = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.loadingDashboard = true;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.loadingDashboard = false;
                state.dashboardData = action.payload;
            })
            .addCase(fetchDashboardData.rejected, (state) => {
                state.loadingDashboard = false;
            });
    }
});

export const { fetchVehicleList, fetchVehicleCategories, fetchCustomerSources, fetchMechanicList, fetchSupervisorList } = dashboardSlice.actions;
export default dashboardSlice.reducer;