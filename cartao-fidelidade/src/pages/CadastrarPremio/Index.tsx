import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface CadastrarPremioProps {
  onClose: () => void;
}

const CadastrarPremio: React.FC<CadastrarPremioProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nomePromocao: '',
    nomePremio: '',
    pontos: '',
    duracao: '' 
  });

  const [imagemSelecionada, setImagemSelecionada] = useState<File | null>(null);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0');
  const minDate = `${year}-${month}-${day}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagemSelecionada(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do Prêmio:', formData);
    console.log('Imagem Selecionada:', imagemSelecionada);
    onClose();
  };
  
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>
        <h2 className="card__title" style={{ marginTop: 0 }}>Novo Prêmio</h2>

        <form onSubmit={handleSubmit}>
        <p style={{textAlign: 'left', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)'}}>Informações Principais</p>
          <div className="form-group">
            <input type="text" name="nomePremio" value={formData.nomePremio} onChange={handleChange} placeholder="Nome do Prêmio" className="form-input" required />
          </div>
          <div className="form-group">
            <input type="number" min="0" name="pontos" value={formData.pontos} onChange={handleChange} placeholder="Quantidade de pontos" className="form-input" required />
          </div>

          <div className="file-input-wrapper">
            <label htmlFor="file-upload" className="file-input-label">
              {imagemSelecionada ? 'Imagem selecionada' : 'Escolha uma imagem da galeria'}
            </label>
            <input 
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input-hidden"
            />
            {imagemSelecionada && (
              <p className="file-name-display">{imagemSelecionada.name}</p>
            )}
          </div>

          <div className="form-group">
            <p style={{textAlign: 'left', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)'}}>Válido até:</p>
            <input
                placeholder="Duração da promoção"
              type="date"
              name="duracao"
              value={formData.duracao}
              onChange={handleChange}
              className="form-input" 
              required
              min={minDate} 
            />
          </div>


          <div className="form-group" style={{ marginTop: 'var(--spacing-lg)' }}>
            <button type="submit" className="btn btn-primary">
              Criar promoção
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default CadastrarPremio;