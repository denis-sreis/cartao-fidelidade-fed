import './navegacaoADM.css';
import  HomeIcon from './homeSelecionada.png'; 

interface CabecalhoProps {
  onHomeClick: () => void; // 1. função de clique da Home
}

function Navegacao({ onHomeClick }: CabecalhoProps) { // 2. Recebe a prop 
  return (
    <div className={'rodape'}>
      {/* 3. evento onClick no botão da Home */}
      <button className={'botaoHome'} onClick={onHomeClick}>
        <img src={HomeIcon} className="iconeHome" alt="Home" />
      </button>

    </div>
  );
}
export default Navegacao;