import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './Redux/store';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { fetchEvents } from  './Actions/eventActions';
import NavBarComponent from './Layouts/NavBarComponent';
import LoginComponent from './Layouts/LoginComponent';
import EventsComponent from './Layouts/EventsComponent';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (authState.user) {
      dispatch(fetchEvents());
    }
  }, [dispatch, authState.user]);

  return (
    <Router>
      <NavBarComponent />
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/events" element={authState.user ? <EventsComponent /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;