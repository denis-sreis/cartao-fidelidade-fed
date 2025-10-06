// src/pages/Cadastro/Index.tsx --- SUBSTITUA TUDO POR ISTO ---

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'cliente' | 'empresa'>('cliente');

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Registrando novo usuário do tipo:", userType);
    navigate('/principal');
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="card__title">Cadastre-se</h2>

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
            <button type="submit" className="btn btn-primary">
              Criar conta
            </button>
          </div>
          
          <div className="form-footer-text">
            <span>Já tem uma conta? </span>
            <Link to="/" className="link">Faça login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;