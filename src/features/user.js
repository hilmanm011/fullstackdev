import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { username: '', fullname: ''}

const userSlice = createSlice({
    name: 'user',
    initialState: { value: initialStateValue },
    reducers: {
        register: (state, action)=>{
            state.value = action.payload
        },
        login: (state, action)=>{
            state.value = action.payload
        },
        logout: (state)=>{
            state.value = initialStateValue
        }
    }
})

export const { login, register, logout } = userSlice.actions
 
export default userSlice.reducer