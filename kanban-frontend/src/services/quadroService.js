
import api from "./authService";

//const API_URL = "http://localhost:8080/api";
const API_URL = import.meta.env.VITE_API_URL;

export async function getQuadros() {
    const res = await api.get(`${API_URL}/quadros`); // trocando de axios para api devido a rota protegida
    return res.data;
}

export async function createQuadro(quadro) {
    const res = await api.post(`${API_URL}/quadros`, quadro);
    return res.data
}

export async function getQuadroById(id) {
    const res = await api.get(`${API_URL}/quadros/${id}`, id);
    return res.data
}

export async function updateQuadroById(id, quadro) {
    const res = await api.put(`${API_URL}/quadros/${id}`, quadro);
    return res.data;
}

export async function deleteQuadroById(id) {
    const res = await api.delete(`${API_URL}/quadros/${id}`, id);
    return res.data;
}