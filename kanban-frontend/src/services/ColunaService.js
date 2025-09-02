import api from "./authService";

const API_URL = "http://localhost:8080/api";

export async function getColunas() {
    const res = await api.get(`${API_URL}/colunas`);
    return res.data;
}
