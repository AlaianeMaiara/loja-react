import { useLocation, Link } from 'react-router-dom';

/**
 * Tela de Falha da Compra (RF11 e RF13)
 * Exibida caso a compra falhe (ex: cartão com todos os dígitos iguais).
 * Exibe a mensagem exata "tentativa de golpe" e o botão "Tentar novamente".
 * Os itens do carrinho foram mantidos.
 */
export function Falha() {
  const location = useLocation();
  const mensagem = location.state?.mensagem || 'tentativa de golpe';

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '32px 16px', textAlign: 'center' }}>
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '48px 32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          border: '1px solid #fee2e2',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>⚠️</div>
        <h1 style={{ fontSize: '1.8rem', color: '#ef4444', fontWeight: 800, marginBottom: '12px' }}>
          Pagamento não autorizado
        </h1>
        <p
          style={{
            color: '#dc2626',
            fontSize: '1.2rem',
            fontWeight: 700,
            backgroundColor: '#fef2f2',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '24px',
            border: '1px solid #fecaca',
          }}
        >
          {mensagem}
        </p>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '32px' }}>
          Não se preocupe, seus itens continuam salvos no carrinho. Verifique os dados digitados e tente novamente.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link
            to="/carrinho"
            style={{
              padding: '12px 20px',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              color: '#475569',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Voltar ao Carrinho
          </Link>
          <Link
            to="/pagamento"
            style={{
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            Tentar novamente
          </Link>
        </div>
      </div>
    </div>
  );
}
