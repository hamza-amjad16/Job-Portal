import { createSlice } from "@reduxjs/toolkit";

const componySlice = createSlice({
        name: "compony",
        initialState: {
            singleCompony: null,
            componies: [],
            searchComponyByText: ""
        },
        reducers: {
            setSingleCompony: (state , action) => {
                state.singleCompony = action.payload
            },
            setCompanies: (state , action) => {
                state.componies = action.payload
            },
            setsearchComponyByText: (state, action) => {
                state.searchComponyByText = action.payload
            }
        }
})

export const {setSingleCompony , setCompanies, setsearchComponyByText} = componySlice.actions
export default componySlice.reducer