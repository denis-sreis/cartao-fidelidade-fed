
import { useState } from 'react'
import './telaPrincipal.css'
import Cabecalho from '../../../components/Cabecalho/Cabecalho'
import CartaoADM from '../../../components/CartaoADM/CartaoADM'
import Navegacao from '../../../components/Navegacao/Navegacao'
import MenuLateral from '../../../components/MenuLateral/MenuLateral'
import AreaADM from '../../../components/AreaADM/AreaADM'
import ListaPremiosADM from '../../../components/ListaPremios/ListaPremios'
import BotaoQR from '../../../components/BotaoQR/BotaoQR'


import PerfilCliente from '../../PerfilCliente/Index'
import CadastrarPremio from '../../CadastrarPremio/Index'
import MeusClientes from '../../MeusClientes/Index'
import Pontuacoes from '../../Pontuacoes/Index'


function TelaPrincipalADM() {
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

  return (
    // Use <>...</> (Fragment) para envolver tudo se precisar
    <>
      <div className={`telaPrincipal ${menuAberto ? 'menu-aberto' : ''}`}>
        {menuAberto && <div className="overlay" onClick={fecharMenu}></div>}
        <MenuLateral ativo={menuAberto} fecharMenu={fecharMenu} />
        
        <header className='cabecalhoTP'>
          {/* 4. Passe a função 'abrirPerfil' */}
          <Cabecalho onProfileClick={abrirPerfil} onAbrirMenu={abrirMenu} />
        </header>

        <main className='principalADMTP'>
          <h1 className='textoPontoADMTP'>GORDUCHINHOS II</h1>
          <div className='cartaoADMTP'>
              <CartaoADM/>
          </div>
          <div className='botaoQRADMTP'>
            {/* 4. Passe a função 'abrirPontuacoes' */}
            <BotaoQR onClick={abrirPontuacoes} />
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
              {/* 4. Passe as funções para o AreaADM */}
              <AreaADM
                onCadastrarPremioClick={abrirCadastrarPremio}
                onConsultarClientesClick={abrirMeusClientes}
              />
          </div>
        
        </main>
        <footer className='rodapeADMTP'>
          {/* 4. Passe a função 'abrirPerfil' */}
          <Navegacao onProfileClick={abrirPerfil}/>
        </footer>
      </div>

      {/* 5. RENDERIZE OS MODAIS CONDICIONALMENTE */}
      {/* (Exatamente como você fez no Home.tsx)   */}
      
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
    </>
  )
}

export default TelaPrincipalADM