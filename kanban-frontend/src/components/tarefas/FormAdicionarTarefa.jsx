import React from "react";
import "./tarefa.css";

function FormAdicionarTarefa({
  descricao,
  setDescricao,
  prazo,
  setPrazo,
  colunaSelecionada,
  setColunaSelecionada,
  colunas,
  handleAdicionarTarefa
}) {
  return (
    <form className="ml-[40px] border-white" onSubmit={handleAdicionarTarefa}>
      <input
        className="mr-3 border border-white rounded"
        type="text"
        id="descricao"
        name="descricao"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder=" +  Adicionar Tarefa"
        required
      />
      <input
        className="input-data mr-3 border border-white rounded"
        type="datetime-local"
        id="prazo"
        name="prazo"
        value={prazo}
        onChange={(e) => setPrazo(e.target.value)}
      />
      <select
        className="mr-1 border border-white rounded"
        id="colunaSelecionada"
        name="colunaSelecionada"
        value={colunaSelecionada}
        onChange={(e) => setColunaSelecionada(e.target.value)}
      >
        {colunas.map((c) => (
          <option className="bg-[#161B22]" key={c.id} value={c.nome}>
            {c.nome}
          </option>
        ))}
      </select>
      <button className="botoes ml-2" type="submit">
        Adicionar
      </button>
    </form>
  );
}

export default FormAdicionarTarefa;
