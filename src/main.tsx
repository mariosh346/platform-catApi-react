import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('No root element found')
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename="/platform-catApi-react">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
