// 1. CORREÇÃO: Os 'types' foram separados da importação principal.
import React, { useState, useRef } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import ReactDOM from 'react-dom';

interface ValidarProps {
  onClose: () => void;
  onValidadoClick: () => void;
}

const ValidarCodigo: React.FC<ValidarProps> = ({ onClose, onValidadoClick }) => {
  const [codigo, setCodigo] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    
    if (/^[0-9]$/.test(value) || value === '') {
      const novoCodigo = [...codigo];
      novoCodigo[index] = value;
      setCodigo(novoCodigo);

      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && codigo[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const codigoCompleto = codigo.join('');
    
    console.log('Código a validar:', codigoCompleto);

    onValidadoClick();
  };

  return ReactDOM.createPortal(
    <>
      <style>{`
        .codigo-inputs {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }
        .codigo-input {
          width: 40px;
          height: 50px;
          text-align: center;
          font-size: 1.5rem;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
      `}</style>
      
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="modal-grabber"></div>
          <h2 className="card__title" style={{ marginTop: 0 }}>
            Validar Código
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>
            Insira o código de 6 dígitos enviado para seu telefone.
          </p>

          <form onSubmit={handleFormSubmit}>
            <div className="form-group codigo-inputs">
              {codigo.map((digito, index) => (
                <input
                  key={index}
                  type="tel"
                  maxLength={1}
                  className="form-input codigo-input"
                  value={digito}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  // 2. CORREÇÃO: Trocado ( ) por { }
                  ref={(el) => { inputRefs.current[index] = el; }}
                  required
                />
              ))}
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Validar Código
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('modal-root')!
  );
};

export default ValidarCodigo;