import React from "react";
import IconEditar from '../../assets/pencil-square.svg?react';

function KanbanHeader({ quadro, navigate }) {
  return (
    <div className="kanbanHeader">
      <button onClick={() => navigate(`/quadros`)} className="botaoMeusQuadros">
        ← Meus quadros
      </button>
      <h1 className="titulo">{quadro?.nome}</h1>
      <div className="botaoEditarQuadros">
        Editar Quadro
        <IconEditar className="ml-1 mt-1 text-white" />
        
      </div>
    </div>
  );
}

export default KanbanHeader;
