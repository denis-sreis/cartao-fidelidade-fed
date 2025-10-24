import React from 'react';
import ReactDOM from 'react-dom';


interface EsqueciProps {
  onClose: () => void;
  onEnviarCodigoClick: () => void;
}

const EsqueciSenha: React.FC<EsqueciProps> = ({ onClose, onEnviarCodigoClick }) => {
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    // (Aqui entra a lógica real de enviar o código)

    onEnviarCodigoClick();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>
        <h2 className="card__title" style={{ marginTop: 0 }}>
          Cadastre sua senha nova
        </h2>
        
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <input
              type="tel"
              placeholder="Digite seu Telefone"
              className="form-input"
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