import api from './index';
import axios from 'axios';

interface UpdateUserPayload {
  nome?: string;
  telefone?: string;
  foto_data_url?: string; 
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
export interface PerfilData {
  id: number; // ID do usuário (necessário para o PUT/PATCH)
  nome: string;
  telefone: string;
  documento: string; // CPF ou CNPJ
  tipo: 'cliente' | 'funcionario';
  foto_data_url: string | null; // Base64 da foto
  // Adicione outros campos se o backend retornar
}

export const getPerfilUsuario = async (): Promise<PerfilData> => {
  try {
    // É comum usar um endpoint como /auth/perfil ou /usuario/me
    const response = await api.get('/usuario/me'); // Endpoint sugerido
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao carregar o perfil.";
      throw new Error(errorMessage);
    }
    throw new Error('Não foi possível carregar os dados do perfil.');
  }
};

export const updateDadosUsuario = async (
  idUsuario: number, 
  dados: UpdateUserPayload,
  imagemFile: File | null
): Promise<any> => {
  
  let payload: UpdateUserPayload = { ...dados };

  if (imagemFile) {
    try {
      const base64String = await fileToBase64(imagemFile);
      payload.foto_data_url = base64String;
      console.log('Imagem convertida para Base64. Tamanho:', base64String.length);
    } catch (e) {
      throw new Error("Erro ao converter imagem para Base64.");
    }
  }

  try {
    const response = await api.patch(`/cliente/${idUsuario}`, payload); 
    return response.data;
    
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao salvar os dados.";
      throw new Error(errorMessage);
    }
    throw new Error('Não foi possível conectar ao servidor para atualizar os dados.');
  }
};