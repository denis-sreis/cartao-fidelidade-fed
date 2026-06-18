import React, { useState } from 'react';
import { IMaskInput } from 'react-imask';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/index';

const ConcluirCadastro: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Recupera dados passados pela Home (ou define padrões para não quebrar)
  const dadosGoogle = location.state || { nome: "", email: "" };

  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Chama o backend para completar o cadastro
    const resposta = await api.post('/auth/google/completar-cadastro', {
      telefone: telefone.replace(/\D/g, ''),
      documento: cpf.replace(/\D/g, '')
      // Não precisa enviar o email e nome, o backend já os pegou no token
    });

    console.log("Cadastro completado:", resposta.data);
    
    // Salva o token atualizado caso o backend retorne um novo
    if (resposta.data.token) {
        localStorage.setItem('token', resposta.data.token);
    }

    setLoading(false);
    navigate('/principalCliente');

  } catch (error: any) { // <-- Adicione o ': any' aqui
    // Isso vai imprimir exatamente o erro que o Node.js enviou de volta!
    console.error("O Backend respondeu com o erro:", error.response?.data || error.message);
    
    // Mostra um alerta com o erro real na tela para facilitar
    alert("Motivo da falha: " + JSON.stringify(error.response?.data?.error || error.message));
    
    setLoading(false);
  }};

  return (
    <div className="container">
      <div className="card">
        <h2 className="card__title">Concluir Cadastro</h2>
        
        <p style={{ 
          textAlign: 'left', 
          color: 'var(--color-text-secondary)', 
          marginBottom: 'var(--spacing-md)',
          fontSize: '0.9rem' 
        }}>
          Olá, <strong>{dadosGoogle.nome}</strong>. <br />
          Preencha os dados abaixo para ativar seu cartão:
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={dadosGoogle.email}
              className="form-input"
              disabled
              style={{ opacity: 0.6, cursor: 'not-allowed' }}
            />
          </div>

          <div className="form-group">
            <IMaskInput
              mask="000.000.000-00"
              value={cpf}
              onAccept={(value: string) => setCpf(value)}
              placeholder="Digite seu CPF"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <IMaskInput
              mask="(00) 0 0000-0000"
              value={telefone}
              onAccept={(value: string) => setTelefone(value)}
              placeholder="Seu Telefone/WhatsApp"
              className="form-input"
              required
            />
          </div>

          <div className="form-group" style={{ marginTop: 'var(--spacing-lg)' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Finalizar Cadastro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConcluirCadastro;