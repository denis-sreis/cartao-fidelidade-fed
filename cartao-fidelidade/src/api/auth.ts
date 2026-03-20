import api from './index';
import axios, { type AxiosResponse } from 'axios'; 

interface LoginPayload {
  documento: string;
  senha: string;
}

interface LoginSuccessResponse {
  token: string;
}

interface LoginErrorResponse {
  mensagem?: string;
  error?: string;
}

export const login = async (payload: LoginPayload): Promise<LoginSuccessResponse> => {
  try {
    const response: AxiosResponse<LoginSuccessResponse> = await api.post(
      '/auth/login', 
      payload
    );

    const { token } = response.data;
    
    if (token) {
      localStorage.setItem('authToken', token);
    }

    return response.data;

  } catch (error) {

    if (axios.isAxiosError(error) && error.response) { 
      const errorData: LoginErrorResponse = error.response.data;
      
      const errorMessage = errorData.mensagem || errorData.error || 'Credenciais inválidas.';
      throw new Error(errorMessage);
    }
    
    throw new Error('Não foi possível conectar ao servidor ou ocorreu um erro desconhecido.');
  }
};

export const logout = (): void => {
    localStorage.removeItem('authToken');
};