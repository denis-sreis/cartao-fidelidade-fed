import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import type { Premio } from '../../components/ListaPremios/produtosTeste'; 

interface EditarPremioProps {
  onClose: () => void;
  premio: Premio; 
}

const PencilIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="#1C1C1E"/>
  </svg>
);

const EditarPremio: React.FC<EditarPremioProps> = ({ onClose, premio }) => {
  
  const [formData, setFormData] = useState({
    nomePremio: premio.nome,
    pontos: premio.pontos.toString(),
  });

  const [imagemSelecionada, setImagemSelecionada] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(premio.imagemUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagemSelecionada(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados Editados:', formData);
    if (imagemSelecionada) {
      console.log('Nova Imagem para upload:', imagemSelecionada);
    }
    onClose();
  };
  
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>
        <h2 className="card__title" style={{ marginTop: 0 }}>Editar Prêmio</h2>

        <form onSubmit={handleSubmit}>
        
        <div 
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-lg)', cursor: 'pointer', position: 'relative' }}
          onClick={handleImageClick}
          title="Clique para alterar a foto"
        >
          <img 
            src={previewUrl || undefined} 
            alt="Prévia do prêmio" 
            style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '2px solid var(--color-border)'
            }} 
          />
          <div style={{
            position: 'absolute',
            bottom: '5px',
            right: 'calc(50% - 60px)', 
            transform: 'translateX(50px)',
            backgroundColor: 'var(--color-surface)',
            borderRadius: '50%',
            padding: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '1px solid var(--color-border)'
          }}>
            <PencilIcon />
          </div>
        </div>
        
        <input 
          type="file" 
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }} 
        />

        <p style={{textAlign: 'left', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)'}}>Informações Principais</p>
          
          <div className="form-group">
            <input type="text" name="nomePremio" value={formData.nomePremio} onChange={handleChange} placeholder="Nome do Prêmio" className="form-input" required />
          </div>
          
          <div className="form-group">
            <input type="number" min="0" name="pontos" value={formData.pontos} onChange={handleChange} placeholder="Quantidade de pontos" className="form-input" required />
          </div>

          <div className="form-group" style={{ marginTop: 'var(--spacing-lg)' }}>
            <button type="submit" className="btn btn-primary">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default EditarPremio;