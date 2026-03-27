import api from './index'; 
import axios, { type AxiosResponse } from 'axios'; 

const BASE_URL_IMAGEM = 'http://localhost:3000/api/imagens';

export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  documento: string;
  tipo: string;
  pontos: number;
  imagem?: string | null; 
  imagem_id?: number | null; 
  email?: string;
}

const CLIENTE_ENDPOINT = '/cliente'; 
const AUTH_ME_ENDPOINT = '/auth/me'; 
const CLIENTE_ME_ENDPOINT = '/cliente/me';
const CLIENTE_FOTO_ENDPOINT = '/cliente/me/foto';


const processarImagemUsuario = (data: any): string | null => {
    if (!data) return null;

    if (data.foto && data.foto.base64) {
        const mime = data.foto.mimeType || 'image/jpeg';
        return `data:${mime};base64,${data.foto.base64}`;
    }
    
    if (data.imagem_id || data.foto_imagem_id) {
         return `${BASE_URL_IMAGEM}/${data.imagem_id}`; 
    }
    
    const img = data.imagem || data.url_foto || (typeof data.foto === 'string' ? data.foto : null);
    
    if (img && typeof img === 'string') {
        if (img.startsWith('http') || img.startsWith('data:')) {
            return img;
        }
        return `http://localhost:3000/${img.replace(/^\//, '')}`;
    }

    return null;
};

export const getClientes = async (): Promise<Cliente[]> => {
  try {
    const response: AxiosResponse<Cliente[]> = await api.get(CLIENTE_ENDPOINT);
    return response.data; 
  } catch (error) {
    handleAxiosError(error, "Erro ao buscar lista de clientes.");
    throw error;
  }
};

export const getUsuarioLogado = async (): Promise<Cliente> => {
  try {
    const response = await api.get(AUTH_ME_ENDPOINT);
    const dados = response.data;

    const imagemProcessada = processarImagemUsuario(dados);

    return {
        ...dados,
        imagem: imagemProcessada 
    };

  } catch (error) {
    handleAxiosError(error, "Erro ao carregar seu perfil.");
    throw error;
  }
};

export const atualizarMeusDados = async (dados: Partial<Cliente>): Promise<Cliente> => {
  try {
    const response: AxiosResponse<Cliente> = await api.put(CLIENTE_ME_ENDPOINT, dados);
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Erro ao atualizar seus dados.");
    throw error;
  }
};

export const atualizarFotoPerfil = async (arquivo: File): Promise<void> => {
    try {
        const formData = new FormData();
        formData.append('imagem', arquivo); 

        await api.put(CLIENTE_FOTO_ENDPOINT, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        handleAxiosError(error, "Erro ao enviar a foto de perfil.");
        throw error;
    }
}

const handleAxiosError = (error: unknown, defaultMessage: string) => {
  console.error("ERRO API:", error);

  if (axios.isAxiosError(error) && error.response) { 
    if (error.response.status === 401 || error.response.status === 403) {
       console.warn("Sessão expirada.");
    }
    const errorMessage = (error.response.data as any)?.message || defaultMessage;
    throw new Error(errorMessage);
  }
  throw new Error("Erro de conexão com o servidor.");
};