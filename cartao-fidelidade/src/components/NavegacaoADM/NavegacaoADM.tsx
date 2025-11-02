import './navegacaoADM.css';
import  HomeIcon from './homeSelecionada.png'; 

interface CabecalhoProps {
  onProfileClick: () => void;
}

function Navegacao({ onProfileClick }: CabecalhoProps) {
  return (
    <div className={'rodape'}>
        <button className={'botaoHome'}>
            <img src={HomeIcon} className="iconeHome" />
        </button>
        
    </div>
  );
}

export default Navegacao;