import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    jobApplications: [],
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setJobApplications: (state, action) => {
      state.jobApplications = action.payload;
    },
  },
});

export const { setJobs, setJobApplications } = jobSlice.actions;

export default jobSlice.reducer;
