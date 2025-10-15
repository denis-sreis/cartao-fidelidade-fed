import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import Cadastro from '../Cadastro/Index';

const Logo = () => (
  <img 
    src="src/assets/Logo - Gorducinhos.jpg" 
    alt="Logo" 
    style={{ width: '120px', marginBottom: '32px' }} 
  />
);

function Home() {
  const navigate = useNavigate();
  const [isCadastroVisible, setCadastroVisible] = useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); 
    navigate('/principal');
  };

  return (
    <>
      <div className="container">
        <Logo />
        <div className="card">
          <h2 className="card__title">Entrar</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input type="text" placeholder="Entre com CPF ou CNPJ" className="form-input" required />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Senha" className="form-input" required />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Entrar</button>
            </div>
            <div className="form-footer-text">
              <span>Primeira vez aqui? </span>
              <a href="#" className="link" onClick={(e) => {
                e.preventDefault();
                setCadastroVisible(true);
              }}>
                Cadastre-se
              </a>
            </div>
          </form>
        </div>
      </div>

      {isCadastroVisible && (
        <Cadastro onClose={() => setCadastroVisible(false)} />
      )}
    </>
  );
}

export default Home;