//Importei o useState do React e o seu modal de Perfil
import React, { useState } from 'react';
import PerfilCliente from '../PerfilCliente/Index';

import './telaPrincipal.css'
import Cabecalho from '../../components/Cabecalho/Cabecalho'
import CartaoPontos from '../../components/CartaoPontosDados/CartaoPontosDados'
import BotaoRegistrar from '../../components/BotaoRegistrar/BotaoRegistrar'
import Navegacao from '../../components/Navegacao/Navegacao'
import ListaPremios from '../../components/ListaPremios/ListaPremios'

function TelaPrincipal() {
  // trabalhando no modal para subir e descer as telas
  const [isPerfilVisible, setPerfilVisible] = useState(false);

  return (
    <>
      <div className='telaPrincipal'>
        <header className='cabecalhoTP'>
          {/* Ele vai usar essa função para nos avisar quando o ícone de perfil for clicado */}
          <Cabecalho onProfileClick={() => setPerfilVisible(true)} />
        </header>
        <main className='principalTP'>
          <h1 className='textoPontoTP'>Seus Pontos</h1>
          <div className='cartaoPontosTP'>
              <CartaoPontos/>
          </div>
          <div className='botaoRegistrarTP'>
            <BotaoRegistrar/>
          </div>
          <div className='premiosTP'>
            <h1 className='headerPremios'>Prêmios</h1>
            <h2 className='headerPremios'>Recomendados para você</h2>
          </div>
          <div className='listaPremios'>
              <ListaPremios/>
          </div>
        
        </main>
        <footer className='rodapeTP'>
          <Navegacao onProfileClick={() => setPerfilVisible(true)} />
        </footer>
      </div>

      {/* O modal é renderizado aqui fora, mas só aparece se 'isPerfilVisible' for true */}
      {isPerfilVisible && (
        <PerfilCliente onClose={() => setPerfilVisible(false)} />
      )}
    </>
  )
}

export default TelaPrincipal