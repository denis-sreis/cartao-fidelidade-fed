import './navegacao.css';
import  HomeIcon from './homeSelecionada.png'; 
import  UserIcon from './usuarioNSelecionado.png'; 
import { Link } from 'react-router-dom';

function Navegacao() {
  return (
    <div className={'rodape'}>
        <button className={'botaoHome'}>
            <img src={HomeIcon} className="iconeHome" />
        </button>
        
        <Link to="/perfil" className={'botaoUsuario'}>
            <img src={UserIcon} className="iconeUsuario" />
        </Link>
    </div>
  );
}

export default Navegacao;