import { Link } from 'react-router-dom';

/**
 * Página 404 de rota não encontrada (RF14)
 */
export function NaoEncontrada() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '4rem', color: '#4f46e5', margin: '0 0 16px 0' }}>404</h1>
      <h2 style={{ fontSize: '1.8rem', color: '#1e293b', marginBottom: '16px' }}>
        Página não encontrada
      </h2>
      <p style={{ color: '#64748b', marginBottom: '32px' }}>
        O link que você tentou acessar não existe ou foi removido.
      </p>
      <Link
        to="/produtos"
        style={{
          display: 'inline-block',
          backgroundColor: '#4f46e5',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        Voltar ao Catálogo de Livros
      </Link>
    </div>
  );
}
