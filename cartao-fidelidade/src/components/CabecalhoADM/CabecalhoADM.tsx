import './cabecalhoADM.css';
import menu from './Menu.png'

interface CabecalhoProps {
  onAbrirMenu: () => void;
}

function Cabecalho({ onAbrirMenu }: CabecalhoProps) {
  return (
    <div className={'cabecalho'}>
        <button className={'botaoMenu'} onClick={onAbrirMenu}>
            <img src={menu} className="icone" />
        </button>
    </div>
  );
}

export default Cabecalho;