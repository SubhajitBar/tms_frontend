import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    isAuthenticated: false,
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            // state.user = action.payload.user;
            state.message = action.payload;
        },
        
        loadUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        
    }
})

export const { loginSuccess, loadUserSuccess } = userSlice.actions;
export default userSlice.reducer;