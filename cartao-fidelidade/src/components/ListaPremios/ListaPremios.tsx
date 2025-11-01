// 1. Importe o tipo 'Premio' junto com os dados
import { premios } from '../../components/ListaPremios/produtosTeste';
import type { Premio } from '../../components/ListaPremios/produtosTeste';
import ItemPremio from '../../components/ItemPremios/ItemPremios';
import './listaPremios.css';

// 2. Defina a nova prop que o componente aceita
interface ListaPremiosProps {
  onPremioClick?: (premio: Premio) => void;
}

function ListaPremios({ onPremioClick }: ListaPremiosProps) { // 3. Receba a prop
  
  return (
    <section className="listaPremios">
      <div className="premiosGrid">
        {premios.map(premio => (
          <ItemPremio
            key={premio.id}
            nome={premio.nome}
            pontos={premio.pontos}
            imagemUrl={premio.imagemUrl}
            // 4. Passe a função 'onClick' para o ItemPremio
            //    Quando clicado, ele chama 'onPremioClick' com os dados do prêmio
            onClick={onPremioClick ? () => onPremioClick(premio) : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default ListaPremios;