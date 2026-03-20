import './menuLateral.css';
import fechar from './fechar.png'
import { Link } from 'react-router-dom';
import { version } from '../../../package.json'; 
interface MenuLateralProps {
  ativo: boolean;
  fecharMenu: () => void;
}
function MenuLateral({ ativo, fecharMenu }: MenuLateralProps) {
  return (
    <nav className={`menu-lateral ${ativo ? 'ativo' : ''}`}>
      <button onClick={fecharMenu} className="botao-fechar">
        <img src={fechar} className="icone" />
      </button>
      <ul>
        <li><a><Link to="/">Sair</Link></a></li>
      </ul>
      <footer>Versão @{version}</footer>
    </nav>
  );
}

export default MenuLateral;