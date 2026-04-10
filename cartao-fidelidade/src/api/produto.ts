// src/api/produto.ts

import api from './index'; 
import axios, { type AxiosResponse } from 'axios'; 

// --- Configurações e URLs ---
const PRODUTOS_ENDPOINT = '/produtos'; 
const BASE_URL_IMAGEM = 'http://localhost:3000/api/imagens'; 
const DEFAULT_IMAGE_URL = 'https://cdn-icons-png.flaticon.com/128/70/70972.png'; 

// --- Interfaces ---
export interface Premio {
  id: number;
  nome: string;
  pontos: number; 
  imagemUrl: string; 
  descricao?: string; 
}

interface PremioBackend {
    id: number;
    nome: string;
    descricao?: string;
    pontos_necessarios: number;
    quantidade: number;
    expira_em: string | null;
    nome_da_promocao: string | null;
    imagem_id: number | null; 
    url_foto?: string; 
}

type CadastroInput = {
    nome: string;
    pontos: string; 
    expira_em: string; 
};

// --- Funções de API ---

/**
 * Lista todos os prêmios cadastrados.
 */
export const getPremios = async (): Promise<Premio[]> => {
  try {
    const response: AxiosResponse<PremioBackend[]> = await api.get(PRODUTOS_ENDPOINT);
    
    return response.data.map(premioBackend => ({
        id: premioBackend.id,
        nome: premioBackend.nome,
        descricao: premioBackend.descricao,
        pontos: premioBackend.pontos_necessarios,
        // Mantemos a URL montada para o Hook de Base64 extrair o ID depois
        imagemUrl: premioBackend.imagem_id 
            ? `${BASE_URL_IMAGEM}/${premioBackend.imagem_id}` 
            : DEFAULT_IMAGE_URL,
    }));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Erro ao carregar prêmios.");
    }
    throw new Error("Falha na conexão de rede.");
  }
};

/**
 * Cadastra um novo prêmio.
 */
export const cadastrarPremio = async (
  dadosFormulario: CadastroInput,
  imagemFile: File | null
): Promise<any> => { 
  const formData = new FormData();
  formData.append('nome', dadosFormulario.nome);
  formData.append('pontos', dadosFormulario.pontos);
  formData.append('descricao', "Prêmio resgatável no balcão.");
  formData.append('quantidade', "1");
  formData.append('nome_da_promocao', "");

  if (dadosFormulario.expira_em) {
      const parts = dadosFormulario.expira_em.split('-'); 
      if (parts.length === 3) {
          formData.append('ano_expira', parts[0]);
          formData.append('mes_expira', parts[1]);
          formData.append('dia_expira', parts[2]);
      }
  }

  if (imagemFile) {
    formData.append('imagem', imagemFile); 
  }

  try {
    const response = await api.post(PRODUTOS_ENDPOINT, formData); 
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error || "Erro ao cadastrar prêmio.";
        throw new Error(errorMessage);
    }
    throw new Error('Não foi possível conectar ao servidor.');
  }
};

/**
 * Edita um prêmio existente utilizando FormData.
 */
export const editarPremio = async (
  id: number,
  nome: string,
  pontos: string,
  imagemFile: File | null
): Promise<any> => {
  const formData = new FormData();
  formData.append('nome', nome);
  formData.append('pontos', pontos);

  // Se o usuário selecionou uma nova imagem, ela é enviada
  if (imagemFile) {
    formData.append('imagem', imagemFile);
  }

  try {
    // Usamos PATCH para atualização parcial conforme a rota informada
    const response = await api.patch(`${PRODUTOS_ENDPOINT}/${id}`, formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || "Erro ao editar prêmio.");
    }
    throw new Error("Falha ao conectar ao servidor para editar.");
  }
};

/**
 * Exclui um prêmio pelo ID.
 */
export const excluirPremio = async (id: number): Promise<void> => {
  try {
    await api.delete(`${PRODUTOS_ENDPOINT}/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || "Erro ao excluir prêmio.");
    }
    throw new Error("Falha ao conectar ao servidor para excluir.");
  }
};