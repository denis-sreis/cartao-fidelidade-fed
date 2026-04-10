import './itemPremios.css';
import Canto from './corner.png'; 
import { useImageBase64 } from '../../hooks/useImageBase64'; 

interface ItemPremiosProps {
  nome: string;
  pontos: number;
  imagemUrl: string;
  onClick?: () => void; 
}

function ItemPremios({ nome, pontos, imagemUrl, onClick }: ItemPremiosProps) {
    const pontosFormatados = pontos.toString().padStart(2, '0');
    
    // 1. Verificamos se a imagem é a padrão (aquela do flaticon)
    // Se for a padrão, não extraímos ID e nem chamamos o hook
    const isDefaultImage = imagemUrl.includes('flaticon.com');

    // 2. Só tentamos extrair o ID se NÃO for a imagem padrão
    const idExtraidoString = !isDefaultImage ? imagemUrl.split('/').pop() || "" : "";
    const imageId = !isNaN(Number(idExtraidoString)) && idExtraidoString !== "" ? Number(idExtraidoString) : 0;

    // 3. Só chamamos o hook se tivermos um ID válido e não for imagem padrão
    // Se for 0, o hook não deve disparar a requisição (verifique isso no useImageBase64)
    const imagemBase64 = useImageBase64(imageId > 0 ? imageId : 0); 

    // 4. Lógica de exibição final
    // Se tiver base64, usa. Se não, usa a imagemUrl original (que pode ser a do flaticon)
    const srcFinal = (imagemBase64 && imageId > 0) ? imagemBase64 : imagemUrl;

    return (
        <div className={`itemPremio ${onClick ? 'item-clicavel' : ''}`} onClick={onClick}> 
            <div className='premio'>
                <img src={Canto} className='canto' alt="detalhe" />
                <h1 className='num'>{pontosFormatados}</h1>
                <h1 className='pontosLabel'>pontos</h1>
                
                <img 
                    src={srcFinal} 
                    alt={nome} 
                    className="comida" 
                    onError={(e) => {
                        // Evita loop infinito: se até a imagem de erro falhar, para por aqui
                        if ((e.target as HTMLImageElement).src !== 'https://cdn-icons-png.flaticon.com/128/70/70972.png') {
                            (e.target as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/128/70/70972.png';
                        }
                    }}
                />
            </div>
            <h1 className='nomeProduto'>{nome}</h1>
        </div>
    );
}
export default ItemPremios;