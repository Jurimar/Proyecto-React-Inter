import { useState,useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/store';
import { logout } from '../Redux/userSlice';



interface LayoutProps {
  children: ReactNode;
}

const Navbar = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isAuthenticated = useSelector((state:RootState) => state.user.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
  
    dispatch(logout());
    
    navigate('/login');
  };


  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white text-lg font-bold">EventApp</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/inicio" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Inicio</Link>
                  <Link to="/registrar-evento" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Registrar Evento</Link>
                  <Link to="/eventos" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Lista de Eventos</Link>
                  {isAuthenticated && (
                    <>
                      <Link to="/perfil" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Perfil de Usuario</Link>
                      <div className="relative">
                        <button
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="block w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none focus:border-white"
                        >
                          <img src="https://via.placeholder.com/150" alt="User Avatar" className="w-full h-full object-cover" />
                        </button>
                        {dropdownOpen && (
                          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                            <Link to="/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Logout
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/inicio" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Inicio</Link>
              <Link to="/eventos" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Lista de Eventos</Link>
              <Link to="/evento" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Detalle de Evento</Link>
              {isAuthenticated && (
                <>
                  <Link to="/perfil" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Perfil de Usuario</Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      {children}
    </div>
  );
};

export default Navbar;