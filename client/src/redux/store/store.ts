import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from '../reducers/registrationSlice';
import authReducer from '../reducers/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer); 

const store = configureStore({
    reducer: {
        registration: registrationReducer,
        auth: persistedAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;