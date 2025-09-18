import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Criar uma instância do axios para incluir o token automaticamente
const api = axios.create({ baseURL: API_URL });

// Adiciona o token no header Authorization, se existir
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        const tipoToken = localStorage.getItem("tipoToken") || "Bearer";
        if (token) {
            config.headers.Authorization = `${tipoToken} ${token}`;
        }
        return config;
    });

// Intercepta respostas 401 e redireciona para login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = "/auth/login"; // força redirect
        }
        return Promise.reject(error);
    }
);

export const register = async (usuario) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, usuario);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const login = async (usuario) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, usuario);
        const { token } = response.data;

        if (token) {
            localStorage.setItem("token", token);
        }

        return response.data;
    } catch (err) {
        throw err.response ? err.response.data : err;
    }
}

export const forgetPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
        return response.data;
    } catch (err) {
        throw err.response ? err.response.data : err;
    }
}

export const logout = () => {
    localStorage.clear();

}

export default api; // usar para chamadas protegidas, ex: api.get("/tarefas")
