import api from './index'; 
import axios, { type AxiosResponse } from 'axios'; 

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
  
  descricao: string; 
  quantidade: number;
  nome_da_promocao: string | null; 
  
  imagem_data_url?: string; 
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


const PRODUTOS_ENDPOINT = '/produtos'; 
const DEFAULT_IMAGE_URL = 'https://cdn-icons-png.flaticon.com/128/70/70972.png'; 

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};


export const getPremios = async (): Promise<Premio[]> => {
  try {
    const response: AxiosResponse<PremioBackend[]> = await api.get(PRODUTOS_ENDPOINT);
    
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


type CadastroInput = Omit<CadastroPremioPayload, 'imagem_data_url' | 'descricao' | 'quantidade' | 'nome_da_promocao' | 'pontos'> & {
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
  
  let payload: Partial<CadastroPremioPayload> = { 
    nome: dadosFormulario.nome,
    
    pontos: pontosValor, 
    
    descricao: "Prêmio resgatável no balcão.", 
    quantidade: 1, 
    nome_da_promocao: null,
  };
  
  if (dadosFormulario.expira_em && dadosFormulario.expira_em.trim() !== '') {
    payload.expira_em = dadosFormulario.expira_em;
  }

  if (imagemFile) {
    try {
      const base64String = await fileToBase64(imagemFile); 
      payload.imagem_data_url = base64String;
    } catch (e) {
      throw new Error("Erro ao converter imagem para Base64.");
    }
  }

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