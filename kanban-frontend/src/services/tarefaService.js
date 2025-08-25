import  axios  from "axios";

const API_URL = "http://localhost:8080/api";

export const getTarefas = async () => {
    const response = await axios.get(`${API_URL}/tarefas`);
    return response.data;
}

export const criarTarefa = async (tarefa) => {
    const response = await axios.post(`${API_URL}/tarefas`, tarefa);
    return response.data;
}

export const atualizarTarefa = async (id, tarefaAtualizada) => {
    const response = await axios.put(`${API_URL}/tarefas/${id}`, tarefaAtualizada);
    return response.data;
}

export const deletarTarefa = async (id) => {
    const response = await axios.delete(`${API_URL}/tarefas/${id}`);
    return response.data;
}

export const moverTarefa = async (dto) => {
    await axios.patch(`${API_URL}/tarefas`, dto);
}

