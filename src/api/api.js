import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {'Content-Type': 'application/json'}
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        console.error("Erro na comunicação com o servidor: " + err);
        return Promise.reject(err);
    }
);

export default api;