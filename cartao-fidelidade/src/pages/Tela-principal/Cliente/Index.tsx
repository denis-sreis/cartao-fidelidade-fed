import { useState } from 'react'
import './telaPrincipal.css'
import Cabecalho from '../../../components/Cabecalho/Cabecalho'
import Navegacao from '../../../components/Navegacao/Navegacao'
import MenuLateral from '../../../components/MenuLateral/MenuLateral'
import PerfilCliente from '../../PerfilCliente/Index'

function TelaPrincipal() {
  const [menuAberto, setMenuAberto]=useState(false);
  const abrirMenu = () => setMenuAberto(true);
  const fecharMenu = () => setMenuAberto(false);

  const [perfilAberto, setPerfilAberto]=useState(false);
  const abrirPerfil = () => setPerfilAberto(true);
  const fecharPerfil = () => setPerfilAberto(false); 

  return (
    <>
      <div className={`telaPrincipal ${menuAberto ? 'menu-aberto' : ''}`}>
        {menuAberto && <div className="overlay" onClick={fecharMenu}></div>}
        <MenuLateral ativo={menuAberto} fecharMenu={fecharMenu} />

        <header className='cabecalhoTP'>
          <Cabecalho onProfileClick={abrirPerfil} onAbrirMenu={abrirMenu} />
        </header>

        <main className='principalTP'>
          <h1 className='textoPontoTP'>Seus Pontos</h1>
        </main>

        <footer className='rodapeTP'>
          <Navegacao onProfileClick={abrirPerfil}/>
        </footer>
      </div>

      {perfilAberto && (
        <PerfilCliente onClose={fecharPerfil} />
      )}
    </>
  )
}

export default TelaPrincipal