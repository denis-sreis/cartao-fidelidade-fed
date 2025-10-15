import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import './Leitor-codigo.css';

import Cabecalho from '../../components/Cabecalho/Cabecalho';
import Navegacao from '../../components/Navegacao/Navegacao';
import PerfilCliente from '../PerfilCliente/Index';

const LeitorCodigo = () => {
  const [scanStatus, setScanStatus] = useState('scanning');
  const [isPerfilVisible, setPerfilVisible] = useState(false);
  const navigate = useNavigate();
  

  const qrCodeScannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const qrCodeSuccessCallback = (decodedText: string) => {
      console.log("QR Code lido com sucesso:", decodedText); // o conteudo do QR chega de "decodedText" no momento da leitura .
      
      const scanner = qrCodeScannerRef.current;
      if (scanner && scanner.isScanning) {
        scanner.stop().catch(err => console.error("Falha ao parar o scanner.", err));
      }
      
      setScanStatus('processing');

      setTimeout(() => {
        setScanStatus('success');
      }, 1500);

      setTimeout(() => {
        navigate('/principal');
      }, 3500);
    };

    // Só criamos e iniciamos o scanner se ele ainda não existir na nossa referência
    if (!qrCodeScannerRef.current) {
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };
      const scanner = new Html5Qrcode('reader');
      qrCodeScannerRef.current = scanner; 

      scanner.start({ facingMode: "environment" }, config, qrCodeSuccessCallback, undefined)
        .catch(err => {
          console.error("Não foi possível iniciar o scanner", err);
        });
    }

    // A função de limpeza garante que a câmera seja desligada ao sair da tela
    return () => {
      const scannerInstance = qrCodeScannerRef.current;
      if (scannerInstance && scannerInstance.isScanning) {
        scannerInstance.stop().catch(err => console.error("Falha ao parar o scanner na limpeza.", err));
      }
    };
    
  }, [navigate]); 

  return (
    
    <>
      <div className="leitor-codigo-container">
        <header className="leitor-codigo-header">
          <Cabecalho onProfileClick={() => setPerfilVisible(true)} />
        </header>

        <main className="leitor-codigo-main">
          <h1 className="main-title">Leitor de QR Code</h1>
          <div className="qrcode-camera-container">
            {scanStatus === 'scanning' ? (
              <div id="reader" className="qrcode-reader-element"></div>
            ) : null}
          </div>
          <p className="instruction-text">
            Peça ao garçom que está atendendo a sua mesa para gerar o QR Code da sua presença.
          </p>
        </main>
        
        <footer className="leitor-codigo-footer">
          <Navegacao onProfileClick={() => setPerfilVisible(true)} />
        </footer>
      </div>

      {scanStatus !== 'scanning' && (
        <div className="overlay-container">
          <div className="overlay-content">
            {scanStatus === 'processing' ? (
              <>
                <div className="spinner"></div>
                <p>Processando...</p>
              </>
            ) : ( // scanStatus === 'success'
              <>
                <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                  <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <p>Leitura Concluída!</p>
              </>
            )}
          </div>
        </div>
      )}

      {isPerfilVisible && (
        <PerfilCliente onClose={() => setPerfilVisible(false)} />
      )}
    </>
  );
};

export default LeitorCodigo;