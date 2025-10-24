import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface CadastroProps {
  onClose: () => void;
}

const SalvarSenha: React.FC<CadastroProps> = ({ onClose }) => {

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>
        <h2 className="card__title" style={{ marginTop: 0 }}>Cadastre sua senha nova</h2>
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <input type="password" placeholder="Crie sua senha" className="form-input" required />
          </div>
          <div className="form-group">

            <div className="form-group">
            <input type="password" placeholder="Confirme sua senha" className="form-input" required />
          </div>

          <div className="form-group"></div>
            <button type="submit" className="btn btn-primary">Salvar Senha</button>
          </div>
          
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default SalvarSenha;