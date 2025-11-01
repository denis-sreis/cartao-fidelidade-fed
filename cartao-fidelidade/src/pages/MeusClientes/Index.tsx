import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface MeusClientesProps {
  onClose: () => void;
}

// Dados de exemplo. Puxar de uma api dps
const mockClientes = [
  { id: 1, nome: 'Denis Reis', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 2, nome: 'Gabriel Fernando', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 3, nome: 'Gustavo Borges', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 4, nome: 'Bruno Montijo', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 11, nome: 'Denis Reis', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 21, nome: 'Gabriel Fernando', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 31, nome: 'Gustavo Borges', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 41, nome: 'Bruno Montijo', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 111, nome: 'Denis Reis', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 211, nome: 'Gabriel Fernando', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 311, nome: 'Gustavo Borges', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 411, nome: 'Bruno Montijo', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto-format&fit=crop&w=100&q=80' },
  { id: 122, nome: 'Denis Reis', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto-format&fit=crop&w=100&q=80' },
  { id: 222, nome: 'Gabriel Fernando', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto-format&fit=crop&w=100&q=80' },
  { id: 322, nome: 'Gustavo Borges', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto-format&fit=crop&w=100&q=80' },
  { id: 422, nome: 'Bruno Montijo', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto-format&fit=crop&w=100&q=80' },
  { id: 1211, nome: 'Denis Reis', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto-format&fit=crop&w=100&q=80' },
  { id: 2211, nome: 'Gabriel Fernando', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 3211, nome: 'Gustavo Borges', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto-format&fit=crop&w=100&q=80' },
  { id: 4211, nome: 'Bruno Montijo', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto-format&fit=crop&w=100&q=80' },
  { id: 1212, nome: 'Denis Reis', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto-format&fit=crop&w=100&q=80' },
  { id: 2212, nome: 'Gabriel Fernando', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto-format&fit=crop&w=100&q=80' },
  { id: 3212, nome: 'Gustavo Borges', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib.rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 4212, nome: 'Bruno Montijo', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib.rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
];

const MeusClientes: React.FC<MeusClientesProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const lowerSearchTerm = searchTerm.toLowerCase();
  const filteredClientes = mockClientes.filter(cliente =>
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
          {filteredClientes.map((cliente, index) => ( 
            <button
              key={`${cliente.id}-${index}`} 
              className="client-list-item"
              onClick={() => handleClientClick(cliente.id)}
            >
              <img src={cliente.fotoUrl} alt={cliente.nome} className="client-photo" />
              <div className="client-info">
                <span className="client-info__name">{cliente.nome}</span>
                <span className="client-info__phone">{cliente.telefone}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default MeusClientes;