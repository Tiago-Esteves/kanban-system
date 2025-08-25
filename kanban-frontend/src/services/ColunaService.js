import axios from "axios";

const API_URL = "http://localhost:8080/api";

export async function getColunas() {
    const res = await axios.get(`${API_URL}/colunas`);
    return res.data;
}
