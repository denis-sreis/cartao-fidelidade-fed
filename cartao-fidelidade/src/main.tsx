import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Index';
import TelaPrincipal from './pages/Tela-principal/Index';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principal" element={<TelaPrincipal />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);