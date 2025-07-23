import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    alljobs: [],
    allAdminJobs: [],
    filteredJobs: [],
    singleJob: null,
    searchTextByJob: "",
    allAppliedJobs: [],
    searchedQuery: "",

  },
  reducers: {
    setAllJobs: (state, action) => {
      state.alljobs = action.payload;
       state.filteredJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchTextByJob: (state, action) => {
      state.searchTextByJob = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload

       state.filteredJobs = state.alljobs.filter((job) =>
        job.title.toLowerCase().includes(action.payload.toLowerCase()) 
      );
    },

      
    clearSearchQuery: (state) => {
      state.searchedQuery = "";
      state.filteredJobs = state.alljobs;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchTextByJob,
  setAllAppliedJobs,
  setSearchedQuery,
  clearSearchQuery
} = jobSlice.actions;
export default jobSlice.reducer;
