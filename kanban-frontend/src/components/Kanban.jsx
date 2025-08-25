import { useEffect, useState } from "react";
import * as tarefaService from "../services/tarefaService";
import * as colunaService from "../services/colunaService";
import { useNavigate, useParams } from "react-router-dom";
import "./kanban.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";


function Kanban() {
  const [colunas, setColunas] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [prazo, setPrazo] = useState("");
  const [colunaSelecionada, setColunaSelecionada] = useState("");
  const { id } = useParams();
  const quadroId = parseInt(id);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarColunas() {
      try {
        const dados = await colunaService.getColunas();
        setColunas(dados);
        if (dados.length) setColunaSelecionada(dados[0].nome);
      } catch (erro) {
        console.error("Erro ao carregar colunas:", erro);
      }
    }
    carregarColunas();
  }, []);

  useEffect(() => {
    async function carregarTarefas() {
      try {
        const dados = await tarefaService.getTarefas();
        const tarefasDoQuadro = dados.filter((t) => t.quadro?.id === quadroId);
        setTarefas(tarefasDoQuadro);
      } catch (erro) {
        console.error("Erro ao carregar tarefas:", erro);
      }
    }
    carregarTarefas();
  }, [quadroId]);

  async function handleAdicionarTarefa(e) {
    e.preventDefault();
    const colunaObj = colunas.find((c) => c.nome === colunaSelecionada);
    if (!colunaObj) return;

    try {
      const novaTarefa = await tarefaService.criarTarefa({
        descricao,
        prazo: prazo || null,
        quadro: { id: quadroId },
        coluna: { id: colunaObj.id },
      });

      setTarefas((prev) => [...prev, novaTarefa]);
      setDescricao("");
      setPrazo("");
    } catch (erro) {
      console.log("Erro ao criar tarefa:", erro);
    }
  }

  // ====== DRAG & DROP NATIVO ======
  function onDragStart(e, tarefaId) {
    e.dataTransfer.setData("text/plain", String(tarefaId));
    e.dataTransfer.effectAllowed = "move";
  }

  async function onDrop(e, colunaDestinoId) {
    e.preventDefault();
    const tarefaId = parseInt(e.dataTransfer.getData("text/plain"));
    if (!tarefaId || !colunaDestinoId) return;

    const tarefa = tarefas.find((t) => t.id === tarefaId);
    const colunaDestino = colunas.find((c) => c.id === colunaDestinoId);

    // atualização no backend
    try {
      await tarefaService.atualizarTarefa(tarefaId, {
        ...tarefa, // mantém todos os campos existentes
        coluna: { id: colunaDestino.id }, // atualiza só a coluna
      });

      // atualização otimista no frontend
      setTarefas((prev) =>
        prev.map((t) => (t.id === tarefaId ? { ...t, coluna: colunaDestino } : t))
      );
    } catch (erro) {
      console.error("Erro ao mover tarefa:", erro);
    }
  }

  function allowDrop(e) {
    e.preventDefault();
  }

  return (
    <div className="kanban">
      <div className="kanbanHeader">
        <button onClick={() => navigate(`/quadros`)} className="botaoMeusQuadros">
          ← Meus quadros
        </button>
        <h1 className="titulo">Kanban Board</h1>
        <div className="spacer"></div>
      </div>

      <div className="flex gap-5 p-10">
        {colunas.map((coluna) => (
          <section
            key={coluna.id}
            className="colunasSection"
            onDragOver={allowDrop}
            onDrop={(e) => onDrop(e, coluna.id)}
          >
            <header className="text-3xl text-center font-semibold">{coluna.nome}</header>

            {tarefas
              .filter((tarefa) => tarefa.coluna?.id === coluna.id)
              .map((tarefa) => (
                <div
                  className="tarefas"
                  key={tarefa.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, tarefa.id)}
                  title={tarefa.descricao}
                  style={{ cursor: "grab" }}
                >
                  <span>{tarefa.descricao}</span>
                  {tarefa.prazo && (
                      <span title={format(new Date(tarefa.prazo), "dd/MM/yyyy HH:mm")}>
                        {format(new Date(tarefa.prazo), "dd/MM/yy", { locale: ptBR })}
                      </span>
                    )
                  }
                  <button className="botaoEditarTarefa p-2 rounded hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                  </button>

                </div>
              ))}
          </section>
        ))}
      </div>

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
            <option key={c.id} value={c.nome}>
              {c.nome}
            </option>
          ))}
        </select>
        <button className="botoes ml-2" type="submit">
          Adicionar
        </button>
      </form>
    </div>
  );
}

export default Kanban;
