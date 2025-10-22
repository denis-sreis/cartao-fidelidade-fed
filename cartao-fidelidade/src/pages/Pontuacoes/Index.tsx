import React from 'react';
import ReactDOM from 'react-dom';

interface PontuacoesProps {
  onClose: () => void;
}

const Pontuacoes: React.FC<PontuacoesProps> = ({ onClose }) => {
  
  const handleGerarQRCode = () => {
    // aqui eu tenho que colocar a rota para a tela de qr code pronta
    onClose(); 
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>
        <h2 className="card__title" style={{ marginTop: 0 }}>Pontuações</h2>
                
        <div className="form-group">
          <button className="btn btn-primary" type="button">
            Compra mínima de R$ 50,00
          </button>
        </div>

        <div className="form-group">
          <button className="btn btn-primary" type="button">
            Compra acima de R$ 100,00
          </button>
        </div>

        <div className="form-group">
          <button className="btn btn-primary" type="button">
            Compra acima de R$ 200,00
          </button>
        </div>

        <div className="form-group">
          <button className="btn btn-primary" type="button">
            Compra acima de R$ 500,00
          </button>
        </div>

        <div className="form-group" style={{ marginTop: 'var(--spacing-lg)' }}>
          <button className="btn btn-secondary" type="button" onClick={handleGerarQRCode}>
            Gerar QR Code
          </button>
        </div>
        
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default Pontuacoes;

