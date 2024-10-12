import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/ReduxStore'; // Asegúrate de que la ruta sea correcta
import LoginComponent from './Layouts/LoginComponent';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <LoginComponent />
      </div>
    </Provider>
  );
};

export default App;