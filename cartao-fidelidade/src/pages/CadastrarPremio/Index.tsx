// src/pages/CadastrarPremio/Index.tsx

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { cadastrarPremio } from '../../api/produto'; 

interface CadastrarPremioProps {
  onClose: () => void;
  onSuccess?: () => void; 
}

// Definição do limite de tamanho (0.5 MB = 500 KB) para mitigar o 413
const MAX_IMAGE_SIZE_MB = 0.5; 
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

const CadastrarPremio: React.FC<CadastrarPremioProps> = ({ onClose, onSuccess }) => {
  
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nomePremio: '',
    pontos: '',
    duracao: '' 
  });

  const [imagemSelecionada, setImagemSelecionada] = useState<File | null>(null);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0');
  const minDate = `${year}-${month}-${day}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Mitigação do 413: Verifica o tamanho do arquivo
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        alert(`Erro: A imagem excede o tamanho máximo permitido de ${MAX_IMAGE_SIZE_MB} MB. Selecione uma imagem menor.`);
        e.target.value = '';
        setImagemSelecionada(null);
        return;
      }
      
      setImagemSelecionada(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setLoading(true);

    // Payload enviado diretamente com os nomes do formulário
    const payload = {
      nome: formData.nomePremio,
      pontos: formData.pontos, // Enviado como string, será convertido na API
      expira_em: formData.duracao,
    };

    try {
        await cadastrarPremio(payload, imagemSelecionada);
        
        alert('Prêmio cadastrado com sucesso!'); 
        if (onSuccess) onSuccess(); 
        onClose();

    } catch (err) {
        if (err instanceof Error) {
             let message = err.message;
             if (message.includes("413")) {
                 message = "A imagem é muito grande. Tente usar uma imagem com menos de 500 KB.";
             } else if (message.includes("400")) {
                 // A mensagem de erro específica do backend virá daqui
                 message = "Erro ao cadastrar. " + message;
             }
            setApiError(message);
        } else {
            setApiError('Ocorreu um erro desconhecido ao cadastrar o prêmio.');
        }
    } finally {
        setLoading(false);
    }
  };
  
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>
        <h2 className="card__title" style={{ marginTop: 0 }}>Novo Prêmio</h2>

        <form onSubmit={handleSubmit}>
        <p style={{textAlign: 'left', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)'}}>Informações Principais</p>
          
          <div className="form-group">
            <input 
                type="text" 
                name="nomePremio" 
                value={formData.nomePremio} 
                onChange={handleChange} 
                placeholder="Nome do Prêmio" 
                className="form-input" 
                required 
                disabled={loading} 
            />
          </div>
          <div className="form-group">
            <input 
                type="number" 
                min="0" 
                name="pontos" 
                value={formData.pontos} 
                onChange={handleChange} 
                placeholder="Quantidade de pontos" 
                className="form-input" 
                required 
                disabled={loading} 
            />
          </div>

          <div className="file-input-wrapper">
            <label htmlFor="file-upload" className="file-input-label">
              {imagemSelecionada ? 'Imagem selecionada' : 'Escolha uma imagem da galeria'}
            </label>
            <input 
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input-hidden"
              disabled={loading}
            />
            {imagemSelecionada && (
              <p className="file-name-display">{imagemSelecionada.name}</p>
            )}
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Máximo: {MAX_IMAGE_SIZE_MB} MB
            </p>
          </div>

          <div className="form-group">
            <p style={{textAlign: 'left', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)'}}>Válido até:</p>
            <input
                placeholder="Duração da promoção"
              type="date"
              name="duracao"
              value={formData.duracao}
              onChange={handleChange}
              className="form-input" 
              required
              min={minDate} 
              disabled={loading}
            />
          </div>
          
          {apiError && <p style={{ color: 'red', textAlign: 'center', marginTop: 'var(--spacing-sm)' }}>{apiError}</p>}

          <div className="form-group" style={{ marginTop: 'var(--spacing-lg)' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Criando...' : 'Criar promoção'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default CadastrarPremio;