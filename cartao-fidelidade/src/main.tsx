import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LeitorCodigo from './pages/Leitor-codigo/Index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LeitorCodigo />
  </StrictMode>
)
