import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'Job',
    initialState: [],
    reducers: {
        addJobs: (state, actions) => {
            return actions.payload;
        },
        removeJob: (state, action) => {
            return state.filter(data => data._id !==action.payload);
        },
    },
});

export const {addJobs, removeJob} = jobSlice.actions;
export default jobSlice.reducer;