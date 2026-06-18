// src/api/index.ts
import axios from 'axios';

// 1. Cria a conexão apontando para a URL do seu backend Node.js
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // A porta do seu backend que estava no arquivo .env
});

// 2. Interceptor: Isso aqui é a "parte da autenticação".
// Antes de qualquer requisição sair do React para o Backend, ele verifica
// se existe um token salvo. Se existir, ele anexa na requisição!
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    // Mudança aqui: garante que config.headers existe antes de injetar o token
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;