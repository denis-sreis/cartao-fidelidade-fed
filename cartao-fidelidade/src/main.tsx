import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Index';
import TelaPrincipalCliente from './pages/Tela-principal/Cliente/Index'
import TelaPrincipalADM from './pages/Tela-principal/Admin/Index'
import LeitorCodigo from './pages/Leitor-codigo/Index';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principalCliente" element={<TelaPrincipalCliente />} />
        <Route path="/principalADM" element={<TelaPrincipalADM />} />
        <Route path="/leitor-codigo" element={<LeitorCodigo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);