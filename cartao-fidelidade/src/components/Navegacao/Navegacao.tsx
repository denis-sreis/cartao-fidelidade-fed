import './navegacao.css';
import HomeIcon from './homeSelecionada.png';
import UserIcon from './usuarioNSelecionado.png';

interface CabecalhoProps {
  onProfileClick: () => void;
  onHomeClick: () => void; // 1. função de clique da Home
}

function Navegacao({ onProfileClick, onHomeClick }: CabecalhoProps) { // 2. Recebe a prop 
  return (
    <div className={'rodape'}>
      {/* 3. evento onClick no botão da Home */}
      <button className={'botaoHome'} onClick={onHomeClick}>
        <img src={HomeIcon} className="iconeHome" alt="Home" />
      </button>

      <button className={'botaoPerfil'} onClick={onProfileClick}>
        <img src={UserIcon} className="iconeUsuario" alt="Perfil" />
      </button>
    </div>
  );
}

export default Navegacao;