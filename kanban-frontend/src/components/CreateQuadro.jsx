import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateQuadro() {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim()) return alert("O nome do quadro é obrigatório!");

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/quadros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome })
      });

      if (!response.ok) throw new Error("Erro ao criar quadro");

      const novoQuadro = await response.json();

      // Redireciona para a página do quadro
      navigate(`/quadros/${novoQuadro.id}`);
    } catch (error) {
      alert("Erro: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Criar novo quadro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do quadro"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "8px",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px"
          }}
        >
          {loading ? "Criando..." : "Criar Quadro"}
        </button>
      </form>
    </div>
  );
}


