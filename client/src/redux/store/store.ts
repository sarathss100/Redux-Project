import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from '../reducers/registrationSlice';
import authReducer from '../reducers/authSlice';

const store = configureStore({
    reducer: {
        registration: registrationReducer,
        auth: authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;