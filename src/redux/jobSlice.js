import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'Job',
    initialState: null,
    reducers: {
        addJobs: (state, action) => {
            return action.payload;
        },
        updateJob: (state, action) => {
            const updatedJob = action.payload;
            return state.map(job =>
                job._id === updatedJob._id ? { ...job, ...updatedJob } : job
            );
        },
        removeJob: (state, action) => {
            return state.filter(data => data._id !== action.payload);
        },
    },
});

export const { addJobs, updateJob, removeJob } = jobSlice.actions;
export default jobSlice.reducer;