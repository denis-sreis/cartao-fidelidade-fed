import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IMaskInput } from 'react-imask';
import EditarDados from '../EditarDados/Index';
import { getUsuarioLogado, type Cliente } from '../../api/cliente'; 

interface PerfilProps {
  onClose: () => void;
}

const PerfilCliente: React.FC<PerfilProps> = ({ onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setIsLoading(true);
        const dados = await getUsuarioLogado();
        const dadosFinais = (dados as any).user || (dados as any).data || dados;
        setCliente(dadosFinais);
      } catch (err) {
        if (err instanceof Error) {
            setErro(err.message);
        } else {
            setErro('Erro desconhecido ao carregar perfil.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    carregarDados();
  }, []);

  if (isLoading) {
     return ReactDOM.createPortal(
      <div className="modal-overlay">
        <div className="modal-sheet">
          <p style={{ padding: '20px', textAlign: 'center' }}>Carregando dados do usuário...</p>
        </div>
      </div>,
      document.getElementById('modal-root')!
    );
  }

  if (isEditing && cliente) {
    return <EditarDados dadosAtuais={cliente} onClose={() => setIsEditing(false)} />;
  }

  const textInputStyle = {
      fontSize: '1.1rem',
      background: 'transparent',
      border: 'none',
      width: '100%',
      color: 'inherit',
      padding: 0,
      cursor: 'default'
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>
        <h2 className="card__title" style={{ marginTop: 0 }}>Dados Pessoais</h2>
        
        {erro && <div style={{ color: 'red', textAlign: 'center', marginBottom: 15 }}>{erro}</div>}

        {cliente ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                {cliente.imagem ? (
                    <img 
                        src={cliente.imagem} 
                        alt="Foto de perfil" 
                        style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #eee' }}
                    />
                ) : (
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '2rem', color: '#999' }}>{cliente.nome?.charAt(0).toUpperCase()}</span>
                    </div>
                )}
            </div>

            <div className="data-field" style={{ padding: '10px', background: '#f9f9f9', borderRadius: '8px' }}>
                <strong style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>Nome</strong>
                <span style={{ fontSize: '1.1rem' }}>{cliente.nome || 'Nome não informado'}</span>
            </div>
            
            <div className="data-field" style={{ padding: '10px', background: '#f9f9f9', borderRadius: '8px' }}>
                <strong style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>Telefone</strong>
                <IMaskInput
                    mask="(00) 0 0000-0000"
                    value={cliente.telefone || ''}
                    disabled
                    readOnly
                    placeholder="Sem telefone"
                    style={textInputStyle}
                />
            </div>
            
            <div className="data-field" style={{ padding: '10px', background: '#f9f9f9', borderRadius: '8px' }}>
                <strong style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>Documento</strong>
                <IMaskInput
                    mask="000.000.000-00"
                    value={cliente.documento || ''}
                    disabled
                    readOnly
                    placeholder="---"
                    style={textInputStyle}
                />
            </div>
            
            <div className="form-group" style={{ marginTop: '24px' }}>
              <button onClick={() => setIsEditing(true)} className="btn btn-primary" style={{ width: '100%' }}>
                Editar dados
              </button>
            </div>
          </div>
        ) : (
            !erro && <p style={{textAlign: 'center'}}>Nenhum dado encontrado para este usuário.</p>
        )}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default PerfilCliente;