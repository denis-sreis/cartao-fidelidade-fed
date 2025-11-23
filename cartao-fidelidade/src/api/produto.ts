// src/api/produto.ts

import api from './index'; 
import axios, { type AxiosResponse } from 'axios'; 

// --- Interfaces de Dados ---

// O que o FRONTEND espera (para renderização)
export interface Premio {
  id: number;
  nome: string;
  pontos: number; 
  imagemUrl: string; 
  descricao?: string; 
}

// O que o BACKEND ENVIA (para POST - Payload de Cadastro)
export interface CadastroPremioPayload {
  nome: string; 
  pontos: number; // CORRIGIDO: O POST espera 'pontos'
  expira_em?: string; 
  
  // VALORES PADRÃO INJETADOS:
  descricao: string; 
  quantidade: number;
  nome_da_promocao: string | null; 
  
  imagem_data_url?: string; 
}

// O que o BACKEND realmente envia (para listagem GET)
interface PremioBackend {
    id: number;
    nome: string;
    descricao?: string;
    pontos_necessarios: number; // O GET usa este nome
    quantidade: number;
    expira_em: string | null;
    nome_da_promocao: string | null;
    imagem_id: number | null; 
    url_foto?: string; 
}

// --- Configurações e Funções Auxiliares ---

const PRODUTOS_ENDPOINT = '/produtos'; 
const DEFAULT_IMAGE_URL = 'https://cdn-icons-png.flaticon.com/128/70/70972.png'; 

// Função de conversão de File para Base64 (Data URL)
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// --- Função de Listagem (GET) ---

export const getPremios = async (): Promise<Premio[]> => {
  try {
    const response: AxiosResponse<PremioBackend[]> = await api.get(PRODUTOS_ENDPOINT);
    
    // Mapeamento de Backend para Frontend (Mapeia pontos_necessarios para pontos)
    const premiosMapeados: Premio[] = response.data
        .map(premioBackend => ({
            id: premioBackend.id,
            nome: premioBackend.nome,
            descricao: premioBackend.descricao,
            pontos: premioBackend.pontos_necessarios,
            imagemUrl: premioBackend.url_foto || DEFAULT_IMAGE_URL,
        }));
        
    return premiosMapeados; 

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        if (error.response?.status === 401 || error.response?.status === 403) {
             throw new Error("Sua sessão expirou. Faça login novamente.");
        }
        const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao carregar os prêmios do servidor.";
        throw new Error(errorMessage);
    }
    
    throw new Error("Falha na conexão de rede.");
  }
};


// --- Função de Cadastro (POST) ---

// Tipagem da entrada simplificada do componente (RECEBENDO A PROPRIEDADE 'pontos' como string do formulário)
type CadastroInput = Omit<CadastroPremioPayload, 'imagem_data_url' | 'descricao' | 'quantidade' | 'nome_da_promocao' | 'pontos'> & {
    nome: string;
    pontos: string; // Vem do input do formulário
    expira_em: string;
};

export const cadastrarPremio = async (
  dadosFormulario: CadastroInput,
  imagemFile: File | null
): Promise<any> => { 
  
  // 1. Obter e limpar o valor de pontos (Garantindo que a string vazia seja 0)
  const pontosStr = dadosFormulario.pontos?.toString() || '';
  const pontosValor = pontosStr.trim() === '' ? 0 : Number(pontosStr);
  
  if (isNaN(pontosValor)) {
      throw new Error("O valor dos pontos não é um número válido.");
  }
  
  // 2. Montagem do payload final (CORRIGIDO)
  let payload: Partial<CadastroPremioPayload> = { 
    nome: dadosFormulario.nome,
    
    // CAMPO CRÍTICO: Enviamos como 'pontos'
    pontos: pontosValor, 
    
    // VALORES PADRÃO INJETADOS PARA SATISFAZER O BACKEND:
    descricao: "Prêmio resgatável no balcão.", 
    quantidade: 1, 
    nome_da_promocao: null,
  };
  
  // Condicionalmente adicionar expira_em, se não for vazio
  if (dadosFormulario.expira_em && dadosFormulario.expira_em.trim() !== '') {
    payload.expira_em = dadosFormulario.expira_em;
  }

  // 3. Conversão Base64 da imagem (se houver)
  if (imagemFile) {
    try {
      const base64String = await fileToBase64(imagemFile); 
      payload.imagem_data_url = base64String;
    } catch (e) {
      throw new Error("Erro ao converter imagem para Base64.");
    }
  }

  // 4. Requisição POST
  try {
    const response = await api.post(PRODUTOS_ENDPOINT, payload); 
    return response.data;
    
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        console.error("Erro 400 do Backend:", error.response.data);
        
        const errorMessage = (error.response?.data as { error?: string })?.error || "Erro ao cadastrar. Verifique se a data e os pontos estão corretos.";
        throw new Error(errorMessage);
    }
    throw new Error('Não foi possível conectar ao servidor para cadastrar o prêmio.');
  }
};