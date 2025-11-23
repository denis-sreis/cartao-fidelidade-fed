import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

interface PontuacoesProps {
  onClose: () => void;
}

const opcoesPontuacao = [
  { id: 'min50', label: 'Compra mínima de R$ 50,00' },
  { id: 'acima100', label: 'Compra acima de R$ 100,00' },
  { id: 'acima200', label: 'Compra acima de R$ 200,00' },
  { id: 'acima500', label: 'Compra acima de R$ 500,00' },
];

const Pontuacoes: React.FC<PontuacoesProps> = ({ onClose }) => {
  
  const navigate = useNavigate();

  const handleSelecionarOpcao = (opcao: typeof opcoesPontuacao[0]) => {
    console.log('Opção selecionada:', opcao.label, 'ID:', opcao.id);

    // Vamos navegar para a rota '/leitor-codigo' por enquanto, até o Bruno trazer a tela dele
    navigate(`/leitor-codigo?tipo=${opcao.id}`);
    
    onClose(); 
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
    document.getElementById('modal-root')!
  );
}

export default Pontuacoes;