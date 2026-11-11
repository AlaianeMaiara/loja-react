import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import styles from './Header.module.css';

/**
 * Header da aplicação (RF09 e RF14)
 * Utiliza o componente Badge do Material UI (@mui/material)
 * para exibir a quantidade total de itens no carrinho.
 */
export function Header({ quantidadeCarrinho = 0 }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/produtos" className={styles.logo}>
          📚 <span>Livraria React</span>
        </Link>

        <nav className={styles.nav}>
          <Link to="/produtos" className={styles.navLink}>
            Catálogo
          </Link>

          <Link to="/carrinho" className={styles.carrinhoLink} aria-label="Ver carrinho de compras">
            <Badge badgeContent={quantidadeCarrinho} color="primary" showZero>
              🛒 Carrinho
            </Badge>
          </Link>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  quantidadeCarrinho: PropTypes.number,
};
