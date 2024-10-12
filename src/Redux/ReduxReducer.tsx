// reducer.ts
import { createReducer } from '@reduxjs/toolkit';
import { setUserData, registerUser } from '../Redux/ReduxActions';
import { UserData } from '../Redux/ReduxActions';

interface State extends UserData {
  message: string;
}

const initialState: State = {
  username: '',
  password: '',
  email: '',
  message: ''
};

const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUserData, (state, action) => {
      return { ...state, ...action.payload };
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.message = action.payload;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.message = action.payload as string;
    });
});

export default rootReducer;