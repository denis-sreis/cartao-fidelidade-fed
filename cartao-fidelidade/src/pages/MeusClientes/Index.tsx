import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface MeusClientesProps {
  onClose: () => void;
}

// Dados de exemplo. No futuro, isso virá de uma API, acredito eu.
const mockClientes = [
  { id: 1, nome: 'Denis Reis', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 2, nome: 'Gabriel Fernando', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 3, nome: 'Gustavo Borges', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 4, nome: 'Bruno Montijo', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 11, nome: 'Denis Reis', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 21, nome: 'Gabriel Fernando', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 31, nome: 'Gustavo Borges', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 41, nome: 'Bruno Montijo', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 11, nome: 'Denis Reis', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 21, nome: 'Gabriel Fernando', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 31, nome: 'Gustavo Borges', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 41, nome: 'Bruno Montijo', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 1, nome: 'Denis Reis', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 2, nome: 'Gabriel Fernando', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 3, nome: 'Gustavo Borges', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 4, nome: 'Bruno Montijo', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 11, nome: 'Denis Reis', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 21, nome: 'Gabriel Fernando', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 31, nome: 'Gustavo Borges', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 41, nome: 'Bruno Montijo', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 11, nome: 'Denis Reis', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 21, nome: 'Gabriel Fernando', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 31, nome: 'Gustavo Borges', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 41, nome: 'Bruno Montijo', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 12, nome: 'Denis Reis', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 22, nome: 'Gabriel Fernando', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 32, nome: 'Gustavo Borges', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 42, nome: 'Bruno Montijo', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 121, nome: 'Denis Reis', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 221, nome: 'Gabriel Fernando', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 321, nome: 'Gustavo Borges', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 421, nome: 'Bruno Montijo', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 121, nome: 'Denis Reis', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 221, nome: 'Gabriel Fernando', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 321, nome: 'Gustavo Borges', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
  { id: 421, nome: 'Bruno Montijo', telefone: '(64) 97777-3333', fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80' },
];

const MeusClientes: React.FC<MeusClientesProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClientes = mockClientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClientClick = (clientId: number) => {
    console.log(`Cliente com ID ${clientId} foi clicado. Abrir tela de detalhes...`);
    // aqui deve ter a opção de abrir o modal com detalhes dos clientes
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet modal-sheet-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>
        <h2 className="card__title" style={{ marginTop: 0 }}>Meus Clientes</h2>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Buscar Cliente"
            className="form-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="client-list">
          {filteredClientes.map(cliente => (
            <button
              key={cliente.id}
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