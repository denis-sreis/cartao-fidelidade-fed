import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './Leitor-codigo.css';

const LeitorCodigo = () => {
  const [data, setData] = useState('Aguardando leitura...');

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: { width: 250, height: 250 }, 
        fps: 5, 
      },
      false
    );

    function onScanSuccess(decodedText: string) {
      setData(decodedText);
      scanner.clear(); 
    }

    function onScanFailure(_error: any) {
      
    }

    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className="bg-black min-h-screen w-full flex flex-col items-center justify-center p-4 font-['Poppins',_sans-serif] text-white">
      <main className="w-full flex flex-col items-center text-center gap-8">
        <h1 className="font-bold text-3xl text-[#f9ecec]">
          Leitor de QR Code
        </h1>

        {}
        <div id="reader" className="w-full max-w-xs"></div>

        <button className="bg-[#4A90E2] font-semibold text-white py-2 px-8 rounded-lg shadow-lg">
          Registrar presença
        </button>

        <p className="text-sm text-[#bcc1cd] max-w-xs">
          Peça ao garçom para gerar o QR Code da sua presença.
        </p>
        
        <div className="mt-4 p-2 bg-gray-900 rounded-md w-full max-w-xs">
          <p className="text-green-400 text-xs break-all">Resultado: {data}</p>
        </div>
      </main>
    </div>
  );
};

export default LeitorCodigo;