import React from "react";
import Tarefa from "../tarefas/Tarefa";
import "./Coluna.css";

function Coluna({ coluna, tarefas, tarefaEditando, setTarefaEditando, handleSalvarEdicao, handleApagarTarefa, onDragStart, onDrop, allowDrop }) {
  return (
    <section
      className="colunasSection"
      onDragOver={allowDrop}
      onDrop={(e) => onDrop(e, coluna.id)}
    >
      <header className="text-3xl text-center font-semibold">{coluna.nome}</header>
      {tarefas.map((tarefa) => (
        <Tarefa
          key={tarefa.id}
          tarefa={tarefa}
          tarefaEditando={tarefaEditando}
          setTarefaEditando={setTarefaEditando}
          handleSalvarEdicao={handleSalvarEdicao}
          handleApagarTarefa={handleApagarTarefa}
          onDragStart={onDragStart}
        />
      ))}
    </section>
  );
}

export default Coluna;
