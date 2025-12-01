import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Gerador-codigo.css';

import QRCode from 'react-qr-code';

import Cabecalho from '../../components/Cabecalho/Cabecalho';
import Navegacao from '../../components/Navegacao/Navegacao';
import PerfilCliente from '../PerfilCliente/Index';


// Payload padrão (fallback) caso não venha da navegação.
// ISSO SERÁ O PRÓXIMO PASSO A SER REMOVIDO QUANDO INTEGRAR A TELA ANTERIOR.
const defaultPayload = {
  tipo: "adicionar",
  pontos: 100,
  titulo: "Compra acima de R$100 (Padrão)",
  descricao: "Pontos bônus por compra (Padrão)",
  expiraEm: "2025-12-31T23:59:59Z"
};

const GeradorCodigo = () => {

  const [qrCodeData, setQrCodeData] = useState('');
  const [isPerfilVisible, setPerfilVisible] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  
  const payloadRecebidoDaRota = location.state?.payload;


  const payloadParaGerar = payloadRecebidoDaRota || defaultPayload;

  useEffect(() => {
    
    let isMounted = true;

    const fetchQrCodeContent = async () => {
      try {

        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            console.error("Erro: Usuário não autenticado.");
            if (isMounted) setQrCodeData('ERRO: Você precisa fazer login como funcionário.');
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
          const errorData = await response.json();
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
            console.error("Erro ao buscar dados para o QR Code:", error);
            setQrCodeData(`ERRO: ${error instanceof Error ? error.message : "Falha na geração."}`);
             if (error instanceof Error && error.message.includes('Sessão expirada')) {
                setTimeout(() => navigate('/'), 3000);
            }
        }
      }
    };

    fetchQrCodeContent();

    return () => {
      isMounted = false;
    };

  }, [payloadParaGerar, navigate]);


  return (
    <>
      <div className="gerador-codigo-container">
        <header className="gerador-codigo-header">
          <Cabecalho onProfileClick={() => setPerfilVisible(true)} />
        </header>

        <main className="gerador-codigo-main">
          <h1 className="main-title">QR Code Pontuação</h1>

          <div className="qrcode-display-area">
            {qrCodeData && !qrCodeData.startsWith('ERRO:') ? (
              <QRCode
                value={qrCodeData}
                size={250}
                fgColor="#000000"
                bgColor="transparent"
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            ) : (
              <p className="error-text">{qrCodeData || 'Aguardando dados para gerar o QR Code...'}</p>
            )}
          </div>

          <p className="instruction-text">
            {payloadParaGerar.titulo || 'Gerando seu QR Code...'}
          </p>
        </main>

        <footer className="gerador-codigo-footer">
          <Navegacao onProfileClick={() => setPerfilVisible(true)} />
        </footer>
      </div>

      {isPerfilVisible && (
        <PerfilCliente onClose={() => setPerfilVisible(false)} />
      )}
    </>
  );
};

export default GeradorCodigo;