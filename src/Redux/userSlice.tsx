import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      console.log(response);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Error ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en loginUser:', error);
      if (error instanceof Error) {
        if (error.message === 'Failed to fetch') {
          return rejectWithValue('No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.');
        }
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Ocurrió un error desconocido');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Error ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en registerUser:', error);
      if (error instanceof Error) {
        if (error.message === 'Failed to fetch') {
          return rejectWithValue('No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.');
        }
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Ocurrió un error desconocido');
    }
  }
);


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false; // Limpia el estado de loading al cerrar sesión
      state.error = null; // Limpia cualquier error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Asegúrate de que esto se establece correctamente
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Captura el error
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Guarda el usuario si es necesario
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Captura el error
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;