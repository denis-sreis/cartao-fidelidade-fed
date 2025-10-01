import { premios } from '../../components/ListaPremios/produtosTeste';
import ItemPremio from '../../components/ItemPremios/ItemPremios';
import './listaPremios.css';

function ListaPremios() {
  return (
    <section className="listaPremios">
      <div className="premiosGrid">
        {premios.map(premio => (
          <ItemPremio
            key={premio.id}
            nome={premio.nome}
            pontos={premio.pontos}
            imagemUrl={premio.imagemUrl}
          />
        ))}
      </div>
    </section>
  );
}

export default ListaPremios;