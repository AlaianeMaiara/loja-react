import styles from './Footer.module.css';

/**
 * Rodapé da aplicação (RF14)
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.conteudo}>
        <p className={styles.texto}>
          © {new Date().getFullYear()} Livraria React. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
