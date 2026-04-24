// src/api/cliente.ts

import api from "./index";
import axios, { type AxiosResponse } from "axios";

const BASE_URL_IMAGEM = "http://localhost:3000/api/imagens";

export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  documento: string;
  tipo: string;
  pontos: number;
  imagem?: string | null; 
  imagem_id?: number | null; 
  foto_data_url?: string | null;
  email?: string;
  imagem?: string | null;
  imagem_id?: number | null;
  foto_data_url?: string | null;
  pontos?: number;
  premios_resgatados?: string[];
  metas_cumpridas?: boolean;
}

interface ClienteRawResponse extends Cliente {
  foto?: {
    base64?: string;
    mimeType?: string;
  };
  foto_imagem_id?: number;
  url_foto?: string;
}

// DEFINIÇÃO DOS ENDPOINTS (Isso resolve o erro de "Cannot find name 'CLIENTE_ENDPOINT'")
const CLIENTE_ENDPOINT = "/cliente";
const AUTH_ME_ENDPOINT = "/auth/me";
const CLIENTE_ME_ENDPOINT = "/cliente/me";
const CLIENTE_FOTO_ENDPOINT = "/cliente/me/foto";

/**
 * Formata o CPF para o padrão 000.000.000-00
 */
const formatarCPF = (documento: string): string => {
  if (!documento) return "Não informado";
  const apenasNumeros = documento.replace(/\D/g, "");
  if (apenasNumeros.length !== 11) return documento;

  // Correção da Regex para formatar corretamente
  return apenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

/**
 * Processa a imagem do usuário
 */
const processarImagemUsuario = (
  data: ClienteRawResponse | null,
): string | null => {
  if (!data) return null;

  if (data.foto && data.foto.base64) {
    const mime = data.foto.mimeType || "image/jpeg";
    return `data:${mime};base64,${data.foto.base64}`;
  }

  if (data.imagem_id || data.foto_imagem_id) {
    const id = data.imagem_id || data.foto_imagem_id;
    return `${BASE_URL_IMAGEM}/${id}`;
  }

  const img =
    data.imagem ||
    data.url_foto ||
    (typeof data.foto === "string" ? data.foto : null);

  if (img && typeof img === "string") {
    if (img.startsWith("http") || img.startsWith("data:")) {
      return img;
    }
    return `http://localhost:3000/${img.replace(/^\//, "")}`;
  }

  return null;
};

export const getClientes = async (): Promise<Cliente[]> => {
  try {
    const response: AxiosResponse<ClienteRawResponse[]> =
      await api.get(CLIENTE_ENDPOINT);

    return response.data.map((cliente: ClienteRawResponse) => ({
      ...cliente,
      documento: formatarCPF(cliente.documento),
      foto_data_url: processarImagemUsuario(cliente),
    }));
  } catch (error) {
    handleAxiosError(error, "Erro ao buscar lista de clientes.");
    throw error;
  }
};

export const getClienteById = async (id: number): Promise<Cliente> => {
  try {
    const response: AxiosResponse<ClienteRawResponse> = await api.get(
      `${CLIENTE_ENDPOINT}/${id}`,
    );
    const dados = response.data;

    return {
      ...dados,
      documento: formatarCPF(dados.documento),
      foto_data_url: processarImagemUsuario(dados),
    };
  } catch (error) {
    handleAxiosError(error, "Erro ao buscar detalhes do cliente.");
    throw error;
  }
};

export const getUsuarioLogado = async (): Promise<Cliente> => {
  try {
    const response: AxiosResponse<ClienteRawResponse> =
      await api.get(AUTH_ME_ENDPOINT);
    const dados = response.data;

    return {
      ...dados,
      documento: formatarCPF(dados.documento),
      foto_data_url: processarImagemUsuario(dados),
    };
  } catch (error) {
    handleAxiosError(error, "Erro ao carregar seu perfil.");
    throw error;
  }
};

export const atualizarMeusDados = async (
  dados: Partial<Cliente>,
): Promise<Cliente> => {
  try {
    const response: AxiosResponse<Cliente> = await api.put(
      CLIENTE_ME_ENDPOINT,
      dados,
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Erro ao atualizar seus dados.");
    throw error;
  }
};

export const atualizarFotoPerfil = async (arquivo: File): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("imagem", arquivo);

    await api.put(CLIENTE_FOTO_ENDPOINT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    handleAxiosError(error, "Erro ao enviar a foto de perfil.");
    throw error;
  }
};

const handleAxiosError = (error: unknown, defaultMessage: string) => {
  console.error("ERRO API:", error);

  if (axios.isAxiosError(error) && error.response) {
    const data = error.response.data as { message?: string };
    const errorMessage = data.message || defaultMessage;
    throw new Error(errorMessage);
  }
  throw new Error("Erro de conexão com o servidor.");
};
