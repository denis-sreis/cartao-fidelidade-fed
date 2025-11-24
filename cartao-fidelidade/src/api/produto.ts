// src/api/produto.ts

import api from './index'; 
import axios, { type AxiosResponse } from 'axios'; // Corrigido: usando type para AxiosResponse
import qs from 'qs'; // Módulo qs para serialização (após instalação)

// --- Configurações e URLs (Movidas para o Topo) ---

const PRODUTOS_ENDPOINT = '/produtos'; 
const BASE_URL_IMAGEM = 'http://localhost:3000/api/imagens'; 
const DEFAULT_IMAGE_URL = 'https://cdn-icons-png.flaticon.com/128/70/70972.png'; 

// --- Interfaces de Dados ---
// ... (Interfaces de Premio, CadastroPremioPayload, PremioBackend mantidas) ...

export interface Premio {
  id: number;
  nome: string;
  pontos: number; 
  imagemUrl: string; 
  descricao?: string; 
}

export interface CadastroPremioPayload {
  nome: string; 
  pontos: number; 
  expira_em?: string; 
  
  dia_expira?: number;
  mes_expira?: number;
  ano_expira?: number;
  
  descricao: string; 
  quantidade: number;
  nome_da_promocao: string | null; 
  
  base64Image?: string; 
  imagem_nome?: string;
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

// --- Funções Auxiliares ---

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
    
    const premiosMapeados: Premio[] = response.data
        .map(premioBackend => {
            
            const imagemUrlFinal = premioBackend.imagem_id 
                ? `${BASE_URL_IMAGEM}/${premioBackend.imagem_id}` 
                : DEFAULT_IMAGE_URL; 
            
            return {
                id: premioBackend.id,
                nome: premioBackend.nome,
                descricao: premioBackend.descricao,
                pontos: premioBackend.pontos_necessarios,
                imagemUrl: imagemUrlFinal,
            };
        });
        
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

type CadastroInput = {
    nome: string;
    pontos: string; 
    expira_em: string; 
};

export const cadastrarPremio = async (
  dadosFormulario: CadastroInput,
  imagemFile: File | null
): Promise<any> => { 
  
  const pontosStr = dadosFormulario.pontos?.toString() || '';
  const pontosValor = pontosStr.trim() === '' ? 0 : Number(pontosStr);
  
  if (isNaN(pontosValor)) {
      throw new Error("O valor dos pontos não é um número válido.");
  }

  // Mapeamento da Data de expiração (YYYY-MM-DD -> Campos separados)
  let dia_expira: number | undefined, mes_expira: number | undefined, ano_expira: number | undefined;
  if (dadosFormulario.expira_em) {
      const parts = dadosFormulario.expira_em.split('-'); 
      if (parts.length === 3) {
          ano_expira = Number(parts[0]);
          mes_expira = Number(parts[1]);
          dia_expira = Number(parts[2]);
      }
  }

  // 1. Montar o objeto JavaScript (que será serializado por qs)
  let payloadObject: Record<string, any> = { 
    nome: dadosFormulario.nome,
    pontos: pontosValor, // Enviado como número, mas será serializado como string pelo qs
    
    // CAMPOS DE DATA NECESSÁRIOS PELO BACKEND
    ...(dia_expira !== undefined && { dia_expira }),
    ...(mes_expira !== undefined && { mes_expira }),
    ...(ano_expira !== undefined && { ano_expira }),
    
    // VALORES PADRÃO INJETADOS
    descricao: "Prêmio resgatável no balcão.", 
    quantidade: 1, 
    nome_da_promocao: null,
  };

  // 2. Conversão Base64 e Adição ao Payload
  if (imagemFile) {
    try {
      const base64String = await fileToBase64(imagemFile); 
      
      // CRÍTICO: Base64 e Nome são adicionados diretamente ao objeto
      payloadObject.base64Image = base64String;
      payloadObject.imagem_nome = imagemFile.name; 
      
    } catch (e) {
      throw new Error("Erro ao converter imagem para Base64.");
    }
  }
  
  // 3. SERIALIZAÇÃO CRÍTICA: Converter o objeto para a string 'x-www-form-urlencoded'
  const postData = qs.stringify(payloadObject);


  // 4. Requisição POST
  try {
    const response = await api.post(PRODUTOS_ENDPOINT, postData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }); 
    return response.data;
    
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        console.error("Erro 400 do Backend (Post Data):", error.response.data);
        
        const errorMessage = (error.response?.data as { error?: string })?.error || "Erro ao cadastrar. O backend rejeitou os dados Post Data.";
        throw new Error(errorMessage);
    }
    throw new Error('Não foi possível conectar ao servidor para cadastrar o prêmio.');
  }
};