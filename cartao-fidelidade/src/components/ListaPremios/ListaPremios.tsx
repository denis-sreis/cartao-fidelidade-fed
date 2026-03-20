import React, { useState, useEffect } from 'react';
import { getPremios, type Premio } from '../../api/produto'; 
import ItemPremio from '../ItemPremios/ItemPremios';
import './listaPremios.css';

interface ListaPremiosProps {
  onPremioClick?: (premio: Premio) => void;
}

function ListaPremios({ onPremioClick }: ListaPremiosProps) {
  
  const [premios, setPremios] = useState<Premio[] | null>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPremios = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getPremios();
        setPremios(data);
        
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Erro desconhecido ao carregar os prêmios.");
        }
        setPremios(null); 
      } finally {
        setLoading(false);
      }
    };
    
    fetchPremios();
  }, []);

  if (loading) {
    return <section className="listaPremios"><p style={{ textAlign: 'center' }}>Carregando prêmios...</p></section>;
  }

  if (error) {
    return <section className="listaPremios"><p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p></section>;
  }
  
  if (!premios || premios.length === 0) {
    return <section className="listaPremios"><p style={{ textAlign: 'center' }}>Nenhum prêmio cadastrado.</p></section>;
  }

  return (
    <section className="listaPremios">
      <div className="premiosGrid">
        {premios.map(premio => (
          premio && (
            <ItemPremio
              key={premio.id}
              nome={premio.nome}
              pontos={premio.pontos}
              imagemUrl={premio.imagemUrl || ''} 
              onClick={onPremioClick ? () => onPremioClick(premio) : undefined}
            />
          )
        ))}
      </div>
    </section>
  );
}

export default ListaPremios;