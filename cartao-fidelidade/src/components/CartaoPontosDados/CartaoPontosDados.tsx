import { dadosUsuario } from '../../components/CartaoPontosDados/usuarioTeste';
import CartaoPontos from '../../components/CartaoPontos/CartaoPontos';

function CartaoPontosDados() {
  console.log(dadosUsuario);
  return (
      <div className="dadosUsuario">
        {dadosUsuario.map(DadosUsuario => (
          <CartaoPontos
            nome={DadosUsuario.nome}
            pontosAtuais={DadosUsuario.pontosAtuais}/>
        ))}
      </div>
  );
}

export default CartaoPontosDados;