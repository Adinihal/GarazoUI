import { configureStore } from '@reduxjs/toolkit'

// Define a simple slice    
import dashboardSlice from '../reduxStore/dashboardSlice';

const store = configureStore({
    reducer: {
        dashboard: dashboardSlice,
    },
    // middleware(thunk)
});

export default store;