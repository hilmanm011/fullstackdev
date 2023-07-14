import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { description: '', location: '' , fulltime: false }

const jobSlice = createSlice({
    name: 'job',
    initialState: { value: initialStateValue },
    reducers: {
        searchQuery: (state, action)=>{
            state.value = action.payload
        },
    }
})

export const { searchQuery } = jobSlice.actions
 
export default jobSlice.reducer