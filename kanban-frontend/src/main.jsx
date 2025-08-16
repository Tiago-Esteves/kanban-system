import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import CreateQuadro from './components/CreateQuadro.jsx'
import Quadros from './components/Quadros.jsx'
import Kanban from './components/Kanban.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}  />
      <Route path="/create-quadros" element={<CreateQuadro />} />
      <Route path="/quadros" element={<Quadros />} />
      <Route path="/kanban/:id" element={<Kanban />} />
    </Routes>
  </BrowserRouter>
)
