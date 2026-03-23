import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isLoader: false,
        loaderMessage: "Loading, please wait...",
        toast: null, // { message: string, type: 'success' | 'error' }
    },
    reducers: {
        showLoader(state, action) {
            state.isLoader = true;
            state.loaderMessage = action.payload || "Loading, please wait...";
        },
        hideLoader(state) {
            state.isLoader = false;
            state.loaderMessage = "";
        },
        showToast(state, action) {
            state.toast = action.payload; // expects object like { message: "Saved!", type: "success" }
        },
        hideToast(state) {
            state.toast = null;
        }
    }
});

export const { showLoader, hideLoader, showToast, hideToast } = appSlice.actions;
export default appSlice.reducer;
