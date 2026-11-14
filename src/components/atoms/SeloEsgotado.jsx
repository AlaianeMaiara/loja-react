import styles from './SeloEsgotado.module.css';

/**
 * Átomo SeloEsgotado (RF03, RF05 e Critério 5)
 * Exibido quando o estoque do livro for 0.
 */
export function SeloEsgotado() {
  return <span className={styles.selo}>Esgotado</span>;
}
