import { createSlice } from '@reduxjs/toolkit';

interface User {
    id: string,
    role: string
}
interface AuthState {
    regUser: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    loading: false,
    regUser: null,
    error: null
}

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        registrationRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        registrationSuccess: (state, action) => {
            state.loading = false;
            state.regUser = action.payload
            state.error = null;
        },
        registrationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { registrationRequest, registrationSuccess, registrationFailure } = registrationSlice.actions;
export default registrationSlice.reducer;