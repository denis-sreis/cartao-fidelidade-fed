import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './pages/Home/Index';
import Cadastro from './pages/Cadastro/Index';
import TelaPrincipalCliente from './pages/Tela-principal/Cliente/Index'
import TelaPrincipalADM from './pages/Tela-principal/Admin/Index'
import EsqueciSenha from './pages/EsqueciSenha/Index';
import PerfilCliente from './pages/PerfilCliente/Index';
import EditarDados from './pages/EditarDados/Index';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/principalCliente" element={<TelaPrincipalCliente />} />
        <Route path="/principalADM" element={<TelaPrincipalADM />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/perfil" element={<PerfilCliente />} />
        <Route path="/editar-dados" element={<EditarDados />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);