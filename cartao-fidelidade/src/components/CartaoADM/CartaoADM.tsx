import './cartaoADM.css'
import logo from './logoGorduchinhosII.jpg'
import ellipse from './Ellipse.png'

function CartaoADM() {
  return (
    <>
    <div className={'cartao'}>
    <img src={ellipse} className={'elipse'}/>
    <img src={logo} className={'logo'} />
    <div className={'administrador'}>
        <h1 className={'textoPrincipal'}>Área do Administrador</h1>
    </div>
    </div></>
  );
}
export default CartaoADM
