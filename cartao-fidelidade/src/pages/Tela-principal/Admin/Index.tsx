
import { useState } from 'react'
import './telaPrincipal.css'
import Cabecalho from '../../../components/Cabecalho/Cabecalho'
import CartaoADM from '../../../components/CartaoADM/CartaoADM'
import Navegacao from '../../../components/Navegacao/Navegacao'
import MenuLateral from '../../../components/MenuLateral/MenuLateral'
import AreaADM from '../../../components/AreaADM/AreaADM'
import ListaPremiosADM from '../../../components/ListaPremios/ListaPremios'
import BotaoQR from '../../../components/BotaoQR/BotaoQR'

import DetalhesPremio from '../../../components/DetalhesPremio/Index'; 
import type { Premio } from '../../../api/produto';
import EditarPremio from '../../EditarPremio/Index'; 

import PerfilCliente from '../../PerfilCliente/Index'
import CadastrarPremio from '../../CadastrarPremio/Index'
import MeusClientes from '../../MeusClientes/Index'
import Pontuacoes from '../../Pontuacoes/Index'


function TelaPrincipalADM() {

  const [detalhesPremioAberto, setDetalhesPremioAberto] = useState(false);
  const [premioSelecionado, setPremioSelecionado] = useState<Premio | null>(null);
  const [editarPremioAberto, setEditarPremioAberto] = useState(false);

  const [menuAberto, setMenuAberto]=useState(false);
  const abrirMenu = () => setMenuAberto(true);
  const fecharMenu = () => setMenuAberto(false);

  const [perfilAberto, setPerfilAberto] = useState(false);
  const [pontuacoesAberto, setPontuacoesAberto] = useState(false);
  const [cadastrarPremioAberto, setCadastrarPremioAberto] = useState(false);
  const [meusClientesAberto, setMeusClientesAberto] = useState(false);

  const abrirPerfil = () => setPerfilAberto(true);
  const fecharPerfil = () => setPerfilAberto(false);

  const abrirPontuacoes = () => setPontuacoesAberto(true);
  const fecharPontuacoes = () => setPontuacoesAberto(false);

  const abrirCadastrarPremio = () => setCadastrarPremioAberto(true);
  const fecharCadastrarPremio = () => setCadastrarPremioAberto(false);

  const abrirMeusClientes = () => setMeusClientesAberto(true);
  const fecharMeusClientes = () => setMeusClientesAberto(false);

  const abrirDetalhesPremio = (premio: Premio) => {
    setPremioSelecionado(premio);
    setDetalhesPremioAberto(true);
  };

  const fecharDetalhesPremio = () => {
    setDetalhesPremioAberto(false);
    setTimeout(() => setPremioSelecionado(null), 300); 
  };

  const abrirEditarPremio = (premio: Premio) => {
  setDetalhesPremioAberto(false); 
  setEditarPremioAberto(true);   
  setPremioSelecionado(premio);   
};

const fecharEditarPremio = () => {
  setEditarPremioAberto(false);
  setPremioSelecionado(null);
};

  return (
    <>
      <div className={`telaPrincipal ${menuAberto ? 'menu-aberto' : ''}`}>
        {menuAberto && <div className="overlay" onClick={fecharMenu}></div>}
        <MenuLateral ativo={menuAberto} fecharMenu={fecharMenu} />
        
        <header className='cabecalhoTP'>
          <Cabecalho onProfileClick={abrirPerfil} onAbrirMenu={abrirMenu} />
        </header>

        <main className='principalADMTP'>
          <h1 className='textoPontoADMTP'>GORDUCHINHOS II</h1>
          <div className='cartaoADMTP'>
              <CartaoADM/>
          </div>
          <div className='botaoQRADMTP'>
            <BotaoQR onClick={abrirPontuacoes} />
          </div>
          <div className='premiosADMTP'>
            <h1 className='headerPremios'>Prêmios</h1>
            <h2 className='headerPremios'>Todos os Prêmios</h2>
          </div>
          <div className='listaPremiosADM'>
              <ListaPremiosADM onPremioClick={abrirDetalhesPremio} />          
          </div>
          <div className='ADMTP'>
            <h1 className='headerADM'>Administração</h1>
            <h2 className='headerADM'>Opções do Administrador</h2>
          </div>
          <div className='AreaADMTP'>
              <AreaADM
                onCadastrarPremioClick={abrirCadastrarPremio}
                onConsultarClientesClick={abrirMeusClientes}
              />
          </div>
        
        </main>
        <footer className='rodapeADMTP'>
          <Navegacao onProfileClick={abrirPerfil}/>
        </footer>
      </div>
      
      {perfilAberto && (
        <PerfilCliente onClose={fecharPerfil} />
      )}
      
      {pontuacoesAberto && (
        <Pontuacoes onClose={fecharPontuacoes} />
      )}

      {cadastrarPremioAberto && (
        <CadastrarPremio onClose={fecharCadastrarPremio} />
      )}

      {meusClientesAberto && (
        <MeusClientes onClose={fecharMeusClientes} />
      )}

      {detalhesPremioAberto && premioSelecionado && (
  <DetalhesPremio 
    premio={premioSelecionado} 
    onClose={fecharDetalhesPremio} 
    onEditarClick={abrirEditarPremio} // <-- Adicione esta linha
  />
)}

{editarPremioAberto && premioSelecionado && (
  <EditarPremio
    premio={premioSelecionado}
    onClose={fecharEditarPremio}
  />
)}
    </>
  )
}

export default TelaPrincipalADM;