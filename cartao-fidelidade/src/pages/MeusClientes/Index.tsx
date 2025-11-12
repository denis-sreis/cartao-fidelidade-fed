import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { getClientes, type Cliente } from '../../api/cliente'; 

interface MeusClientesProps {
  onClose: () => void;
}

const DEFAULT_PHOTO_URL = 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png';

const getClientPhotoUrl = (dataUrl: string | null) => {
    if (!dataUrl || dataUrl.trim() === '' || dataUrl.length < 50) { 
        return DEFAULT_PHOTO_URL;
    }
    return dataUrl;
};
const MeusClientes: React.FC<MeusClientesProps> = ({ onClose }) => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [clientes, setClientes] = useState<Cliente[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getClientes();
        setClientes(data);
        
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Ocorreu um erro desconhecido ao carregar os clientes.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
  }, []); 

  const lowerSearchTerm = searchTerm.toLowerCase();
  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(lowerSearchTerm) ||
    cliente.telefone.includes(searchTerm)                
  );

  const handleClientClick = (clientId: number) => {
    console.log(`Cliente com ID ${clientId} foi clicado. Abrir tela de detalhes...`);
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      
      <div 
        className="modal-sheet modal-sheet-large" 
        onClick={(e) => e.stopPropagation()}
        style={{ display: 'flex', flexDirection: 'column' }} 
      >
        
        <div style={{ flexShrink: 0 }}>
          <div className="modal-grabber"></div>
          <h2 className="card__title" style={{ marginTop: 0 }}>Meus Clientes</h2>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="Buscar Cliente por nome ou telefone" 
              className="form-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div 
          className="client-list"
          style={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            minHeight: 0 
          }}
        >
          {loading && (
            <p style={{ textAlign: 'center', padding: '20px' }}>Carregando clientes...</p>
          )}
          
          {error && (
            <p style={{ color: 'red', textAlign: 'center', padding: '20px' }}>Erro: {error}</p>
          )}

          {!loading && !error && filteredClientes.map((cliente) => ( 
            <button
              key={cliente.id} 
              className="client-list-item"
              onClick={() => handleClientClick(cliente.id)}
            >
              <img 
                src={getClientPhotoUrl(cliente.foto_data_url)} 
                alt={cliente.nome} 
                className="client-photo" 
              />
              <div className="client-info">
                <span className="client-info__name">{cliente.nome}</span>
                <span className="client-info__phone">{cliente.telefone}</span>
              </div>
            </button>
          ))}
          
          {!loading && !error && filteredClientes.length === 0 && (
            <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Nenhum cliente encontrado.</p>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default MeusClientes;