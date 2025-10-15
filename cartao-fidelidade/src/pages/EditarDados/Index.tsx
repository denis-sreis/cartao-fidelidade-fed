import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface EditarDadosProps {
  onClose: () => void;
  dadosAtuais: { nome: string; telefone: string; cpf: string; };
}

const EditarDados: React.FC<EditarDadosProps> = ({ onClose, dadosAtuais }) => {
  const [formData, setFormData] = useState(dadosAtuais);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados salvos:', formData);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>
        <h2 className="card__title" style={{ marginTop: 0 }}>Dados Pessoais</h2>

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
    </div>,
    document.getElementById('modal-root')!
  );
}

export default EditarDados;