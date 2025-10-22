import { useState } from 'react'
import './telaPrincipal.css'
import Cabecalho from '../../../components/Cabecalho/Cabecalho'
import CartaoADM from '../../../components/CartaoADM/CartaoADM'
import Navegacao from '../../../components/Navegacao/Navegacao'
import MenuLateral from '../../../components/MenuLateral/MenuLateral'
import AreaADM from '../../../components/AreaADM/AreaADM'
import ListaPremiosADM from '../../../components/ListaPremios/ListaPremios'
import BotaoQR from '../../../components/BotaoQR/BotaoQR'

function TelaPrincipalADM() {
  const [menuAberto, setMenuAberto]=useState(false);
  const abrirMenu = () => {
    setMenuAberto(true);
  };
  const fecharMenu = () => {
    setMenuAberto(false);
  };
  return (
    <div className={`telaPrincipal ${menuAberto ? 'menu-aberto' : ''}`}>
      {menuAberto && <div className="overlay" onClick={fecharMenu}></div>}
      <MenuLateral ativo={menuAberto} fecharMenu={fecharMenu} />
      <header className='cabecalhoTP'>
        <Cabecalho onAbrirMenu={abrirMenu} />
      </header>
      <main className='principalADMTP'>
        <h1 className='textoPontoADMTP'>GORDUCHINHOS II</h1>
        <div className='cartaoADMTP'>
            <CartaoADM/>
        </div>
        <div className='botaoQRADMTP'>
          <BotaoQR/>
        </div>
        <div className='premiosADMTP'>
          <h1 className='headerPremios'>Prêmios</h1>
          <h2 className='headerPremios'>Todos os Prêmios</h2>
        </div>
        <div className='listaPremiosADM'>
            <ListaPremiosADM/>
        </div>
        <div className='ADMTP'>
          <h1 className='headerADM'>Administração</h1>
          <h2 className='headerADM'>Opções do Administrador</h2>
        </div>
        <div className='AreaADMTP'>
            <AreaADM/>
        </div>
      
      </main>
      <footer className='rodapeADMTP'>
        <Navegacao/>
      </footer>
    </div>
  )
}

export default TelaPrincipalADM
