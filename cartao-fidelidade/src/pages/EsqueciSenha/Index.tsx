import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// 1. Mude a importação. Não usamos mais 'react-input-mask'
import { IMaskInput } from 'react-imask';

interface EsqueciProps {
  onClose: () => void;
  onEnviarCodigoClick: () => void;
}

const EsqueciSenha: React.FC<EsqueciProps> = ({ onClose, onEnviarCodigoClick }) => {
  const [telefone, setTelefone] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    // (Lógica para enviar o 'telefone' para a API)
    console.log('Enviando código para:', telefone);

    onEnviarCodigoClick();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>
        <h2 className="card__title" style={{ marginTop: 0 }}>
          Recuperar Senha
        </h2>
        
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            {/* 2. Substitua pelo <IMaskInput> (o mesmo do seu Home) */}
            <IMaskInput
              mask="(00) 00000-0000" // Máscara para celular
              value={telefone}
              // 3. A prop correta para 'react-imask' é 'onAccept'
              onAccept={(value: string) => setTelefone(value)}
              className="form-input"
              placeholder="Digite seu Telefone"
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Enviar código
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default EsqueciSenha;