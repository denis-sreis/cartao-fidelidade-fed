import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import EditarDados from '../EditarDados/Index';

interface PerfilProps {
  onClose: () => void;
}

const PerfilCliente: React.FC<PerfilProps> = ({ onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const cliente = { nome: 'Denis Reis', telefone: '(62) 99999-8888', cpf: '123.456.789-00' };

  if (isEditing) {
    return <EditarDados dadosAtuais={cliente} onClose={() => setIsEditing(false)} />;
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>
        <h2 className="card__title" style={{ marginTop: 0 }}>Dados Pessoais</h2>
        
        <div className="data-field">{cliente.nome}</div>
        <div className="data-field">{cliente.telefone}</div>
        <div className="data-field">{cliente.cpf}</div>
        
        <div className="form-group" style={{ marginTop: '24px' }}>
          <button onClick={() => setIsEditing(true)} className="btn btn-primary">
            Editar dados
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default PerfilCliente;