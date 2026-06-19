import { useState, useEffect } from 'react';
import './cabecalho.css';
import menu from './Menu.png';
import usuarioPlaceholder from './user.png'; 
import { getUsuarioLogado } from '../../api/cliente'; 

interface CabecalhoProps {
  onProfileClick: () => void;
  onAbrirMenu: () => void;
}

function Cabecalho({ onProfileClick, onAbrirMenu }: CabecalhoProps) {
  const [fotoAtual, setFotoAtual] = useState<string>(usuarioPlaceholder);

    useEffect(() => {
        const carregarFoto = async () => {
          try {
            const dados = await getUsuarioLogado();
            
            // CORREÇÃO 1: Mudar de 'imagem' para 'foto_data_url'
            if (dados.foto_data_url) {
                setFotoAtual(dados.foto_data_url);
            }
          } catch (error) {
            console.error("Erro ao carregar foto do cabeçalho:", error);
          }
        };

        carregarFoto();
      }, []); // CORREÇÃO 2: Faltavam estes colchetes vazios aqui! Sem eles, a API é chamada infinitamente.

  return (
    <div className={'cabecalho'}>
        <button className={'botaoMenu'} onClick={onAbrirMenu}>
            <img src={menu} className="icone" alt="Menu" />
        </button>
        <button className={'botaoPerfil'} onClick={onProfileClick}>
          <img 
            src={fotoAtual} 
            className={'fotoPerfil'} 
            alt="Perfil" 
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
        </button>
    </div>
  );
}

export default Cabecalho;