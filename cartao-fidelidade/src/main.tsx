import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Home from './pages/Home/Index';
import TelaPrincipalCliente from './pages/Tela-principal/Cliente/Index';
import TelaPrincipalADM from './pages/Tela-principal/Admin/Index';
import ConcluirCadastro from './pages/Cadastro/ConcluirCadastro';
import LeitorCodigo from './pages/Leitor-codigo/Index';
import GeradorCodigo from './pages/Gerador-codigo/Index';
import Pontuacoes from './pages/Pontuacoes/Index';

import './index.css';

const CLIENT_ID = "78893072402-9sev40sfss82edtqignknjev4h2krdhf.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/concluir-cadastro" element={<ConcluirCadastro />} />
          <Route path="/principalCliente" element={<TelaPrincipalCliente />} />
          <Route path="/principalADM" element={<TelaPrincipalADM />} />
          <Route path="/leitor-codigo" element={<LeitorCodigo />} />
          <Route path="/leitor-qrcode" element={<LeitorCodigo />} />
          <Route path="/gerar-qrcode" element={<GeradorCodigo />} />
          <Route path="/selecionar-pontuacao" element={<Pontuacoes />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);