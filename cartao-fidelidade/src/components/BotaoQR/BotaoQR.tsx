import './botaoQR.css'

interface BotaoQRProps {
  onClick: () => void; // A função que passamos (abrirPontuacoes)
}

function BotaoQR({ onClick }: BotaoQRProps) {
  return (
    // Adicione o onClick ao seu botão principal
    <button className={'botao'} onClick={onClick}>
      Gerar QR Code
    </button>
  );
}

export default BotaoQR;