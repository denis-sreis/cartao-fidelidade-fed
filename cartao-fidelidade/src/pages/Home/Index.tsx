import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    setErro('');

    const { error } = loginSchema.validate(
      { documento, senha },
      { abortEarly: false }
    );

    if (error) {
      setErro(error.details[0].message);
      return;
    }

    console.log('Dados VÁLIDOS. Prosseguindo...');
    const docApenasNumeros = documento.replace(/[^\d]/g, '');
    if (docApenasNumeros.length === 11) {
      navigate('/principal');
    } else if (docApenasNumeros.length === 14) {
      navigate('/admin');
    }
  };

  const getPasswordStrength = () => {
    let strength = 0;
    if (reqLowercase) strength++;
    if (reqNumber) strength++;
    if (reqSpecialChar) strength++;
    if (reqMinLength) strength++;

    if (strength === 4) return { text: 'Excelente', color: '#28a745' };
    if (strength >= 3) return { text: 'Boa', color: '#ffc107' };
    if (strength >= 1) return { text: 'Fraca', color: '#dc3545' };
    return { text: 'Muito Fraca', color: '#6c757d' };
  };

  const strength = getPasswordStrength();
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