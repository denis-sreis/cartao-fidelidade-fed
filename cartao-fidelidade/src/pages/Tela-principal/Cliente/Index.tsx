import PerfilCliente from '../../PerfilCliente/Index'
import { useState } from 'react'
import './telaPrincipal.css'
import Cabecalho from '../../../components/Cabecalho/Cabecalho'
import CartaoPontos from '../../../components/CartaoPontosDados/CartaoPontosDados'
import BotaoRegistrar from '../../../components/BotaoRegistrar/BotaoRegistrar'
import Navegacao from '../../../components/Navegacao/Navegacao'
import ListaPremios from '../../../components/ListaPremios/ListaPremios'
import MenuLateral from '../../../components/MenuLateral/MenuLateral'

function TelaPrincipal() {
  const [menuAberto, setMenuAberto] = useState(false);
  const abrirMenu = () => setMenuAberto(true);
  const fecharMenu = () => setMenuAberto(false);

  const [perfilAberto, setPerfilAberto] = useState(false);
  const abrirPerfil = () => setPerfilAberto(true);
  const fecharPerfil = () => setPerfilAberto(false);

  return (
    <>
      <div className={`telaPrincipal ${menuAberto ? 'menu-aberto' : ''}`}>

        {/* Overlay do menu */}
        {menuAberto && <div className="overlay" onClick={fecharMenu}></div>}

        {/* Menu lateral */}
        <MenuLateral ativo={menuAberto} fecharMenu={fecharMenu} />

        {/* Header */}
        <header className='cabecalhoTP'>
          <Cabecalho onProfileClick={abrirPerfil} onAbrirMenu={abrirMenu} />
        </header>

        <main className='principalTP'>
          <h1 className='textoPontoTP'>Seus Pontos</h1>
          <div className='cartaoPontosTP'>
            <CartaoPontos />
          </div>
          <div className='botaoRegistrarTP'>
            <BotaoRegistrar />
          </div>
          <div className='premiosTP'>
            <h1 className='headerPremios'>Prêmios</h1>
            <h2 className='headerPremios'>Recomendados para você</h2>
          </div>
          <div className='listaPremios'>
            <ListaPremios />
          </div>

        </main>
        <footer className='rodapeTP'>
          <Navegacao onProfileClick={abrirPerfil} />
          <Navegacao onProfileClick={abrirPerfil} />
        </footer>
      </div>

      {/* Tela de perfil */}
      {perfilAberto && (
        <PerfilCliente onClose={fecharPerfil} />
      )}
    </>
  )
}

export default TelaPrincipal
