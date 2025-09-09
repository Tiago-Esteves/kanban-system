import { useEffect, useState } from "react";
import { getQuadros } from "../../services/quadroService";
import { useNavigate } from "react-router-dom"
import { logout } from "../../services/authService";

export default function Quadros() {
    const [quadros, setQuadros] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchQuadros() {
            const data = await getQuadros();
            setQuadros(data);
        }
        fetchQuadros();
    }, []);



    return (
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
                    onClick={() => navigate(`/CreateQuadro`)}
                    className="botao mt-2"
                >Novo Quadro</button>

                <button 
                onClick={() => { logout(); navigate("/auth/login"); }}
                    className="botao mt-2
                    "
                >
                    Sair
                </button>
            </div>
        </div>
    )
}
