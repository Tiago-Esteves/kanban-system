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
        <div className="esquemaTeste flex flex-col items-center">          
            <h1 className="text-5xl text-center p-5 mt-1">Meus Quadros</h1>

            <div className="w-[700px] ">
                <ul className="quadrosContainer">
                    {quadros.map((q) => 
                        <li 
                            key={q.id}
                            className="quadrosList"
                            onClick={() => navigate(`/kanban/${q.id}`)}
                            
                        >
                            {q.nome}
                        </li>
                    )}
                </ul>
                
                <button
                    onClick={() => navigate(`/create-quadros`)}
                    className="mt-2 w-full bg-[#58A6FF] text-white py-2 rounded hover:bg-[#395b83] transiton duration-500 cursor-pointer"
                >Novo Quadro</button>
            </div>
        </div>
    )
}
