import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import './index.css';
import App from './App.jsx';

/**
 * Ponto de entrada da aplicação (RF06 e RF14)
 * O CarrinhoProvider envolve todas as rotas para que o estado do carrinho
 * seja compartilhado entre o Header, Catálogo, Detalhes, Carrinho e Checkout.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CarrinhoProvider>
        <App />
      </CarrinhoProvider>
    </BrowserRouter>
  </StrictMode>,
);
