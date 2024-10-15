import { AppDispatch } from '../Redux/store';
import { loginRequest, loginSuccess, loginFailure } from '../Redux/authSlice';

export const login = ({ username, password }: { username: string; password: string })=> async (dispatch: AppDispatch) => {
  dispatch(loginRequest());
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(loginSuccess(data));
    } else {
      dispatch(loginFailure(data.message));
    }
  } catch {
    dispatch(loginFailure('Error de red'));
  }
};