import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditarDados: React.FC = () => {
  const navigate = useNavigate();

  // Estado para controlar os valores dos inputs
  const [formData, setFormData] = useState({
    nome: 'Denis Reis',
    telefone: '(62) 99999-8888',
    cpf: '123.456.789-00'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados salvos:', formData);
    // Após salvar, volta para a tela de perfil
    navigate('/perfil'); 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      <main className="container" style={{ justifyContent: 'flex-start', flexGrow: 1 }}>
        <div className="card">
          <h2 className="card__title">Dados Pessoais</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite seu nome"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input 
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="Digite seu telefone"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input 
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="Digite seu CPF"
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginTop: '24px' }}>
              <button type="submit" className="btn btn-primary">
                Salvar dados
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditarDados;