import './cartaoPontos.css'
import logo from './logoGorduchinhosII.jpg'
import ellipse from './Ellipse.png'

interface DadosUsuario {
  nome: string;
  pontosAtuais: number;
}
function CartaoPontos({ nome, pontosAtuais }: DadosUsuario) {
  const pontosAtuaisFormatados = pontosAtuais.toString().padStart(2, '0');
  return (
    <>
    <div className={'cartao'}>
    <img src={ellipse} className={'elipse'}/>
    <img src={logo} className={'logo'} />
    <div className={'cliente'}>
        <h1 className={'nome'}>{nome}</h1>
    </div>
    <div className={'pontos'}>
        <h1 className={'ponto'}>{pontosAtuaisFormatados}</h1>
        <div className={'pontoInfo'}>
            <h1 className={'textoPontos'}>Pontos</h1>
        </div>
    </div>
    </div></>
  );
}
export default CartaoPontos
