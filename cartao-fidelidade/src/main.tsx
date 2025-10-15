import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Index';
import TelaPrincipal from './pages/Tela-principal/Index';
import EsqueciSenha from './pages/EsqueciSenha/Index';
import LeitorCodigo from './pages/Leitor-codigo/Index';


import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/principal" element={<TelaPrincipal />} /> 
        <Route path="/esqueci-senha" element={<EsqueciSenha />} /> 
        <Route path="/leitor-qrcode" element={<LeitorCodigo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);