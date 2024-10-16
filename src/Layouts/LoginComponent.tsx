import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/ReduxStore'; // Asegúrate de que la ruta sea correcta
import { setUserData, registerUser } from '../Redux/ReduxActions'; // Asegúrate de que la ruta sea correcta

interface UserData {
  username: string;
  password: string;
  email: string;
}

const LoginComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { username, password, email, message } = useSelector((state: RootState) => state);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setUserData({ [name]: value } as Partial<UserData>));
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser({ username, password, email }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <img 
              src="/Icons/LoginComponent-user.png" 
              alt="Coopeguanacaste Logo" 
              className="w-30 h-15 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-center">Inicio de sesion Coopeguanacaste, R.L.</h2>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <input 
                type="text" 
                name="username"
                placeholder="USUARIO" 
                className="w-full pl-10 pr-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                value={username}
                onChange={handleInputChange}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="relative">
              <input 
                type="password" 
                name="password"
                placeholder="CONTRASEÑA" 
                className="w-full pl-10 pr-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                value={password}
                onChange={handleInputChange}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="relative">
              <input 
                type="email" 
                name="email"
                placeholder="EMAIL" 
                className="w-full pl-10 pr-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                value={email}
                onChange={handleInputChange}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            
            <button 
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
            >
              Opciones de usuario
            </button>
            <button 
              type="button"
              className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
            >
              Iniciar sesión
            </button>
          </form>
          
          {message && (
            <div className="mt-4 text-center text-green-600">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;