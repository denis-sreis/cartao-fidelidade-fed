import './cartaoPontos.css'
import logo from './logoGorduchinhosII.jpg'
import ellipse from './Ellipse.png'
import { getUsuarioLogado, type Cliente } from '../../api/cliente';
import React, { useState, useEffect } from 'react';


interface DadosCliente {
  cliente?: Cliente;
}

function CartaoPontos({}: DadosCliente) {
    const [cliente, setCliente] = useState<Cliente | null>(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchCliente = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const data = await getUsuarioLogado();
          setCliente(data);
          
        } catch (err) {
          if (err instanceof Error) {
              setError(err.message);
          } else {
              setError("Erro desconhecido ao carregar o Cliente.");
          }
          setCliente(null); 
        } finally {
          setLoading(false);
        }
      };
      
      fetchCliente();
    }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!cliente) return <div>Nenhum dado encontrado.</div>;
  return (
    <>
      <div className={'cartao'}>
        <div className={'cartao-inner'}>
          <img src={ellipse} className={'elipse'} />
          <img src={logo} className={'logo'} />

          <div className={'conteudo'}>
            <div className={'cliente'}>
              <h1 className={'nome'}>{cliente.nome}</h1>
              <h1 className={'pontos'}>{cliente.pontos} <span className='txtPontos'>pontos</span></h1>
            </div>
          </div>
          {/* FIM: CONTEÚDO */}

        </div>
        {/* FIM: CARTÃO INTERNO */}
      </div></>
  );
}
export default CartaoPontos