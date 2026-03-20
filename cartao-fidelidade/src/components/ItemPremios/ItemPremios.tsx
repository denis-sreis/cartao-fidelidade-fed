import './itemPremios.css';
import  Canto from './corner.png'; 

interface ItemPremiosProps {
  nome: string;
  pontos: number;
  imagemUrl: string;
  onClick?: () => void; 
}
function ItemPremios({ nome, pontos, imagemUrl, onClick }: ItemPremiosProps) {
    const pontosFormatados = pontos.toString().padStart(2, '0');
    
    const itemClasses = `itemPremio ${onClick ? 'item-clicavel' : ''}`;

  return (
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