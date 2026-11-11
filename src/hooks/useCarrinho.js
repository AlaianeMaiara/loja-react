import { useContext } from 'react';
import { CarrinhoContext } from '../contexts/CarrinhoContext';

/**
 * Custom Hook para consumo seguro do CarrinhoContext (RF06).
 * Encapsula o useContext e previne o uso indevido fora do CarrinhoProvider.
 */
export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);

  if (!contexto) {
    throw new Error('useCarrinho deve ser utilizado dentro de um <CarrinhoProvider>');
  }

  return contexto;
}
