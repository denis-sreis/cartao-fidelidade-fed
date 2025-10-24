import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cadastro from '../Cadastro/Index';
import EsqueciSenha from '../EsqueciSenha/Index';
import SalvarSenha from '../EsqueciSenha/salvarSenha'; 
import ValidarCodigo from '../EsqueciSenha/validarCodigo'; 

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
  const [isEsqueciSenhaVisible, setEsqueciSenhaVisible] = useState(false);
  const [isValidarCodigoVisible, setValidarCodigoVisible] = useState(false); // Renomeei para ficar mais claro
  const [isSalvarSenhaVisible, setSalvarSenhaVisible] = useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); 
    navigate('/principal');
  };

  // 1. O modal EsqueciSenha chama esta função
  const handleTrocarParaValidarCodigo = () => {
    setEsqueciSenhaVisible(false); // Fecha o modal de "Esqueci"
    setValidarCodigoVisible(true);  // Abre o modal de "Validar Código"
  };

  // 2. O modal ValidarCodigo chama esta função
  const handleTrocarParaSalvarSenha = () => {
    setValidarCodigoVisible(false); // Fecha o modal "Validar Código"
    setSalvarSenhaVisible(true);    // Abre o modal "Salvar Senha"
  };

  return (
    <>
      <div className="container">
        {/* ... (Seu Logo e Card de Login não mudam) ... */}
        <Logo />
        <div className="card">
          <h2 className="card__title">Entrar</h2>
          <form onSubmit={handleLogin}>
            {/* ... seus inputs de CPF e Senha ... */}
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
            <div className="form-footer-text">
              <a href="#" className="link" onClick={(e) => {
                e.preventDefault();
                setEsqueciSenhaVisible(true);
              }}>
                Esqueceu sua senha?
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* --- FLUXO DE MODAIS CORRIGIDO --- */}

      {/* Modal de Cadastro */}
      {isCadastroVisible && (
        <Cadastro onClose={() => setCadastroVisible(false)} /> 
      )}
      
      {/* 1. Modal EsqueciSenha */}
      {isEsqueciSenhaVisible && (
        <EsqueciSenha 
          onClose={() => setEsqueciSenhaVisible(false)} 
          // Prop 'onEnviarCodigoClick' definida no EsqueciSenha.tsx
          onEnviarCodigoClick={handleTrocarParaValidarCodigo}
        /> 
      )}

      {/* 2. Modal ValidarCodigo (Este estava faltando) */}
      {isValidarCodigoVisible && (
        <ValidarCodigo
          onClose={() => setValidarCodigoVisible(false)}
          // Prop 'onValidadoClick' que vamos definir no ValidarCodigo.tsx
          onValidadoClick={handleTrocarParaSalvarSenha}
        />
      )}

      {/* 3. Modal SalvarSenha */}
      {isSalvarSenhaVisible && (
        <SalvarSenha
          onClose={() => setSalvarSenhaVisible(false)}
          // SalvarSenha (pelo seu código) só precisa do onClose
        />
      )}
    </>
  );
}

export default Home;