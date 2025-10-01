import './cabecalho.css';
import  MenuIcon from './Menu.svg?react'; 

function Cabecalho() {
  return (
    <div className={'cabecalho'}>
        <button className={'botaoMenu'}>
            <MenuIcon className="icone" />
        </button>
        <button className={'botaoPerfil'}>
            <img src={"https://thispersondoesnotexist.com/"} className={'fotoPerfil'} />
        </button>
        
    </div>
  );
}

export default Cabecalho;