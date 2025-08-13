
const colunas =["A começar", "Em andamento", "Finalizado", "Atrasado"];

const tarefas =[
    {id: 1, descricao: "Criar o layout", coluna: "Em andamento"},
    { id: 2, descricao: "Implementar backend", coluna: "Finalizado" },
    { id: 3, descricao: "Testar aplicação", coluna: "Atrasado" },
    { id: 4, descricao: "Corrigir bugs", coluna: "A começar" },
    { id: 5, descricao: "Documentar código", coluna: "A começar" },
];

function Kanban(){
    return(
        <div>
            <h1 className="text-5xl font-bold text-center mb-6" >Kanban Board</h1>     

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
                        } }
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