import { useEffect, useState } from "react";
import * as kanbanService from "../services/kanbanService";
import { useNavigate } from "react-router-dom";


function Kanban(){

    const colunas = ["A começar", "Fazendo", "Concluído", "Atrasado"];
    const [tarefas, setTarefas] = useState([]);
    const navigate = useNavigate();

    const colunaMap = {
        1: "A começar",
        2: "Fazendo",
        3: "Concluído",
        4: "Atrasado"
    }

    async function carregarTarefas() {
        try {
            const dados = await kanbanService.getTarefas();
            const tarefasLinkadas = dados.map(t => ({
                ...t,
                coluna: colunaMap[t.colunaId] || "A começar"
            }));
            setTarefas(tarefasLinkadas);
        } catch (erro) {
            console.error("Erro ao carregar tarefas: ", erro);
        }
    }

    useEffect(() => {
        carregarTarefas();
    }, );

    return(
         <div>
            <div className="flex justify-between items-center mb-6">
                <button
                        onClick={() => navigate(`/quadros`)}
                        className="botoes"
                >← Meus quadros</button>
                <h1 className="text-5xl font-bold text-center flex-1">Kanban Board</h1>     

            </div>
            <div className="flex gap-5 p-10">
                {colunas.map((nomeColuna) => (
                    <section
                        key={nomeColuna}
                        style={{
                            flex: 1,
                            backgroundColor: "#f0f0f0",
                            padding: "10px",
                            borderRadius: "8px",
                            minHeight: "600px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                        }}
                    >
                        <header className="text-3xl text-center font-semibold">{nomeColuna}</header>

                        {tarefas.filter((tarefa) => tarefa.coluna === nomeColuna)
                                .map((tarefa) => (
                            <div
                                key={tarefa.id}
                                style={{
                                    backgroundColor: "white",
                                    margin: "10px ",
                                    padding: "10px",
                                    borderRadius: "4px",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                                }}
                            >
                                {tarefa.descricao}
                            </div>
                        ))}
                    </section>                   
                ))}

                
            </div>
            
        </div>
    );
}

export default Kanban;