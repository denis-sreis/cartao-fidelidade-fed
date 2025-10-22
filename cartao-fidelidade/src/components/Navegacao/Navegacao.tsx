import './navegacao.css';
import  HomeIcon from './homeSelecionada.png'; 
import  UserIcon from './usuarioNSelecionado.png'; 

interface CabecalhoProps {
  onProfileClick: () => void;
}

function Navegacao({ onProfileClick }: CabecalhoProps) {
  return (
    <div className={'rodape'}>
        <button className={'botaoHome'}>
            <img src={HomeIcon} className="iconeHome" />
        </button>
        
        <button className={'botaoPerfil'} onClick={onProfileClick}>
            <img src={UserIcon} className="iconeUsuario" />
        </button>
        
    </div>
  );
}

export default Navegacao;