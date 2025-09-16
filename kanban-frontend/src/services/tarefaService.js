import api from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

export const getTarefas = async () => {
    const response = await api.get(`${API_URL}/tarefas`);
    return response.data;
}

export const criarTarefa = async (tarefa) => {
    const response = await api.post(`${API_URL}/tarefas`, tarefa);
    return response.data;
}

export const atualizarTarefa = async (id, tarefaAtualizada) => {
    const response = await api.put(`${API_URL}/tarefas/${id}`, tarefaAtualizada);
    return response.data;
}

export const deletarTarefa = async (id) => {
    const response = await api.delete(`${API_URL}/tarefas/${id}`);
    return response.data;
}

export const moverTarefa = async (dto) => {
    await api.patch(`${API_URL}/tarefas`, dto);
}

