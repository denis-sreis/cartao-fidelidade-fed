// src/pages/Home/Index.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask'; // <--- Adicionado do Gustavo
import { loginSchema } from '../Home/validador'; // <--- Adicionado do Gustavo

// Componentes do Denis
import Cadastro from '../Cadastro/Index';
import EsqueciSenha from '../EsqueciSenha/Index';
import SalvarSenha from '../EsqueciSenha/salvarSenha';
import ValidarCodigo from '../EsqueciSenha/validarCodigo';

// Constantes do Gustavo
const urlOlhoFechado = 'https://cdn-icons-png.flaticon.com/128/3178/3178377.png';
const urlOlhoAberto = 'https://cdn-icons-png.flaticon.com/128/158/158746.png';

// Logo do Denis
const Logo = () => (
  <img
    src="src/assets/Logo - Gorducinhos.jpg"
    alt="Logo"
    style={{ width: '120px', marginBottom: '32px' }}
  />
);

function Home() {
  const navigate = useNavigate();
  
  // States do Denis (modais)
  const [isCadastroVisible, setCadastroVisible] = useState(false);
  const [isEsqueciSenhaVisible, setEsqueciSenhaVisible] = useState(false);
  const [isValidarCodigoVisible, setValidarCodigoVisible] = useState(false);
  const [isSalvarSenhaVisible, setSalvarSenhaVisible] = useState(false);

  // States do Gustavo (formulário)
  const [documento, setDocumento] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Handler de senha do Gustavo
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setSenha(newPassword);
    if (erro && newPassword.length > 0) {
      setErro('');
    }
  };

  // Lógica de Login (MERGE)
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setErro('');

    // 1. Usa a validação Joi do Gustavo
    const { error } = loginSchema.validate({ documento });

    if (error) {
      setErro(error.details[0].message);
      return;
    }

    // 2. Se a validação passou, usa a lógica de navegação do Gustavo
    console.log('Prosseguindo com o login...');
    const docApenasNumeros = documento.replace(/[^\d]/g, '');

    if (docApenasNumeros.length === 11) {
      navigate('/principalCliente');
    } else if (docApenasNumeros.length === 14) {
      navigate('/principalADM');
    }
    // Aqui você adicionaria a chamada de API de login real
  };
  
  // Handlers de modais do Denis
  const handleTrocarParaValidarCodigo = () => {
    setEsqueciSenhaVisible(false);
    setValidarCodigoVisible(true);
  };

  const handleTrocarParaSalvarSenha = () => {
    setValidarCodigoVisible(false);
    setSalvarSenhaVisible(true);
  };

  // Máscara do Gustavo
  const mascara = [
    { mask: '000.000.000-00' },
    { mask: '00.000.000/0000-00' }
  ];

  return (
    <>
      <div className="container">
        <Logo /> {/* <--- Logo do Denis */}
        <div className="card">
          <h2 className="card__title">Entrar</h2>
          
          {/* Formulário com merge do Gustavo e Denis */}
          <form onSubmit={handleLogin}>
            
            {/* Input com Máscara do Gustavo */}
            <div className="form-group">
              <IMaskInput
                mask={mascara}
                value={documento}
                onAccept={(value: string) => setDocumento(value)}
                placeholder="Entre com seu CPF ou CNPJ"
                className="form-input"
                required
              />
            </div>
            
            {/* Input de Senha com Toggle do Gustavo */}
            <div className="form-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                className="form-input"
                value={senha}
                onChange={handlePasswordChange}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? urlOlhoAberto : urlOlhoFechado}
                  alt="Mostrar/Ocultar Senha"
                  className="eye-icon"
                />
              </span>
            </div>

            {/* Display de Erro do Gustavo */}
            {erro && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{erro}</p>}

            <div className="form-group">
              <button type="submit" className="btn btn-primary">Entrar</button>
            </div>
            
            {/* Links de navegação/modal do Denis */}
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

      {/* --- FLUXO DE MODAIS DO DENIS (Mantido) --- */}
      {isCadastroVisible && (
        <Cadastro onClose={() => setCadastroVisible(false)} />
      )}
      
      {isEsqueciSenhaVisible && (
        <EsqueciSenha
          onClose={() => setEsqueciSenhaVisible(false)}
          onEnviarCodigoClick={handleTrocarParaValidarCodigo}
        />
      )}

      {isValidarCodigoVisible && (
        <ValidarCodigo
          onClose={() => setValidarCodigoVisible(false)}
          onValidadoClick={handleTrocarParaSalvarSenha}
        />
      )}

      {isSalvarSenhaVisible && (
        <SalvarSenha
          onClose={() => setSalvarSenhaVisible(false)}
        />
      )}
    </>
  );
}

export default Home;