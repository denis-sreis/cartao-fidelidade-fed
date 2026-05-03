import { useState, useEffect } from 'react';
import api from '../api/index';

const normalizarBase64ParaDataUrl = (rawValue: string): string => {
  if (rawValue.startsWith('data:')) {
    return rawValue;
  }

  const cleanedValue = rawValue.trim();
  return `data:image/png;base64,${cleanedValue}`;
};

export const useImageBase64 = (id: number | null) => {
  const [base64, setBase64] = useState<string | null>(null);

  useEffect(() => {
    if (!id || id === 0) return; // ADICIONE ISSO: Se o ID for 0, não faz nada.

    const carregarImagem = async () => {
      try {
        // Faz uma requisição GET normal (que o CORS permite) em vez de carregar via tag <img>
        const response = await api.get(`/produtos/${id}`);
        const rawImage = response.data.imagem?.base64 || response.data.imagem || null;

        if (rawImage) {
          setBase64(normalizarBase64ParaDataUrl(rawImage));
        } else {
          setBase64(null);
        }
      } catch (err) {
        console.error("Erro ao buscar base64 da imagem", err);
      }
    };

    carregarImagem();
  }, [id]);

  return base64;
};