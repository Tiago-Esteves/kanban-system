import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import IconEditar from "../../assets/pencil-square.svg?react";

function Tarefa({ tarefa, tarefaEditando, setTarefaEditando, handleSalvarEdicao, handleApagarTarefa, onDragStart }) {
  const editando = tarefaEditando?.id === tarefa.id;

  return (
    <div
      className={`tarefas ${editando ? "expandida" : ""}`}
      draggable={!tarefaEditando}
      onDragStart={(e) => onDragStart(e, tarefa.id)}
      title={tarefa.descricao}
    >
      {editando ? (
        <form onSubmit={handleSalvarEdicao} className="formularioEditar">
          <input
            className="w-full border border-white rounded"
            type="text"
            value={tarefaEditando.descricao}
            required
            onChange={(e) => setTarefaEditando({ ...tarefaEditando, descricao: e.target.value })}
          />
          <input
            className="input-data border border-white rounded"
            type="datetime-local"
            value={tarefaEditando.prazo || ""}
            onChange={(e) => setTarefaEditando({ ...tarefaEditando, prazo: e.target.value })}
          />
          <section className="botoesFormularioSection">
            <button className="botoesFormulario" type="submit">Salvar</button>
            <button className="botoesFormulario" onClick={() => setTarefaEditando(null)}>Voltar</button>
            <button className="cursor-pointer hover:bg-red-800 rounded" title="Deletar Tarefa" onClick={() => handleApagarTarefa(tarefa.id)}>Deletar</button>
          </section>
        </form>
      ) : (
        <>
          <span className="descricao">{tarefa.descricao}</span>
          <span className="ladoDireito min-w-[70px] inline-block text-right" title={tarefa.prazo ? format(new Date(tarefa.prazo), "dd/MM/yyyy HH:mm") : ""}>
            {tarefa.prazo ? format(new Date(tarefa.prazo), "dd/MM/yy", { locale: ptBR }) : ""}
          </span>
          <button className="ladoDireito p-2 rounded hover:bg-gray-700" onClick={() => setTarefaEditando(tarefa)}>
            <IconEditar />
          </button>
        </>
      )}
    </div>
  );
}

export default Tarefa;
