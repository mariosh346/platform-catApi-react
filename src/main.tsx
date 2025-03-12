import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { BASENAME_ROUTE } from './constants/index.ts'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('No root element found')
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename={BASENAME_ROUTE}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
