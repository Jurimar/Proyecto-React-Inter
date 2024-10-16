// src/Layouts/EventComponent.tsx
import React from 'react';
import RegisterEventForm from './RegisterEventComponent';
import EventList from './EventListComponents';
import Navbar from './NavBarComponent';

const EventComponent: React.FC = () => {
  return (
    <Navbar>
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <RegisterEventForm />
        </div>
        <div className="md:w-1/2">
          <EventList />
        </div>
      </div>
    </div>
    </Navbar>
  );
};

export default EventComponent;