import React from 'react';
import { Link } from 'react-router-dom';

const PerfilCliente: React.FC = () => {
  // Dados do cliente ficticio, provavelmente vamos puxar de uma API no futuro)
  const cliente = {
    nome: 'Denis Reis',
    telefone: '(62) 99999-8888',
    cpf: '123.456.789-00'
  };

  return (
    // Usamos um container diferente para não centralizar o card
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* O container agora só aplica o padding lateral */}
      <main className="container" style={{ justifyContent: 'flex-start', flexGrow: 1 }}>
        <div className="card">
          <h2 className="card__title">Dados Pessoais</h2>
          
          <div className="data-field">{cliente.nome}</div>
          <div className="data-field">{cliente.telefone}</div>
          <div className="data-field">{cliente.cpf}</div>
          
          <div className="form-group" style={{ marginTop: '24px' }}>
            <Link to="/editar-dados" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Editar dados
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PerfilCliente;