import api from './index';
import axios, { type AxiosResponse } from 'axios'; 

export interface RegisterPayload {
  nome: string;
  telefone: string;
  documento: string;
  senha: string;
  tipo: 'cliente' | 'funcionario';
}


export interface RegisterSuccessResponse {
  token: string;
}

interface AuthErrorResponse {
  mensagem?: string;
  error?: string;
}

export const register = async (payload: RegisterPayload): Promise<RegisterSuccessResponse> => {
  try {
    const response: AxiosResponse<RegisterSuccessResponse> = await api.post(
      '/auth/register',
      payload
    );

    const { token } = response.data;
    
    if (token) {
      localStorage.setItem('authToken', token);
    }

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) { 
      const errorData: AuthErrorResponse = error.response.data;
      
      const errorMessage = errorData.mensagem || errorData.error || 'Erro ao realizar cadastro.';
      throw new Error(errorMessage);
    }
    
    throw new Error('Não foi possível conectar ao servidor.');
  }
};