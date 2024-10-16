// EventDetailComponent.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../Redux/store';

const EventDetailComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Check if 'id' is defined before using it
  const event = useSelector((state: RootState) =>
    id ? state.events.events.find(event => event.id === parseInt(id)) : undefined
  );

  if (!event) return <div>Evento no encontrado</div>;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>{event.date}</p>
    </div>
  );
};

export default EventDetailComponent;
