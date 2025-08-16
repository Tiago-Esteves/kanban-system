import { useEffect, useState } from "react";
import { getQuadros } from "../services/quadroService";
import { useNavigate } from "react-router-dom"

export default function Quadros(){
    const [quadros, setQuadros] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchQuadros() {
            const data = await getQuadros();
            setQuadros(data);
        }
        fetchQuadros();
    }, []);

    return(
        <div className="bg-[#FFFDF1]">
            <h1 className="text-5xl text-center p-5">Meus Quadros</h1>
            <ul>
                {quadros.map((q) => 
                    <li 
                        key={q.id}
                        style={{cursor: "pointer", color: "blue"}}
                        onClick={() => navigate(`/kanban/${q.id}`)}
                    >
                        {q.nome}
                    </li>
                )}
            </ul>
            
            <button
                onClick={() => navigate(`/create-quadros`)}
                className="botoes"
            >Novo Quadro</button>
        </div>
    )
}
