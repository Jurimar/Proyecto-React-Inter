// store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../Redux/ReduxReducer';

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;