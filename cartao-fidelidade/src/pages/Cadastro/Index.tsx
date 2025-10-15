import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface CadastroProps {
  onClose: () => void;
}

const Cadastro: React.FC<CadastroProps> = ({ onClose }) => {
  const [userType, setUserType] = useState<'cliente' | 'empresa'>('cliente');

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>
        <h2 className="card__title" style={{ marginTop: 0 }}>Cadastre-se</h2>
        
        <div className="toggle-group">
          <button 
            className={`toggle-btn ${userType === 'cliente' ? 'active' : ''}`}
            onClick={() => setUserType('cliente')}
            type="button"
          >
            Sou cliente
          </button>
          <button 
            className={`toggle-btn ${userType === 'empresa' ? 'active' : ''}`}
            onClick={() => setUserType('empresa')}
            type="button"
          >
            Sou empresa
          </button>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <input type="text" placeholder="Digite seu nome" className="form-input" required />
          </div>
          <div className="form-group">
            <input type="tel" placeholder="Digite seu telefone" className="form-input" required />
          </div>
          {userType === 'cliente' ? (
            <div className="form-group">
              <input type="text" placeholder="Digite seu CPF" className="form-input" required />
            </div>
          ) : (
            <div className="form-group">
              <input type="text" placeholder="Digite seu CNPJ" className="form-input" required />
            </div>
          )}
          <div className="form-group">
            <input type="password" placeholder="Crie sua senha" className="form-input" required />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Criar conta</button>
          </div>
          <div className="form-footer-text">
            <span>Já tem uma conta? </span>
            <a href="#" className="link" onClick={(e) => { e.preventDefault(); onClose(); }}>
              Faça login
            </a>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default Cadastro;