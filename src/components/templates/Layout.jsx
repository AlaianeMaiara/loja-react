import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';
import styles from './Layout.module.css';

/**
 * Layout principal da aplicação (RF14)
 * Utiliza o componente <Outlet /> do React Router para renderizar
 * a página filha correspondente à rota atual entre o Header e o Footer.
 */
export function Layout({ quantidadeCarrinho = 0 }) {
  return (
    <div className={styles.layoutWrapper}>
      <Header quantidadeCarrinho={quantidadeCarrinho} />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  quantidadeCarrinho: PropTypes.number,
};
