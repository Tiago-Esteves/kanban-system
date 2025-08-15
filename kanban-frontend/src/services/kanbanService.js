import { Axios } from "axios";

const API_URL = "http://localhost:8080";

export const getTarefas = async () => {
    const response = await Axios.get(`${API_URL}/tarefas`);
    return response.data;
}

export const criarTarefa = async (tarefa) => {
    const response = await Axios.post(`${API_URL}/tarefas`, tarefa);
    return response.data;
}

export const atualizarTarefa = async (id, tarefaAtualizada) => {
    const response = await Axios.post(`${API_URL}/tarefas/${id}`, tarefaAtualizada);
    return response.data;
}

export const deletarTarefa = async (id) => {
    const response = await Axios.post(`${API_URL}/tarefas/${id}`);
    return response.data;
}

export const moverTarefa = async (dto) => {
    await Axios.patch(`${API_URL}/tarefas`, dto);
}