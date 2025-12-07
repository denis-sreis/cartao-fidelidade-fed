import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Cabecalho from '../../components/Cabecalho/Cabecalho';
import Navegacao from '../../components/Navegacao/Navegacao';
import PerfilCliente from '../PerfilCliente/Index';



import './Pontuacao.css';
import type { PayloadGeracao } from '../../types/PayloadGeracao';


const opcoesPontuacao = [
  { id: 'min50', label: 'Compra mínima de R$ 50,00', pontos: 50 },
  { id: 'acima100', label: 'Compra acima de R$ 100,00', pontos: 100 },
  { id: 'acima200', label: 'Compra acima de R$ 200,00', pontos: 200 },
  { id: 'acima500', label: 'Compra acima de R$ 500,00', pontos: 500 },
];

const Pontuacao = () => {
  const navigate = useNavigate();
  const [isPerfilVisible, setPerfilVisible] = useState(false);

  const handleSelecionarOpcao = (opcao: typeof opcoesPontuacao[0]) => {
    console.log('Opção selecionada:', opcao.label, 'Pontos:', opcao.pontos);

  
    const payloadParaEnviar: PayloadGeracao = {
        tipo: 'adicionar',
        pontos: opcao.pontos,
        titulo: opcao.label,  
        descricao: `Geração via tela Pontuacao: ${opcao.label}`,
    };

    navigate('/gerar-qrcode', { state: { payload: payloadParaEnviar } });
  };

  return (
    <>
      <div className="pontuacao-page-container">
        <header className="pontuacao-header">
          <Cabecalho onProfileClick={() => setPerfilVisible(true)} />
        </header>

        <main className="pontuacao-main">
          <h1 className="main-title">Selecione a Pontuação</h1>
          
          <div className="botoes-pontuacao-list">
            {opcoesPontuacao.map((opcao) => (
              <div className="form-group" key={opcao.id}>
                <button 
                  className="btn btn-primary btn-pontuacao" 
                  type="button"
                  onClick={() => handleSelecionarOpcao(opcao)}
                >
                  <span className="btn-label">{opcao.label}</span>
                  <span className="btn-pontos">(+{opcao.pontos} pts)</span>
                </button>
              </div>
            ))}
          </div>
        </main>

        <footer className="pontuacao-footer">
          <Navegacao onProfileClick={() => setPerfilVisible(true)} />
        </footer>
      </div>

      {isPerfilVisible && (
        <PerfilCliente onClose={() => setPerfilVisible(false)} />
      )}
    </>
  );
};

export default Pontuacao;