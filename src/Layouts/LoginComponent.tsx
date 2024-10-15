import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../Redux/userSlice';
import {login} from '../Actions/authActions';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../Redux/store';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const LoginComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading,error: authError,user} = useSelector((state: RootState) => state.user);
  const authState = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (authState.user) {
      navigate('/events'); 
    }
  }, [authState.user, navigate]);

  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   try {
  //     console.log('Enviando datos de inicio de sesión:', formData);
  //     if (isLogin) {
  //      await dispatch(login({ username: formData.username, password: formData.password }));
    


  //       if (authState.user) {
  //         console.log('Logeo exitoso');
  //         navigate('/events');
  //       } else {
  //         // Si la acción falla, muestra el error
  //         throw new Error('Error al iniciar sesión');
  //       }
  //     } else {
  //       if (formData.password !== formData.confirmPassword) {
  //         throw new Error('Las contraseñas no coinciden');
  //       }
  //       await dispatch(registerUser(formData));
  //     }
  //   } catch (err: any) {
  //     setError(err.message || 'Error inesperado');
  //     console.error(err);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      console.log('Enviando datos de inicio de sesión:', formData);
      if (isLogin) {
        await dispatch(login({ username: formData.username, password: formData.password }));

        if (user) {
          console.log('Logeo exitoso');
          navigate('/events');
        } else {
          throw new Error(authError || 'Error al iniciar sesión');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Las contraseñas no coinciden');
        }
        await dispatch(registerUser(formData));
      }
    } catch (err: any) {
      setError(err.message || 'Error inesperado');
      console.error(err);
    }
  };



  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
     <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {authError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{authError}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-required="true"
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                aria-required="true"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-required="true"
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                aria-required="true"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
          </button>
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="mt-4 text-blue-500 hover:text-blue-600 focus:outline-none">
            {isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
