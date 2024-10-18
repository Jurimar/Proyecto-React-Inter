// src/Layouts/UserProfile.tsx
import React, { useEffect } from 'react';
import Navbar from '../Layouts/NavBarComponent'; // Adjust the path as necessary
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/store';
import { enrollInEvents, clearSelectedEvents,updatedSelectedEvents } from '../Redux/eventSlice';
import { fetchUserEvents } from '../Redux/userSlice';

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
      await dispatch(enrollInEvents({ userId: parseInt(userId), eventIds }));
      alert('Inscripciones guardadas exitosamente');
      dispatch(clearSelectedEvents());
    } else {
      console.error('User ID is undefined');
    }
  };

  
  const handleRemoveEvent = (eventId: number) => {
    const updatedEvents = selectedEvents.filter(event => event.id !== eventId);
    dispatch(updatedSelectedEvents(updatedEvents));
  };

  if (loading) {
    return <div>Cargando eventos...</div>;
  }

  if (error) {
    return <div>Error al cargar eventos: {error}</div>;
  }

  return (
    <Navbar>
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Perfil del Usuario</h2>
      <h3 className="text-xl font-bold mb-2">Eventos Seleccionados</h3>
      <ul className="list-disc pl-5">
        {selectedEvents.map((event) => (
          <li key={event.id}>
            {event.name} - {event.description} - {event.date}
            <button onClick={() => handleRemoveEvent(event.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSaveInscriptions}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Guardar Inscripciones
      </button>
      <h3 className="text-xl font-bold mt-8 mb-2">Eventos Inscritos</h3>
      <ul className="list-disc pl-5">
        {userEvents.map((event) => (
          <li key={event.id}>
            {event.name} - {event.description} - {event.date}
          </li>
        ))}
      </ul>
    </div>
    </Navbar>
  );
};

export default UserProfile;