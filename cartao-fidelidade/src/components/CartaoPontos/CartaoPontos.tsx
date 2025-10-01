import './cartaoPontos.css'
import logo from './logoGorduchinhosII.jpg'
import  Elipse from './Ellipse.svg?react'; 

interface DadosUsuario {
  nome: string;
  nivel: string;
  pontosAtuais: number;
  tempoExpirar: number;
}
function CartaoPontos({ nome, nivel, pontosAtuais, tempoExpirar }: DadosUsuario) {
  const pontosAtuaisFormatados = pontosAtuais.toString().padStart(2, '0');
  return (
    <>
    <div className={'cartao'}>
    <Elipse className={'elipse'}/>
    <img src={logo} className={'logo'} />
    <div className={'cliente'}>
        <h1 className={'nome'}>{nome}</h1>
        <h1 className={'nivel'}>Cliente {nivel}</h1>
    </div>
    <div className={'pontos'}>
        <h1 className={'ponto'}>{pontosAtuaisFormatados}</h1>
        <div className={'pontoInfo'}>
            <h1 className={'textoPontos'}>Visitas nos últimos 30 dias</h1>
            <h1 className={'tempoExpirar'}>Expiram em {tempoExpirar} dias</h1>
        </div>
    </div>
    </div></>
  );
}
export default CartaoPontos
