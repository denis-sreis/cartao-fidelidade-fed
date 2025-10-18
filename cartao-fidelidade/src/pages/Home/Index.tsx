import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';

import {
  loginSchema,
  hasLowercase,
  hasUppercase,
  hasNumber,
  hasSpecialChar,
} from './validador';

import './Home.css';

const Link_olho_fechado = 'https://cdn-icons-png.flaticon.com/128/3178/3178377.png'
const Link_olho_aberto = 'https://cdn-icons-png.flaticon.com/128/158/158746.png'


function Home() {
  const navigate = useNavigate();
  const [documento, setDocumento] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [reqLowercase, setReqLowercase] = useState(false);
  const [reqNumber, setReqNumber] = useState(false);
  const [reqSpecialChar, setReqSpecialChar] = useState(false);
  const [reqMinLength, setReqMinLength] = useState(false);

  const updatePasswordRequirements = (currentPassword: string) => {
    setReqLowercase(hasLowercase(currentPassword) && hasUppercase(currentPassword));
    setReqNumber(hasNumber(currentPassword));
    setReqSpecialChar(hasSpecialChar(currentPassword));
    setReqMinLength(currentPassword.length >= 8);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setSenha(newPassword);
    updatePasswordRequirements(newPassword);
    if (erro && newPassword.length > 0) {
      setErro('');
    }
  };

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
    <div className="container">
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
              onFocus={() => setShowPasswordRequirements(true)}
              onBlur={() => setShowPasswordRequirements(false)}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? Link_olho_aberto : Link_olho_fechado}
                alt="Mostrar/Ocultar Senha"
                width="20"
                height="20"
              />
            </span>
          </div>

          {showPasswordRequirements && (
            <div className="password-requirements-box">
              <p>Sua senha deve incluir:</p>
              <ul>
                <li className={reqLowercase ? 'checked' : ''}>
                  {reqLowercase ? '✅' : '❌'} Letras minúsculas e maiúsculas
                </li>
                <li className={reqNumber ? 'checked' : ''}>
                  {reqNumber ? '✅' : '❌'} Um número (0-9)
                </li>
                <li className={reqSpecialChar ? 'checked' : ''}>
                  {reqSpecialChar ? '✅' : '❌'} Um caractere especial (!@#$%^&*)
                </li>
                <li className={reqMinLength ? 'checked' : ''}>
                  {reqMinLength ? '✅' : '❌'} No mínimo 8 caracteres
                </li>
              </ul>
              <div className="password-strength">
                <span>Força da Senha: </span>
                <span style={{ color: strength.color, fontWeight: 'bold' }}>
                  {strength.text}
                </span>
              </div>
            </div>
          )}

          {erro && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{erro}</p>}

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