import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from './App.jsx'
import CreateQuadro from './pages/createQuadro/CreateQuadro.jsx'
import Kanban from './pages/kanbanPage/Kanban.jsx'
import Quadros from './pages/quadrosPage/Quadros.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}  />
      <Route path="/createquadro" element={<CreateQuadro />} />
      <Route path="/quadros" element={<Quadros />} />
      <Route path="/kanban/:id" element={<Kanban />} />
    </Routes>
  </BrowserRouter>
)
