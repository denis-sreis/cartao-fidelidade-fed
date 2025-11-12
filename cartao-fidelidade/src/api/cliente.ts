import api from './index'; 
import axios, { type AxiosResponse } from 'axios'; 

export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  documento: string;
  tipo: string;     
  foto_data_url: string | null; 
}

const CLIENTE_ENDPOINT = '/cliente'; 

export const getClientes = async (): Promise<Cliente[]> => {
  try {
    const response: AxiosResponse<Cliente[]> = await api.get(CLIENTE_ENDPOINT);
    return response.data; 

  } catch (error) {
    console.error("Erro ao buscar clientes:", error);

    if (axios.isAxiosError(error) && error.response) { 
        if (error.response?.status === 401 || error.response?.status === 403) {
             throw new Error("Sua sessão expirou ou você não tem permissão para ver os clientes.");
        }
        
        const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao carregar os dados dos clientes.";
        throw new Error(errorMessage);
    }
    
    throw new Error("Erro de rede ao buscar clientes.");
  }
};