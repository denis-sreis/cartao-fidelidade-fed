import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Gerador-codigo.css';

import QRCode from 'react-qr-code';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import Cabecalho from '../../components/CabecalhoADM/CabecalhoADM';
import Navegacao from '../../components/Navegacao/Navegacao';
import PerfilCliente from '../PerfilCliente/Index';

import type { PayloadGeracao } from '../../types/PayloadGeracao';

const GeradorCodigo = () => {
  const [qrCodeData, setQrCodeData] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  
  // Estado para controlar a visibilidade do menu de navegação lateral (se houver)
  const [menuAberto, setMenuAberto]=useState(false);
  const abrirMenu = () => setMenuAberto(true);
  const fecharMenu = () => setMenuAberto(false);

  // Estado CORRIGIDO e ÚNICO para a visibilidade do PerfilCliente
  const [perfilAberto, setPerfilAberto] = useState(false);


  const payloadParaGerar = location.state?.payload as PayloadGeracao | undefined;


  // --- BLOCo DE ERRO: Payload não encontrado ---
  if (!payloadParaGerar) {
    return (
      <>
      {menuAberto && <div className="overlay" onClick={fecharMenu}></div>}
        <MenuLateral ativo={menuAberto} fecharMenu={fecharMenu} />
        <header className="gerador-codigo-header">
          <Cabecalho onAbrirMenu={abrirMenu} />
        </header>
        <main className="gerador-codigo-main" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ color: 'red' }}>Erro de Navegação</h2>
          <p className="instruction-text">
            Não foi possível identificar a pontuação selecionada.
          </p>
          <button 
            onClick={() => navigate('/selecionar-pontuacao')} 
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
          >
            Voltar e Selecionar
          </button>
        </main>
        <footer className="gerador-codigo-footer">
          {/* CORRIGIDO: Usando setPerfilAberto */}
          <Navegacao onProfileClick={() => setPerfilAberto(true)} />
        </footer>
         {/* CORRIGIDO: Usando perfilAberto */}
         {perfilAberto && <PerfilCliente onClose={() => setPerfilAberto(false)} />}
      </>
    );
  }

  // --- LÓGICA DE GERAÇÃO DO QR CODE ---
  useEffect(() => {
    let isMounted = true;

    const fetchQrCodeContent = async () => {
      if (isMounted) {
          setQrCodeData('');
          setIsLoading(true);
      }

      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            console.error("Erro: Usuário não autenticado.");
            if (isMounted) setQrCodeData('ERRO: Login de funcionário necessário.');
            return;
        }

        const API_URL = 'http://localhost:3000/api/fidelidade/qrcode/gerar';

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(payloadParaGerar),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          if (response.status === 401) {
            throw new Error('Sessão expirada. Faça login novamente.');
          }
          throw new Error(errorData.mensagem || `Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Resposta do Backend:", data);

        if (isMounted) {
            if (data.qrcode && data.qrcode.token) {
              setQrCodeData(data.qrcode.token);
            } else if (data.qrcode && data.qrcode.id) {
                 console.warn("Aviso: Usando ID numérico.");
                 setQrCodeData(data.qrcode.id.toString());
            } else {
                 throw new Error('Token/ID não encontrado na resposta.');
            }
        }

      } catch (error) {
        if (isMounted) {
            console.error("Erro ao gerar QR Code:", error);
            setQrCodeData(`ERRO: ${error instanceof Error ? error.message : "Falha na geração."}`);
             if (error instanceof Error && error.message.includes('Sessão expirada')) {
                setTimeout(() => navigate('/'), 3000);
            }
        }
      } finally {
        // Melhoria: Simplificado, não precisa checar 'isMounted' no finally
        setIsLoading(false);
      }
    };

    fetchQrCodeContent();

    return () => {
      isMounted = false;
    };

  }, [payloadParaGerar, navigate]);


  // --- RENDERIZAÇÃO PRINCIPAL ---
  return (
    <>
    
      <div className="gerador-codigo-container">
        {menuAberto && <div className="overlay" onClick={fecharMenu}></div>}
        <MenuLateral ativo={menuAberto} fecharMenu={fecharMenu} />
        <header className="gerador-codigo-header">
          <Cabecalho onAbrirMenu={abrirMenu} />
        </header>

        <main className="gerador-codigo-main">
          <h1 className="main-title">QR Code Pontuação</h1>

          <div className="qrcode-display-area">
            {isLoading ? (
                 <p>Gerando...</p>
            ) : qrCodeData && !qrCodeData.startsWith('ERRO:') ? (
              <QRCode
                value={qrCodeData}
                size={250}
                fgColor="#000000"
                bgColor="transparent"
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            ) : (
              <p className="error-text">{qrCodeData || 'Aguardando dados...'}</p>
            )}
          </div>

          <p className="instruction-text">
            {/* Melhoria: Uso de Optional Chaining para garantir que 'titulo' exista */}
            {payloadParaGerar?.titulo}
          </p>
        </main>

        <footer className="gerador-codigo-footer">
           {/* CORRIGIDO: Usando setPerfilAberto */}
          <Navegacao onProfileClick={() => setPerfilAberto(true)} />
        </footer>
      </div>

       {/* CORRIGIDO: Usando perfilAberto */}
      {perfilAberto && (
        <PerfilCliente onClose={() => setPerfilAberto(false)} />
      )}
    </>
  );
};

export default GeradorCodigo;