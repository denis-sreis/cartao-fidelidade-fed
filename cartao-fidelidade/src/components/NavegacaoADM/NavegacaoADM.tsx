import './navegacaoADM.css';
import  HomeIcon from './homeSelecionada.png'; 



function Navegacao() {
  return (
    <div className={'rodape'}>
        <button className={'botaoHome'}>
            <img src={HomeIcon} className="iconeHome" />
        </button>
        
    </div>
  );
}

export default Navegacao;