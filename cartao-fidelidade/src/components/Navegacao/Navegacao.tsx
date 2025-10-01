import './navegacao.css';
import  HomeIcon from './homeSelecionada.png'; 
import  UserIcon from './usuarioNSelecionado.png'; 

function Navegacao() {
  return (
    <div className={'rodape'}>
        <button className={'botaoHome'}>
            <img src={HomeIcon} className="iconeHome" />
        </button>
        <button className={'botaoUsuario'}>
            <img src={UserIcon} className="iconeUsuario" />
        </button>
        
    </div>
  );
}

export default Navegacao;