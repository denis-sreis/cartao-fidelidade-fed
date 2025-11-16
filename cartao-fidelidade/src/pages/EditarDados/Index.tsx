import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { updateDadosUsuario } from '../../api/usuario'; 

interface EditarDadosProps {
  onClose: () => void;
  idUsuario: number; 
  dadosAtuais: { 
    nome: string; 
    telefone: string; 
    cpf: string; 
    fotoUrl?: string; 
  };
}

const EditarDados: React.FC<EditarDadosProps> = ({ onClose, idUsuario, dadosAtuais }) => {
  
  const [formData, setFormData] = useState(dadosAtuais);
  const [imagemSelecionada, setImagemSelecionada] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(dadosAtuais.fotoUrl || null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

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
      if (dadosAtuais.fotoUrl) URL.revokeObjectURL(dadosAtuais.fotoUrl);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setLoading(true);

    const payload = {
      nome: formData.nome,
      telefone: formData.telefone,
    };
    
    try {
        const response = await updateDadosUsuario(
            idUsuario, 
            payload, 
            imagemSelecionada
        );
        
        console.log('Dados atualizados com sucesso!', response);
        alert('Dados salvos com sucesso!'); 
        onClose();

    } catch (err) {
        if (err instanceof Error) {
            setApiError(err.message);
        } else {
            setApiError('Ocorreu um erro desconhecido ao atualizar.');
        }
    } finally {
        setLoading(false);
    }
  };

  const PlaceholderIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
      <path d="M4 4H7L9 2H15L17 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17ZM12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9Z" fill="var(--color-text-secondary)"/>
    </svg>
  );

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>
        <h2 className="card__title" style={{ marginTop: 0 }}>Dados Pessoais</h2>

        <form onSubmit={handleSubmit}>

          <div 
            style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-lg)', cursor: 'pointer' }}
            onClick={handleImageClick}
            title="Clique para alterar a foto"
          >
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Prévia do perfil" 
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                width: '100px', height: '100px', borderRadius: '50%', 
                backgroundColor: 'var(--color-input-background)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', color: 'var(--color-text-secondary)'
              }}>
                <PlaceholderIcon />
                <span style={{ fontSize: '0.8rem', marginTop: '4px' }}>Adicionar</span>
              </div>
            )}
          </div>
          
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }} 
          />

          {apiError && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{apiError}</p>}


          <div className="form-group">
            <input 
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
              className="form-input"
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <input 
              type="text"
              name="cpf"
              value={formData.cpf}
              placeholder="CPF/CNPJ (Inalterável)"
              className="form-input"
              disabled 
              readOnly 
              style={{ cursor: 'default', backgroundColor: 'var(--color-input-disabled, #eee)' }}
            />
          </div>
          
          <div className="form-group" style={{ marginTop: '24px' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading} 
            >
              {loading ? 'Salvando...' : 'Salvar dados'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default EditarDados;