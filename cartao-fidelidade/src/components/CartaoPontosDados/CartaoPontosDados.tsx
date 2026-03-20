import { dadosUsuario } from '../../components/CartaoPontosDados/usuarioTeste';
import CartaoPontos from '../../components/CartaoPontos/CartaoPontos';

function CartaoPontosDados() {
  console.log(dadosUsuario);
  return (
      <div className="dadosUsuario">
        {dadosUsuario.map(DadosUsuario => (
          <CartaoPontos
            nome={DadosUsuario.nome}
            nivel={DadosUsuario.nivel}
            pontosAtuais={DadosUsuario.pontosAtuais}
            tempoExpirar={DadosUsuario.tempoExpirar}
          />
        ))}
      </div>
  );
}

export default CartaoPontosDados;