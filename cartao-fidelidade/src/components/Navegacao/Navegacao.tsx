import './navegacao.css';
import  HomeIcon from './homeSelecionada.svg?react'; 
import  UserIcon from './usuarioNSelecionado.svg?react'; 

function Navegacao() {
  return (
    <div className={'rodape'}>
        <button className={'botaoHome'}>
            <HomeIcon className="iconeHome" />
        </button>
        <button className={'botaoUsuario'}>
            <UserIcon className="iconeUsuario" />
        </button>
        
    </div>
  );
}

export default Navegacao;