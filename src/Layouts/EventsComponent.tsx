import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

const EventsComponent: React.FC = () => {
  const eventsState = useSelector((state: RootState) => state.data);
  return (
    <div>
      <h2>Events</h2>
      {eventsState.loading && <p>Loading...</p>}
      {eventsState.error && <p>Error: {eventsState.error}</p>}
      <ul>
        {eventsState.events.map((event: { id: string; name: string }) => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventsComponent;