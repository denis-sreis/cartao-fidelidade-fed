import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import './Leitor-codigo.css';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import Navegacao from '../../components/Navegacao/Navegacao';
import PerfilCliente from '../PerfilCliente/Index';

const API_USAR_URL = 'http://localhost:3000/api/fidelidade/qrcode/usar';

const LeitorCodigo = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const abrirMenu = () => setMenuAberto(true);
  const fecharMenu = () => setMenuAberto(false);

  const [perfilAberto, setPerfilAberto] = useState(false);
  const abrirPerfil = () => setPerfilAberto(true);
  const fecharPerfil = () => setPerfilAberto(false);

  const [scanStatus, setScanStatus] = useState<'scanning' | 'processing' | 'success' | 'error'>('scanning');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('Leitura Concluída!');
  const navigate = useNavigate();

  const qrCodeScannerRef = useRef<Html5Qrcode | null>(null);

  const handleRetry = () => {
    setScanStatus('scanning');
    setErrorMessage('');
    window.location.reload();
  };

  useEffect(() => {
    const qrCodeSuccessCallback = async (decodedText: string) => {
      console.log("QR Code lido, iniciando validação (POST /usar):", decodedText);

      const scanner = qrCodeScannerRef.current;
      if (scanner && scanner.isScanning) {
        try { await scanner.stop(); } catch (err) { console.error(err); }
      }

      setScanStatus('processing');
      setErrorMessage('');

      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {

          throw new Error('Autenticação necessária. Faça login no celular como Cliente.');
        }


        const response = await fetch(API_USAR_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ token: decodedText })
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Sessão expirada. Faça login novamente.');
          }
          throw new Error(data.mensagem || data.error || 'Falha ao processar o QR Code.');
        }

        console.log("Sucesso no processamento:", data);
        setScanStatus('success');
        if (data.mensagem) {
          setSuccessMessage(data.mensagem);
        }

        setTimeout(() => {
          navigate('/principal');
        }, 3000);

      } catch (error) {
        console.error("Erro durante o processamento:", error);
        setScanStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Ocorreu um erro inesperado.');

        if (error instanceof Error && (error.message.includes('Autenticação') || error.message.includes('Sessão'))) {
          setTimeout(() => navigate('/'), 3000);
        }
      }
    };


    if (!qrCodeScannerRef.current) {
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };
      const scanner = new Html5Qrcode('reader');
      qrCodeScannerRef.current = scanner;

      scanner.start({ facingMode: "environment" }, config, qrCodeSuccessCallback, undefined)
        .catch(err => {
          console.error("Não foi possível iniciar o scanner", err);
          setScanStatus('error');
          setErrorMessage("Não foi possível acessar a câmera. Verifique as permissões e o HTTPS.");
        });
    }

    return () => {
      const scannerInstance = qrCodeScannerRef.current;
      if (scannerInstance && scannerInstance.isScanning) {
        scannerInstance.stop().catch(err => console.error(err));
      }
    };

  }, [navigate]);

  return (
    <>
      <div className={`leitor-codigo-container ${menuAberto ? 'menu-aberto' : ''}`}>
        {menuAberto && <div className="overlay" onClick={fecharMenu}></div>}
        <MenuLateral ativo={menuAberto} fecharMenu={fecharMenu} />

        {/* <div className="leitor-codigo-container"> */}
        <header className="leitor-codigo-header">
          <Cabecalho onProfileClick={abrirPerfil} onAbrirMenu={abrirMenu} />
        </header>

        <main className="leitor-codigo-main">
          <h1 className="main-title">Leitor de QR Code</h1>
          <div className="qrcode-camera-container">
            {scanStatus === 'scanning' ? (
              <div id="reader" className="qrcode-reader-element"></div>
            ) : null}
          </div>
          <p className="instruction-text">
            Aponte a câmera para o QR Code do cliente para registrar a presença.
          </p>
        </main>

        <footer className="leitor-codigo-footer">
          <Navegacao onProfileClick={abrirPerfil} />
        </footer>
      </div>

      {scanStatus !== 'scanning' && (
        <div className={`overlay-container ${scanStatus}`}>
          <div className="overlay-content">

            {scanStatus === 'processing' && (
              <>
                <div className="spinner"></div>
                <p>Processando QR Code...</p>
              </>
            )}

            {scanStatus === 'success' && (
              <>
                <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                  <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
                <p>{successMessage}</p>
              </>
            )}

            {scanStatus === 'error' && (
              <div className="error-content">
                <svg className="error-x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="error-circle" cx="26" cy="26" r="25" fill="none" />
                  <path className="error-line" fill="none" d="M16 16 36 36 M36 16 16 36" />
                </svg>
                <p className="error-message">{errorMessage}</p>
                <button className="retry-button" onClick={handleRetry}>
                  Tentar Novamente
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {perfilAberto && (
        <PerfilCliente onClose={fecharPerfil} />
      )}
    </>
  );
};

export default LeitorCodigo;