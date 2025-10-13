import './cabecalho.css';
import menu from './Menu.png'
import { Link } from 'react-router-dom';
interface CabecalhoProps {
  onAbrirMenu: () => void;
}
function Cabecalho({ onAbrirMenu }: CabecalhoProps) {
  return (
    <div className={'cabecalho'}>
        <button className={'botaoMenu'} onClick={onAbrirMenu}>
            <img src={menu} className="icone" />
        </button>
        <Link to="/perfil" className={'botaoPerfil'}>
          <img src={"https://thispersondoesnotexist.com/"} className={'fotoPerfil'} />
        </Link>
    </div>
  );
}

export default Cabecalho;