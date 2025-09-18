import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App.jsx';
import CreateQuadro from './pages/createQuadro/CreateQuadro.jsx';
import Kanban from './pages/kanbanPage/Kanban.jsx';
import Quadros from './pages/quadrosPage/Quadros.jsx';
import './index.css';
import LoginPage from './pages/loginPage/LoginPage.jsx';
import Register from './pages/register/Register.jsx';
import LandingPage from './pages/landingPage/LandingPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx'; // importando a rota privada

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path='/auth/register' element={<Register />} />
      <Route path='/landing' element={<LandingPage />} />

      <Route path="/" element={<App />}/>

      <Route
        path="/createquadro"
        element={
          <PrivateRoute>
            <CreateQuadro />
          </PrivateRoute>
        }
      />

      <Route
        path="/quadros"
        element={
          <PrivateRoute>
            <Quadros />
          </PrivateRoute>
        }
      />

      <Route
        path="/kanban/:id"
        element={
          <PrivateRoute>
            <Kanban />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
