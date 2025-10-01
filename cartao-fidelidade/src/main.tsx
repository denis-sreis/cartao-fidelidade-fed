import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TelaPrincipal from './pages/Tela-principal/TelaPrincipal'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TelaPrincipal />
  </StrictMode>
)
