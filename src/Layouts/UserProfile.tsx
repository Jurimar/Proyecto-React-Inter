import React, { useEffect } from 'react';
import Navbar from '../Layouts/NavBarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/store';
import { enrollInEvents, clearSelectedEvents, updatedSelectedEvents } from '../Redux/eventSlice';
import { fetchUserEvents, updateUserEvents } from '../Redux/userSlice';

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userEvents = useSelector((state: RootState) => state.user.events);
  const selectedEvents = useSelector((state: RootState) => state.events.selectedEvents);
  const userId: string | undefined = useSelector((state: RootState) => state.user.user?.id);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserEvents(parseInt(userId)));
    }
  }, [dispatch, userId]);

  const handleSaveInscriptions = async () => {
    if (userId) {
      const eventIds = selectedEvents.map(event => event.id);
      try {
        await dispatch(enrollInEvents({ userId: parseInt(userId), eventIds }));
        
        const updatedUserEvents = [...userEvents, ...selectedEvents];
        dispatch(updateUserEvents(updatedUserEvents));
        
        dispatch(clearSelectedEvents());
        
        alert('Inscripciones guardadas exitosamente');
      } catch (error) {
        console.error('Error al guardar inscripciones:', error);
        alert('Error al guardar inscripciones. Por favor, intente de nuevo.');
      }
    } else {
      console.error('User ID is undefined');
    }
  };

  const handleRemoveEvent = (eventId: number) => {
    const updatedEvents = selectedEvents.filter(event => event.id !== eventId);
    dispatch(updatedSelectedEvents(updatedEvents));
  };

  if (loading) {
    return (
      <Navbar>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </Navbar>
    );
  }

  if (error) {
    return (
      <Navbar>
        <div className="container mx-auto p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
      </Navbar>
    );
  }

  return (
    <Navbar>
      <div className="container mx-auto p-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-indigo-700">Perfil del Usuario</h2>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Eventos Seleccionados</h3>
          {selectedEvents.length > 0 ? (
            <ul className="space-y-4">
              {selectedEvents.map((event) => (
                <li key={event.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                  <div>
                    <span className="font-medium">{event.name}</span>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveEvent(event.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No hay eventos seleccionados.</p>
          )}
          {selectedEvents.length > 0 && (
            <button
              onClick={handleSaveInscriptions}
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-300"
            >
              Guardar Inscripciones
            </button>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Eventos Inscritos</h3>
          {userEvents.length > 0 ? (
            <ul className="space-y-4">
              {userEvents.map((event) => (
                <li key={event.id} className="bg-gray-50 p-4 rounded-md">
                  <span className="font-medium">{event.name}</span>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <p className="text-xs text-gray-500">{event.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No hay eventos inscritos.</p>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default UserProfile;