import './cabecalho.css';
import menu from './Menu.png'
import usuario from './user.png'
interface CabecalhoProps {
  onProfileClick: () => void;
  onAbrirMenu: () => void;
}

function Cabecalho({ onProfileClick, onAbrirMenu }: CabecalhoProps) {
  return (
    <div className={'cabecalho'}>
        <button className={'botaoMenu'} onClick={onAbrirMenu}>
            <img src={menu} className="icone" />
        </button>
        <button className={'botaoPerfil'} onClick={onProfileClick}>
          <img src={usuario} className={'fotoPerfil'} />
        </button>
    </div>
  );
}

export default Cabecalho;