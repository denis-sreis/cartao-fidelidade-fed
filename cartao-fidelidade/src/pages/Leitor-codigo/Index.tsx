// src/pages/Leitor-codigo/Index.tsx

import { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import './Leitor-codigo.css'; 


import menuIcon from './menu.png';
import profileImage from './ellipse-3.png';
import tabbarImage from './tabbar.png';

const LeitorCodigo = () => {
  const [data, setData] = useState('Aguardando leitura...');

  useEffect(() => {
    let html5QrCode: Html5Qrcode; 

    const qrCodeSuccessCallback = (decodedText: string) => {
      setData(decodedText);
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => console.error("Falha ao parar o scanner.", err));
      }
    };

    const startScanner = () => {
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };
      html5QrCode = new Html5Qrcode('reader'); 

      html5QrCode.start(
        { facingMode: "environment" }, 
        config,
        qrCodeSuccessCallback,
        undefined
      ).catch(err => {
        console.error("Não foi possível iniciar o scanner", err);
      });
    };

    const timeoutId = setTimeout(() => {
        startScanner();
    }, 100); 

    return () => {
      clearTimeout(timeoutId);
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => console.error("Falha ao parar o scanner na limpeza.", err));
      }
    };
  }, []);

  return (
    
    <div className="leitor-codigo-container">
      
      <header className="leitor-codigo-header">
        <img src={menuIcon} alt="Menu" className="menu-icon" />
        <img src={profileImage} alt="Perfil" className="profile-image" />
      </header>

      <main className="leitor-codigo-main">
        
        <h1 className="main-title">
          Leitor de QR Code
        </h1>

        <div className="qrcode-camera-container">
          <div id="reader" className="qrcode-reader-element"></div>
        </div>

        <button className="register-button">
          Registrar presença
        </button>

        <p className="instruction-text">
          Peça ao garçom que está atendendo a sua mesa para gerar o QR Code da sua presença.
        </p>
        
        <div className="result-display">
          <p className="result-text">Resultado: {data}</p>
        </div>

      </main>
      
      <footer className="leitor-codigo-footer">
        <img src={tabbarImage} alt="Barra de navegação" className="tabbar-image" />
      </footer>
    </div>
  );
};

export default LeitorCodigo;