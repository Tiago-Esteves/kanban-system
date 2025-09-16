import api from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

export async function getColunas() {
    const res = await api.get(`${API_URL}/colunas`);
    return res.data;
}
