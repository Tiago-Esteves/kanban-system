
import { useNavigate } from "react-router-dom";


function App() {
  
  
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/auth/login")}>
        Ir para Login
      </button>
    </div>
  );
}

export default App
