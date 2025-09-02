import React from "react";
import IconEditar from '../../assets/pencil-square.svg?react';

function KanbanHeader({ quadro, navigate, handleDeletarQuadro }) {
  return (
    <div className="kanbanHeader">
      <button onClick={() => navigate(`/quadros`)} className="botaoMeusQuadros">
        ← Meus quadros
      </button>
      <h1 className="titulo">{quadro?.nome}</h1>
      <div className="botaoEditarQuadros">
        <button onClick={() => handleDeletarQuadro(quadro.id)}>
          <IconEditar className="ml-1 mt-1 text-white" /> Deletar Quadro
          </button>
                
      </div>
    </div>
  );
}

export default KanbanHeader;
