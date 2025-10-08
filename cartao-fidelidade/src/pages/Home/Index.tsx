import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); 
    navigate('/principal');
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="card__title">Entrar</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Entre com seu CPF ou CNPJ" 
              className="form-input" 
              required 
            />
          </div>
          
          <div className="form-group">
            <input 
              type="password" 
              placeholder="Senha" 
              className="form-input" 
              required 
            />
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </div>
          
          <div className="form-footer-text">
            <span>Primeira vez aqui? </span>
            <Link to="/cadastro" className="link">Cadastre-se</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;