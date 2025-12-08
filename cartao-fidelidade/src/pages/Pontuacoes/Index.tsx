import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';


import type { PayloadGeracao } from '../../types/PayloadGeracao';

interface PontuacoesProps {
  onClose?: () => void;
}

const opcoesPontuacao = [
  { id: 'min50', label: 'Compra mínima de R$ 50,00', pontos: 50 },
  { id: 'acima100', label: 'Compra acima de R$ 100,00', pontos: 100 },
  { id: 'acima200', label: 'Compra acima de R$ 200,00', pontos: 200 },
  { id: 'acima500', label: 'Compra acima de R$ 500,00', pontos: 500 },
];

const Pontuacoes: React.FC<PontuacoesProps> = ({ onClose }) => {
  
  const navigate = useNavigate();

  const handleSelecionarOpcao = (opcao: typeof opcoesPontuacao[0]) => {
    console.log('Opção selecionada:', opcao.label, 'Pontos:', opcao.pontos);

    
    if (onClose) {
        onClose();
    }
  
    const payloadParaEnviar: PayloadGeracao = {
        tipo: 'adicionar',
        pontos: opcao.pontos,
        titulo: opcao.label,
        descricao: `Gerado via modal: ${opcao.label}`,
    };

   
    navigate('/gerar-qrcode', { state: { payload: payloadParaEnviar } });
  };

 
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grabber"></div>
        <h2 className="card__title" style={{ marginTop: 0 }}>Pontuações</h2>
                
        {opcoesPontuacao.map((opcao) => (
          <div className="form-group" key={opcao.id}>
            <button 
              className="btn btn-primary" 
              type="button"
              onClick={() => handleSelecionarOpcao(opcao)}
            >
              {opcao.label}
            </button>
          </div>
        ))}
        
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  );
}

export default Pontuacoes;