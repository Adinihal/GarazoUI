import { configureStore } from '@reduxjs/toolkit'

// Define a simple slice    
import dashboardSlice from '../reduxStore/dashboardSlice';
import appSlice from '../reduxStore/appSlice';

const store = configureStore({
    reducer: {
        dashboard: dashboardSlice,
        app: appSlice,
    },
    // middleware(thunk)
});

export default store;