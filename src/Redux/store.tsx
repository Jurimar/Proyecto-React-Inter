import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { dataReducer } from './reducer'
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;