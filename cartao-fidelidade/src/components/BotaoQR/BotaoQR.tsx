import './botaoQR.css'

interface BotaoQRProps {
  onClick: () => void; 
}

function BotaoQR({ onClick }: BotaoQRProps) {
  return (
    <button className="botao" onClick={onClick}>
    <svg width="20" height="20" viewBox="0 0 24 24">
      <rect width="6" height="6" fill="white"/>
      <rect x="8" width="6" height="6" fill="white"/>
      <rect y="8" width="6" height="6" fill="white"/>
      <rect x="8" y="8" width="3" height="3" fill="white"/>
    </svg>
    Gerar QR Code
  </button>
  );
}

export default BotaoQR;