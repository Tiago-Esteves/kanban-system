import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as quadroService from "../../services/quadroService";
import "./CreateQuadro.css"
import "../../index.css"

export default function CreateQuadro() {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim()) return alert("O nome do quadro é obrigatório!");

    setLoading(true);

    try {
      const novoQuadro = await quadroService.createQuadro({ nome });
      navigate(`/kanban/${novoQuadro.id}`);


    } catch (error) {
      alert("Erro: " + error.message);

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="div">
      <button
        onClick={() => navigate(`/Quadros`)}
        className="voltar"
      >Voltar</button>
      <div className="container">
        <h2 className="text-4xl font-bold mb-2">Nome do Quadro</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Kanban board"
            value={nome} required
            onChange={(e) => setNome(e.target.value)}            
          />
          <button
            className="botao"
            type="submit"
            disabled={loading}           
          >
            {loading ? "Criando..." : "Criar Quadro"}
          </button>
        </form>
      </div>
    </div>
  );
}


