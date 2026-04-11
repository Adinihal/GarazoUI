import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        vehicleList: [],
        vehicleCategories: [],
        customerSources: [],
        mechanicList : [],
        supervisorList: []
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
    }
});

export const { fetchVehicleList, fetchVehicleCategories, fetchCustomerSources, fetchMechanicList, fetchSupervisorList } = dashboardSlice.actions;
export default dashboardSlice.reducer;