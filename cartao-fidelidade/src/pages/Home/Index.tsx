import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask'; 
import { loginSchema } from '../Home/validador'; 

import Cadastro from '../Cadastro/Index';
import EsqueciSenha from '../EsqueciSenha/Index';
import SalvarSenha from '../EsqueciSenha/salvarSenha';
import ValidarCodigo from '../EsqueciSenha/validarCodigo';

const urlOlhoFechado = 'https://cdn-icons-png.flaticon.com/128/3178/3178377.png';
const urlOlhoAberto = 'https://cdn-icons-png.flaticon.com/128/158/158746.png';

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
  const [isValidarCodigoVisible, setValidarCodigoVisible] = useState(false);
  const [isSalvarSenhaVisible, setSalvarSenhaVisible] = useState(false);

  const [documento, setDocumento] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setSenha(newPassword);
    if (erro && newPassword.length > 0) {
      setErro('');
    }
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setErro('');

    const { error } = loginSchema.validate({ documento });

    if (error) {
      setErro(error.details[0].message);
      return;
    }

    console.log('Prosseguindo com o login...');
    const docApenasNumeros = documento.replace(/[^\d]/g, '');

    if (docApenasNumeros.length === 11) {
      navigate('/principalCliente');
    } else if (docApenasNumeros.length === 14) {
      navigate('/principalADM');
    }
    // Aqui adicionar a chamada de API de login real
  };
  
  const handleTrocarParaValidarCodigo = () => {
    setEsqueciSenhaVisible(false);
    setValidarCodigoVisible(true);
  };

  const handleTrocarParaSalvarSenha = () => {
    setValidarCodigoVisible(false);
    setSalvarSenhaVisible(true);
  };

  const mascara = [
    { mask: '000.000.000-00' },
    { mask: '00.000.000/0000-00' }
  ];

  return (
    <>
      <div className="container">
        <Logo /> 
        <div className="card">
          <h2 className="card__title">Entrar</h2>
          
          <form onSubmit={handleLogin}>
            
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

            {erro && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{erro}</p>}

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