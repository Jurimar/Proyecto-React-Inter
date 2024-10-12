// actions.ts
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const setUserData = createAction<Partial<UserData>>('SET_USER_DATA');

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data.message;
    } catch (error) {
      return rejectWithValue('Error al registrar usuario'+error);
    }
  }
);

export interface UserData {
  username: string;
  password: string;
  email: string;
}