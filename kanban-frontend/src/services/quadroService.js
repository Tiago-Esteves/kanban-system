import axios from "axios";

const API_URL = "http://localhost:8080/api";

export async function getQuadros() {
    const res = await axios.get(`${API_URL}/quadros`);
    return res.data;
}

export async function createQuadro(quadro) {
    const res = await axios.post(`${API_URL}/quadros`, quadro);
    return res.data
}

export async function getQuadroById(id) {
    const res = await axios.get(`${API_URL}/quadros/${id}`, id);
    return res.data
}