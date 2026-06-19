import React, { useState } from 'react'; 
import ReactDOM from 'react-dom';
// IMPORTANTE: Importe a função de deletar da sua API. 
// Pode ser que se chame deleteProduto, excluirPremio, etc. Ajuste se necessário!
import { excluirPremio, type Premio } from '../../api/produto'; 
import ModalConfirmacao from '../ModalConfirmacao/Index'

interface DetalhesPremioProps {
  onClose: () => void;
  premio: Premio;
  onEditarClick: (premio: Premio) => void; 
  onExcluirSuccess?: () => void; // Prop opcional para recarregar a lista sem dar F5
}

const DetalhesPremio: React.FC<DetalhesPremioProps> = ({ onClose, premio, onEditarClick, onExcluirSuccess }) => {
  
  const [isConfirmandoExclusao, setConfirmandoExclusao] = useState(false);
  const [isExcluindo, setIsExcluindo] = useState(false); // Evita duplo clique

  const handleEditar = () => {
    onEditarClick(premio);
  };

  const handleExcluir = () => {
    setConfirmandoExclusao(true);
  };

  // Transformamos a função em 'async' para poder esperar a API responder
  const handleConfirmarExclusao = async () => {
    try {
      setIsExcluindo(true);
      
      // 1. Chama o Back-end de verdade! 
      // (Se a sua função no api/produto.ts tiver outro nome, mude aqui)
      await excluirPremio(premio.id); 
      
      setConfirmandoExclusao(false); 
      onClose(); 

      // 2. Avisa a tela principal para recarregar a lista ou força um F5
      if (onExcluirSuccess) {
        onExcluirSuccess();
      } else {
        window.location.reload(); 
      }

    } catch (error) {
      console.error("Erro ao excluir o prêmio:", error);
      alert("Erro ao excluir o prêmio. Tente novamente.");
    } finally {
      setIsExcluindo(false);
    }
  };
  
  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1001 }}>
        <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="modal-grabber"></div>
          
          <img 
            src={premio.imagemUrl} 
            alt={premio.nome} 
            style={{ 
              width: '100%', 
              height: '220px', 
              objectFit: 'cover', 
              borderRadius: 'var(--border-radius-md)', 
              marginBottom: 'var(--spacing-lg)' 
            }} 
          />
          
          <h2 className="card__title" style={{ marginTop: 0, textAlign: 'left' }}>
            {premio.nome}
          </h2>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--color-primary)', 
            fontWeight: 'bold', 
            textAlign: 'left', 
            marginBottom: 'var(--spacing-xl)',
            marginTop: 'calc(var(--spacing-sm) * -1)'
          }}>
            {premio.pontos} pontos
          </p>

          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={handleEditar}>
              Editar Prêmio
            </button>
          </div>
          <div className="form-group">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleExcluir} 
              style={{ backgroundColor: '#D9534F' }}
              disabled={isExcluindo}
            >
              {isExcluindo ? 'Excluindo...' : 'Excluir Prêmio'}
            </button>
          </div>

        </div>
      </div>

      {isConfirmandoExclusao && (
        <ModalConfirmacao
          title="Confirmar Exclusão"
          message={`Tem certeza que deseja excluir o prêmio "${premio.nome}"? Esta ação não pode ser desfeita.`}
          confirmText="Sim, Excluir"
          onClose={() => setConfirmandoExclusao(false)}
          onConfirm={handleConfirmarExclusao}
        />
      )}
    </>,
    document.getElementById('modal-root')!
  );
}

export default DetalhesPremio;