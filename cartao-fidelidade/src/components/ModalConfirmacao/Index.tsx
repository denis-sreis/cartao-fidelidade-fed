import React from 'react';
import ReactDOM from 'react-dom';

interface ModalConfirmacaoProps {
  title: string;
  message: string;
  onClose: () => void;      // O que fazer ao clicar em "Cancelar" ou fora
  onConfirm: () => void;    // O que fazer ao clicar em "Confirmar"
  confirmText?: string;
  cancelText?: string;
}

const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({ 
  title, 
  message, 
  onClose, 
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar"
}) => {

  const handleConfirmClick = () => {
    onConfirm();
    onClose(); // Fecha o modal após a confirmação
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1002 }}> {/* zIndex maior para ficar sobre outros modais */}
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>
        
        <h2 className="card__title" style={{ marginTop: 0, textAlign: 'left' }}>
          {title}
        </h2>
        
        <p style={{ 
          fontSize: '1rem', 
          color: 'var(--color-text-secondary)', 
          textAlign: 'left', 
          marginBottom: 'var(--spacing-xl)',
          lineHeight: '1.5'
        }}>
          {message}
        </p>

        {/* Botões de Ação */}
        <div className="form-group">
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={handleConfirmClick} 
            style={{ backgroundColor: '#D9534F' }} // Vermelho para perigo
          >
            {confirmText}
          </button>
        </div>
        <div className="form-group">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            {cancelText}
          </button>
        </div>

      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default ModalConfirmacao;