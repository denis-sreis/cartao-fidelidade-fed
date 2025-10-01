import './telaPrincipal.css'
import Cabecalho from '../../components/Cabecalho/Cabecalho'
import CartaoPontos from '../../components/CartaoPontosDados/CartaoPontosDados'
import BotaoRegistrar from '../../components/BotaoRegistrar/BotaoRegistrar'
import Navegacao from '../../components/Navegacao/Navegacao'
import ListaPremios from '../../components/ListaPremios/ListaPremios'

function TelaPrincipal() {
  return (
    <div className='telaPrincipal'>
      <header className='cabecalhoTP'>
        <Cabecalho/>
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
        <Navegacao/>
      </footer>
    </div>
  )
}

export default TelaPrincipal
