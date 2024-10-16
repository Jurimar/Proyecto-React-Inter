import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginComponent from "./Layouts/LoginComponent";
import HomeComponent from "./Layouts/HomeComponent"; 
import NotfoundComponent from "./Layouts/NotFoundComponent";
import EventComponent from "./Layouts/EventComponent";
import ProtectedRoute from "./Component/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomeComponent/></ProtectedRoute>} />
        <Route path="/inicio" element={<ProtectedRoute><HomeComponent/></ProtectedRoute>} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/eventos" element={<ProtectedRoute><EventComponent/></ProtectedRoute>} />
        <Route path="*" element={<NotfoundComponent />} />
      </Routes>
    </Router>
      
  );
};

export default App;