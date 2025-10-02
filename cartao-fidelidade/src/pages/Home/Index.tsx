import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {

  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); 
    navigate('/principal');
  };

  return (
    <div className="layout-login">
      <div className="borda_login">
        <center>
          <form className="form-login" onSubmit={handleLogin}>
            <div className="tituloLogin">
              <span className="title-login"><h2>Entrar</h2></span>
            </div>
            <div className="div-CPF-CNPJ">
              <input type="text" placeholder="Entre com CPF ou CNPJ" className="Input-login" required />
            </div>
            <div className="div-Senha">
              <input type="password" placeholder="Senha" className="Input-login" required />
            </div>
            <center>
              
              <Link to="/esqueci-senha" className="link-Esqueci">Esqueci minha senha</Link>
            </center>
            <div className="Botão-Entrar">
              
              <button type="submit" className="Button-login">Entrar</button>
            </div>
            <div className="div-Primeira_vez">
              <span className="Primeiravez">Primeira vez Aqui? &nbsp;</span>
              
              <Link to="/cadastro" className="Cadastre-se">Cadastre-se</Link>
            </div>
          </form>
        </center>
      </div>
    </div>
  );
}

export default Home;