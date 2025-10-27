import './botaoQR.css'

interface BotaoQRProps {
  onClick: () => void; 
}

function BotaoQR({ onClick }: BotaoQRProps) {
  return (
    <button className={'botao'} onClick={onClick}>
      Gerar QR Code
    </button>
  );
}

export default BotaoQR;