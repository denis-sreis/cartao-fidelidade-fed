
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import { validarDocumento } from './validador';

function Home() {
  const navigate = useNavigate();
  const [documento, setDocumento] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setErro('');

    if (validarDocumento(documento)) {
      console.log('Documento VÁLIDO. Prosseguindo...');
      navigate('/principal');
    } else {
      setErro('O CPF ou CNPJ informado é inválido.');
    }
  };
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

          <div className="form-group">
            <input
              type="password"
              placeholder="Senha"
              className="form-input"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

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