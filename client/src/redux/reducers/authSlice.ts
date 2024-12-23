import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: any | null;
    loading: Boolean;
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
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
            state.loading = false;
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;