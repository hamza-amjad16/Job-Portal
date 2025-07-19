import { createSlice } from "@reduxjs/toolkit";

const componySlice = createSlice({
        name: "compony",
        initialState: {
            singleCompony: null
        },
        reducers: {
            setSingleCompony: (state , action) => {
                state.singleCompony = action.payload
            }
        }
})

export const {singleCompony} = componySlice.actions
export default componySlice.reducer