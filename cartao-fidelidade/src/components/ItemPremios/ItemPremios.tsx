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
    
    // 1. Extração garantida: pegamos o último pedaço da URL e limpamos qualquer coisa que não seja número
    const partes = imagemUrl.split('/');
    const ultimoPedaco = partes[partes.length - 1];
    
    // Filtra apenas os números (isso evita que o ".png" ou outros textos quebrem o parseInt)
    const idApenasNumeros = ultimoPedaco.replace(/\D/g, ''); 
    const imageId = idApenasNumeros ? parseInt(idApenasNumeros, 10) : 0;

    // 2. Só chama o hook se for um ID de produto real (maior que 0)
    // E ignoramos o ID 70972 que é o do ícone padrão
    const deveChamarHook = imageId > 0 && imageId !== 70972;
    const imagemBase64 = useImageBase64(deveChamarHook ? imageId : 0); 

    // 3. Define qual imagem mostrar
    const srcFinal = (deveChamarHook && imagemBase64) ? imagemBase64 : imagemUrl;

    // Log de Debug atualizado
    console.log(`Produto: ${nome} | URL Original: ${imagemUrl} | ID Extraído: ${imageId} | Usando Base64: ${!!imagemBase64}`);

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