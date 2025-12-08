import './botaoRegistrar.css';
import { useNavigate } from 'react-router-dom';

function BotaoRegistrar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/leitor-codigo');
  };

  return (
    <div className={'botao'} onClick={handleClick}>
      <h1>Registrar Presença</h1>
    </div>
  );
}

export default BotaoRegistrar;