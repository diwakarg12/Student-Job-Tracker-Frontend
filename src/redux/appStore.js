import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import jobReducer from './jobSlice';

export const appStore = configureStore({
    reducer: {
        auth: authReducer,
        job: jobReducer
    },
});

export default appStore;