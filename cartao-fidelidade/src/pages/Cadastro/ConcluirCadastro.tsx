import { useState } from 'react'; // Removi o 'React' não utilizado
import { IMaskInput } from 'react-imask';
import { useNavigate } from 'react-router-dom';

interface DadosGoogle {
  nome: string;
  email: string;
}

interface ConcluirCadastroProps {
  dadosGoogle: DadosGoogle;
}

const ConcluirCadastro: React.FC<ConcluirCadastroProps> = ({ dadosGoogle }) => {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    const payload = {
      email: dadosGoogle.email,
      nome: dadosGoogle.nome,
      cpf: cpf.replace(/\D/g, ''),
      telefone: telefone.replace(/\D/g, '')
    };

    try {
      console.log("Enviando dados finais:", payload);
      // await api.post('/auth/concluir-cadastro', payload);
      navigate('/principalCliente');
    } catch (err) {
      setErro("Falha ao salvar dados. Verifique a conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="card__title">Quase lá!</h2>
        
        <p style={{ 
          textAlign: 'left', 
          color: 'var(--color-text-secondary)', 
          marginBottom: 'var(--spacing-md)',
          fontSize: '0.9rem' 
        }}>
          Olá, <strong>{dadosGoogle.nome}</strong>. <br />
          Para completar seu perfil fidelidade, informe:
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
              placeholder="WhatsApp"
              className="form-input"
              required
            />
          </div>

          {erro && <p style={{ color: 'red', fontSize: '0.8rem', marginBottom: '10px' }}>{erro}</p>}

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