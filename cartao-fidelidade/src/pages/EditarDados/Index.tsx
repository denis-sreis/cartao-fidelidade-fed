import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IMaskInput } from 'react-imask';
import { atualizarMeusDados, atualizarFotoPerfil, type Cliente } from '../../api/cliente';
import { loginSchema } from '../Cadastro/validador'; 

interface EditarDadosProps {
  onClose: () => void;
  idUsuario?: number; 
  dadosAtuais: Cliente; 
}

const EditarDados: React.FC<EditarDadosProps> = ({ onClose, dadosAtuais }) => {
  
  const [formData, setFormData] = useState({
      nome: '',
      telefone: '',
  });

  const [imagemSelecionada, setImagemSelecionada] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const mascaraNome = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/;

  useEffect(() => {
    if (dadosAtuais) {
        setFormData({
            nome: dadosAtuais.nome || '', 
            telefone: dadosAtuais.telefone || ''
        });

        if (dadosAtuais.imagem) {
            setPreviewUrl(dadosAtuais.imagem);
        }
    }
  }, [dadosAtuais]); 

  const handleNameChange = (value: string) => {
    setFormData(prev => ({ ...prev, nome: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, telefone: value }));
  };



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagemSelecionada(file);
      setPreviewUrl(URL.createObjectURL(file));
      
      if (previewUrl && previewUrl.startsWith('blob:')) {
         URL.revokeObjectURL(previewUrl);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setLoading(true);

    const telefoneSemMascara = formData.telefone.replace(/\D/g, '');
    const nomeCortado = formData.nome.trim();
    const documentoSemMascara = (dadosAtuais.documento || '').replace(/\D/g, '');

    const { error } = loginSchema.validate(
        { 
            nome: nomeCortado, 
            telefone: telefoneSemMascara, 
            documento: documentoSemMascara 
        }, 
        { context: { userType: 'cliente' } }
    );

    if (error) {
        setApiError(error.details[0].message);
        setLoading(false);
        return; 
    }

    try {
        if (formData.nome !== dadosAtuais.nome || formData.telefone !== dadosAtuais.telefone) {
             
             await atualizarMeusDados({
                nome: nomeCortado, 
                telefone: formData.telefone 
             });
        }

        if (imagemSelecionada) {
            await atualizarFotoPerfil(imagemSelecionada);
        }
        
        alert('Dados salvos com sucesso!'); 
        onClose();
        window.location.reload(); 

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
        <h2 className="card__title" style={{ marginTop: 0 }}>Editar Dados</h2>

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
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary)' }}
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<div style="color:red; font-size:0.8rem">Erro ao carregar</div>';
                }}
              />
            ) : (
              <div style={{
                width: '100px', height: '100px', borderRadius: '50%', 
                backgroundColor: 'var(--color-input-background)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', color: 'var(--color-text-secondary)'
              }}>
                <PlaceholderIcon />
                <span style={{ fontSize: '0.8rem', marginTop: '4px' }}>Alterar</span>
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

          {apiError && <div style={{ color: '#721c24', textAlign: 'center', marginBottom: '15px', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '8px', fontSize: '0.9rem' }}>{apiError}</div>}

          <div className="form-group">
            <label style={{display: 'block', marginBottom: 5, color: '#666'}}>Nome</label>
            <IMaskInput 
              mask={mascaraNome}
              type="text"
              value={formData.nome}
              onAccept={(value: string) => handleNameChange(value)}
              placeholder="Digite seu nome"
              className="form-input"
              disabled={loading}
              required 
            />
          </div>
          
          <div className="form-group">
             <label style={{display: 'block', marginBottom: 5, color: '#666'}}>Telefone</label>
            <IMaskInput
              mask="(00) 0 0000-0000"
              value={formData.telefone}
              onAccept={(value) => handlePhoneChange(value)}
              placeholder="Digite seu telefone"
              className="form-input"
              disabled={loading}
              required 
            />
          </div>
          <div className="form-group">
            <label style={{display: 'block', marginBottom: 5, color: '#666'}}>Documento</label>
            <IMaskInput 
              mask="000.000.000-00"
              value={dadosAtuais.documento || ''} 
              className="form-input"
              disabled 
              readOnly 
              style={{ cursor: 'default', backgroundColor: '#e9ecef', color: '#495057' }}
            />
          </div>
          
          <div className="form-group" style={{ marginTop: '24px' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading} 
              style={{ width: '100%', padding: '12px' }}
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default EditarDados;