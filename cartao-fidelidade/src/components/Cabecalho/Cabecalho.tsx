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
        
        if (dados.imagem) {
            setFotoAtual(dados.imagem);
        }
      } catch (error) {
        console.error("Erro ao carregar foto do cabeçalho:", error);
      }
    };

    carregarFoto();
  },); 

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