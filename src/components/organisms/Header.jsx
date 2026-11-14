import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useCarrinho } from '../../hooks/useCarrinho';
import styles from './Header.module.css';

/**
 * Header da aplicação (RF09 e RF14)
 * Consome o CarrinhoContext via custom hook useCarrinho
 * para manter o contador de itens sincronizado em tempo real em todas as páginas.
 */
export function Header() {
  const { quantidadeTotal } = useCarrinho();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/livros" className={styles.logo}>
          📚 <span>Livraria React</span>
        </Link>

        <nav className={styles.nav}>
          <Link to="/livros" className={styles.navLink}>
            Livros
          </Link>

          <Link to="/carrinho" className={styles.carrinhoLink} aria-label="Ver carrinho de compras">
            <Badge badgeContent={quantidadeTotal} color="primary" showZero>
              🛒 Carrinho
            </Badge>
          </Link>
        </nav>
      </div>
    </header>
  );
}
