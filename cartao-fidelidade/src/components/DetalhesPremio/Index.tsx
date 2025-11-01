import React, { useState } from 'react'; // 1. Importar useState
import ReactDOM from 'react-dom';
import type { Premio } from '../ListaPremios/produtosTeste'; // Ajuste o caminho
import ModalConfirmacao from '../ModalConfirmacao/Index'; // 2. Importar o novo modal

interface DetalhesPremioProps {
  onClose: () => void;
  premio: Premio;
  onEditarClick: (premio: Premio) => void; // 3. Nova prop para solicitar a edição
}

const DetalhesPremio: React.FC<DetalhesPremioProps> = ({ onClose, premio, onEditarClick }) => {
  
  // 4. Estado para controlar o modal de confirmação
  const [isConfirmandoExclusao, setConfirmandoExclusao] = useState(false);

  const handleEditar = () => {
    // 5. Chama a função do pai (TelaPrincipalADM) para abrir a edição
    onEditarClick(premio);
  };

  const handleExcluir = () => {
    // 6. Apenas abre o modal de confirmação
    setConfirmandoExclusao(true);
  };

  const handleConfirmarExclusao = () => {
    // 7. Esta é a lógica de exclusão real
    console.warn('CONFIRMADO EXCLUIR:', premio.nome);
    // TODO: Adicionar lógica da API de exclusão aqui
    
    setConfirmandoExclusao(false); // Fecha o modal de confirmação
    onClose(); // Fecha o modal de detalhes
  };
  
  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1001 }}> {/* zIndex base */}
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
            <button type="button" className="btn btn-secondary" onClick={handleExcluir} style={{ backgroundColor: '#D9534F' }}>
              Excluir Prêmio
            </button>
          </div>

        </div>
      </div>

      {/* 8. Renderiza o modal de confirmação condicionalmente */}
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