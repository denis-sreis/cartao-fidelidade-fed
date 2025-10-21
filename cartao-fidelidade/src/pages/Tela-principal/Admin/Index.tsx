import { useState } from 'react'
import './telaPrincipal.css'
import Cabecalho from '../../../components/Cabecalho/Cabecalho'
import CartaoADM from '../../../components/CartaoADM/CartaoADM'
import Navegacao from '../../../components/Navegacao/Navegacao'
import MenuLateral from '../../../components/MenuLateral/MenuLateral'
import AreaADM from '../../../components/AreaADM/AreaADM'

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
