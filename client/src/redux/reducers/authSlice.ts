import { createSlice } from "@reduxjs/toolkit";

interface User {
    id: string,
    role: string
}
interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.user = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
            state.loading = false;
        }
    }
});

export const { loginSuccess, loginFailure, loginRequest, logout, clearError } = authSlice.actions;
export default authSlice.reducer;