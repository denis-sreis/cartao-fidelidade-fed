import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Gerador-codigo.css';

import QRCode from 'react-qr-code';

import Cabecalho from '../../components/Cabecalho/Cabecalho';
import Navegacao from '../../components/Navegacao/Navegacao';
import PerfilCliente from '../PerfilCliente/Index';

// TOKEN DE TESTE HARDCODED (Substitua se expirar)
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGlwbyI6ImZ1bmNpb25hcmlvIiwiaWF0IjoxNzYzOTQ3MTU5LCJleHAiOjE3NjY1MzkxNTl9.klkpRg-0zOrYevpKyHnSiExyLIDvJ182fRxD3na0j6M';

// --- PAYLOAD ESTÁTICO FORA DO COMPONENTE ---
const defaultPayload = {
  tipo: "adicionar",
  pontos: 100,
  titulo: "Compra acima de R$100 (Teste Estático)",
  descricao: "Pontos bônus por compra (Teste Estático)",
  expiraEm: "2025-12-31T23:59:59Z"
};
// -------------------------------------------

const GeradorCodigo = () => {

  const [qrCodeData, setQrCodeData] = useState('');
  const [isPerfilVisible, setPerfilVisible] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const payloadRecebidoDaRota = location.state?.payload;

  const payloadParaGerar = payloadRecebidoDaRota || defaultPayload;

  useEffect(() => {
    // 1. Bandeira para saber se esta execução do efeito ainda é válida
    let isMounted = true;

    const fetchQrCodeContent = async () => {
      try {
        if (!AUTH_TOKEN) {
            console.error("Erro: Token de autenticação não configurado.");
            // Só atualiza se ainda for válido
            if (isMounted) setQrCodeData('ERRO: Token de autenticação não configurado.');
            return;
        }

        const API_URL = 'http://localhost:3000/api/fidelidade/qrcode/gerar';

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AUTH_TOKEN}`,
          },
          body: JSON.stringify(payloadParaGerar),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.mensagem || `Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Resposta do Backend:", data);

        // 2. VERIFICAÇÃO FINAL: Só atualiza o estado se esta for a execução válida
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
        // Só atualiza o erro se for válido
        if (isMounted) {
            console.error("Erro ao buscar dados para o QR Code:", error);
            setQrCodeData(`ERRO: ${error instanceof Error ? error.message : "Falha na geração."}`);
        }
      }
    };

    fetchQrCodeContent();

    
    return () => {
      isMounted = false;
    };

  }, [payloadParaGerar]);


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
              <p>{qrCodeData || 'Aguardando dados para gerar o QR Code...'}</p>
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