import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        alljobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchTextByJob: ""

    },
    reducers: {
        setAllJobs: (state , action) => {
            state.alljobs = action.payload
        }, 
        setSingleJob: (state , action) => {
            state.singleJob = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setSearchTextByJob: (state, action) => {
            state.searchTextByJob = action.payload
        }
    }
})

export const {setAllJobs , setSingleJob, setAllAdminJobs, setSearchTextByJob} = jobSlice.actions
export default jobSlice.reducer