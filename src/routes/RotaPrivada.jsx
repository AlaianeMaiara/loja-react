import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useCarrinho } from '../hooks/useCarrinho';

/**
 * Componente de Rota Privada / Protegida (RF12)
 * Garante que a rota de pagamento só possa ser acessada se houver
 * pelo menos 1 item no carrinho de compras.
 * Caso contrário, redireciona para /carrinho via <Navigate />.
 */
export function RotaPrivada({ children }) {
  const { itens } = useCarrinho();

  if (itens.length === 0) {
    return <Navigate to="/carrinho" replace />;
  }

  return children;
}

RotaPrivada.propTypes = {
  children: PropTypes.node.isRequired,
};
