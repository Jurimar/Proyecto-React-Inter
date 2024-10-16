// src/Layouts/EventListComponents.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/store';
import { fetchEvents, selectEvent } from '../Redux/eventSlice';

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  createdBy: number;
}

const EventList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { events, loading, error } = useSelector((state: RootState) => state.events);
  
    React.useEffect(() => {
      dispatch(fetchEvents());
    }, [dispatch]);
  
    const handleSelectEvent = (event: Event) => {
      dispatch(selectEvent(event));
    };
  
    if (loading) {
      return <div>Cargando eventos...</div>;
    }
  
    if (error) {
      return <div>Error al cargar eventos: {error}</div>;
    }
  
    return (
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Lista de Eventos</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Descripción</th>
              <th className="py-2 px-4 border-b">Fecha</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="py-2 px-4 border-b">{event.name}</td>
                <td className="py-2 px-4 border-b">{event.description}</td>
                <td className="py-2 px-4 border-b">{event.date}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleSelectEvent(event)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Inscribirse
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default EventList;