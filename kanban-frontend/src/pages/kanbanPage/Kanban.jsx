import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as tarefaService from "../../services/tarefaService";
import * as colunaService from "../../services/colunaService";
import * as quadroService from "../../services/quadroService";

import KanbanHeader from "../../components/kanbanHeader/KanbanHeader";
import Coluna from "../../components/colunas/Coluna";
import FormAdicionarTarefa from "../../components/tarefas/FormAdicionarTarefa";

import "./kanban.css";

function Kanban() {
  const [colunas, setColunas] = useState([]); //colunas = variável | setColunas = responsável por atualizar o valor e mandar para o react | useState "usa o estado atual e retorna um array" | ([]) -> estado inicial vazio
  const [tarefas, setTarefas] = useState([]); // [tarefas, setTarefas] -> atribuição via desestruturação
  const [descricao, setDescricao] = useState(""); // ("") -> estado inicial String vazia
  const [prazo, setPrazo] = useState("");
  const [colunaSelecionada, setColunaSelecionada] = useState("");
  const { id } = useParams();
  const quadroId = parseInt(id);
  const [quadro, setQuadro] = useState(null);
  const navigate = useNavigate();
  const [tarefaEditando, setTarefaEditando] = useState(null);



  useEffect(() => {
    async function carregarQuadro() {
      try {
        const data = await quadroService.getQuadroById(id);
        
        setQuadro(data);
      } catch (err) {
        console.log("Erro ao carregar quadro", err);
      }
    }
    carregarQuadro();
  }, [id]);

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
  }, []); // roda apenas uma vez

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
  }, [quadroId]); // roda sempre que o quadroId atualizar

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

  async function handleSalvarEdicao(e) {
    e.preventDefault();
    try {
      await tarefaService.atualizarTarefa(tarefaEditando.id, tarefaEditando);
      setTarefas((prev) => prev.map((t) => t.id === tarefaEditando.id ? tarefaEditando : t));
      setTarefaEditando(null);
    } catch (err) {
      console.log("Erro ao atualizar tarefa!", err);
    }
  }

  async function handleApagarTarefa(id) {
    if (confirm("AVISO! Você está deletando a Tarefa, Deseja continuar?")) {
      try {
        await tarefaService.deletarTarefa(id);
        setTarefas((prev) => prev.filter((t) => t.id !== id));
        setTarefaEditando(null);
      } catch (error) {
        console.log("Erro ao deletar tarefa", error);
      }
    }
  }

  async function handleDeletarQuadro(id) {
    if (confirm("AVISO! Você está deletando o quadro e esta ação não é reversível! Deseja continuar?")) {
      try {
        await quadroService.deleteQuadroById(id);

      } catch (error) {
        console.log("Erro ao deletar quadro: ", error)
      }
    }
  }
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

    try {
      await tarefaService.atualizarTarefa(tarefaId, {
        ...tarefa,
        coluna: { id: colunaDestino.id },
      });

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
      <KanbanHeader
        quadro={quadro}
        navigate={navigate}
        handleDeletarQuadro={handleDeletarQuadro}
      />

      <div className="flex gap-5 p-10">
        {colunas.map((coluna) => {
          const tarefasDaColuna = tarefas.filter((t) => t.coluna?.id === coluna.id);
          return (
            <Coluna
              key={coluna.id}
              coluna={coluna}
              tarefas={tarefasDaColuna}
              tarefaEditando={tarefaEditando}
              setTarefaEditando={setTarefaEditando}
              handleSalvarEdicao={handleSalvarEdicao}
              handleApagarTarefa={handleApagarTarefa}
              onDragStart={onDragStart}
              onDrop={onDrop}
              allowDrop={allowDrop}
            />
          );
        })}
      </div>

      <FormAdicionarTarefa
        descricao={descricao}
        setDescricao={setDescricao}
        prazo={prazo}
        setPrazo={setPrazo}
        colunaSelecionada={colunaSelecionada}
        setColunaSelecionada={setColunaSelecionada}
        colunas={colunas}
        handleAdicionarTarefa={handleAdicionarTarefa}
      />
    </div>
  );
}

export default Kanban;
