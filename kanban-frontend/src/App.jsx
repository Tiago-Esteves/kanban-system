import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuadros } from "./services/quadroService";

function App() {
  
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect( () => {
    async function fetchData() {
      try {
        const quadros = await getQuadros();
        if(quadros.length === 0){
          navigate("/create-quadros");
        } else{ navigate("/quadros");} 
      } catch (err) {
        console.log("Erro ao buscar quadros", err);
      } finally {
        setLoading(false);
      }
    } 
    fetchData();
  }, [navigate]);
  if(loading) return <p>Carregando...</p>
  return null;
}

export default App
