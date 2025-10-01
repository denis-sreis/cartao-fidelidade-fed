import './cabecalho.css';
import menu from './Menu.png'

function Cabecalho() {
  return (
    <div className={'cabecalho'}>
        <button className={'botaoMenu'}>
            <img src={menu} className="icone" />
        </button>
        <button className={'botaoPerfil'}>
            <img src={"https://thispersondoesnotexist.com/"} className={'fotoPerfil'} />
        </button>
        
    </div>
  );
}

export default Cabecalho;