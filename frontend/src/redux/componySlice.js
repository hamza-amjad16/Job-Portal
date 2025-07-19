import { createSlice } from "@reduxjs/toolkit";

const componySlice = createSlice({
        name: "compony",
        initialState: {
            singleCompony: null,
            componies: []
        },
        reducers: {
            setSingleCompony: (state , action) => {
                state.singleCompony = action.payload
            },
            setCompanies: (state , action) => {
                state.componies = action.payload
            }
        }
})

export const {setSingleCompony , setCompanies} = componySlice.actions
export default componySlice.reducer