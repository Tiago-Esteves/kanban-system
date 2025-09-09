import React from "react";
import IconEditar from '../../assets/pencil-square.svg?react';

function KanbanHeader({
  quadro,
  navigate,
  handleDeletarQuadro,
  quadroEditando,
  setQuadroEditando,
  handleSalvarEdicaoQuadro
}) {
  if (!quadro) return <div>Carregando...</div>;

  const editando = quadroEditando?.id === quadro?.id;

  return (
    <div className="kanbanHeader">
      <button onClick={() => navigate(`/quadros`)} className="botaoMeusQuadros">
        ← Meus quadros
      </button>

      {editando ? (
        <form onSubmit={handleSalvarEdicaoQuadro} className="formularioEditarQuadro">
          <input
            type="text"
            className=" border border-white rounded"
            value={quadroEditando?.nome || ""}
            required
            onChange={(e) =>
              setQuadroEditando({ ...quadroEditando, nome: e.target.value })
            }
          />
          <section className="botoesFormularioSection">
            <button type="submit" className="botoesFormulario">Salvar</button>
            <button type="button" onClick={() => setQuadroEditando(null)} className="botoesFormulario">
              Voltar
            </button>
            <button
              type="button"
              onClick={() => handleDeletarQuadro(quadro.id)}
              className="cursor-pointer hover:bg-red-800 rounded"
            >
              Deletar
            </button>
          </section>
        </form>
      ) : (
        <>
          <h1 className="titulo">{quadro?.nome}</h1>
          
            <button
              onClick={() => setQuadroEditando(quadro)}
              className="BotaoEditarQuadros"
            >
              <IconEditar className="ml-1 text-white" /> Editar Quadro
            </button>
          
        </>
      )}
    </div>
  );
}

export default KanbanHeader;
