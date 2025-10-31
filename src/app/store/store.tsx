import { createSlice, configureStore } from '@reduxjs/toolkit'
import { applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'

// Define a simple slice    
import dashboardSlice from '../reduxStore/dashboardSlice';

const store = configureStore({
    reducer: {
        dashboard: dashboardSlice,
    },
    // middleware(thunk)
});

type RootState = ReturnType<typeof store.getState>;

export default store;