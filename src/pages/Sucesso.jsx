import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../hooks/useCarrinho';

/**
 * Tela de Sucesso da Compra (RF11 e RF13)
 * Exibida após a simulação de pagamento aprovado.
 * Limpa o carrinho de compras no momento da montagem (evitando disputa de renderização com a RotaPrivada).
 */
export function Sucesso() {
  const { limparCarrinho } = useCarrinho();
  const executadoRef = useRef(false);

  useEffect(() => {
    if (!executadoRef.current) {
      limparCarrinho();
      executadoRef.current = true;
    }
  }, [limparCarrinho]);

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '32px 16px', textAlign: 'center' }}>
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '48px 32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
        <h1 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 800, marginBottom: '12px' }}>
          Compra Realizada com Sucesso!
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px' }}>
          Obrigado por comprar na Livraria React. Os seus livros já estão sendo preparados para o envio fictício!
        </p>
        <Link
          to="/produtos"
          style={{
            display: 'inline-block',
            backgroundColor: '#4f46e5',
            color: '#ffffff',
            padding: '12px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem',
          }}
        >
          Voltar ao Catálogo de Livros
        </Link>
      </div>
    </div>
  );
}
