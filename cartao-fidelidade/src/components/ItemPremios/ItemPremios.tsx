import './itemPremios.css';
import  Canto from './corner.png'; 

interface ItemPremiosProps {
  nome: string;
  pontos: number;
  imagemUrl: string;
  onClick?: () => void; // 1. Adiciona a prop onClick opcional
}
function ItemPremios({ nome, pontos, imagemUrl, onClick }: ItemPremiosProps) {
    const pontosFormatados = pontos.toString().padStart(2, '0');
    
    // 2. Adiciona uma classe se o item for clicável
    const itemClasses = `itemPremio ${onClick ? 'item-clicavel' : ''}`;

  return (
    // 3. Aplica o onClick e as classes
    <div className={itemClasses} onClick={onClick}> 
        <div className='premio'>
            <img src={Canto} className='canto'/>
            <h1 className='num'>{pontosFormatados}</h1>
            <h1 className='pontosLabel'>pontos</h1>
            <img src={imagemUrl} alt={nome} className="comida" />
        </div>
        <h1 className='nomeProduto'>{nome}</h1>
    </div>
  );
}

export default ItemPremios;