import './cabecalho.css';
import menu from './Menu.png'

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
          <img src={"https://thispersondoesnotexist.com/"} className={'fotoPerfil'} />
        </button>
    </div>
  );
}

export default Cabecalho;