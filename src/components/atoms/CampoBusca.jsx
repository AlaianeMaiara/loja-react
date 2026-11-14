import PropTypes from 'prop-types';
import styles from './CampoBusca.module.css';

/**
 * Campo de busca controlado (RF04)
 * Utiliza o conceito de Controlled Component do React:
 * O valor do input é espelhado diretamente no state do componente pai.
 */
export function CampoBusca({ valor, onMudanca, onLimpar }) {
  return (
    <div className={styles.buscaContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="search"
          value={valor}
          onChange={(e) => onMudanca(e.target.value)}
          placeholder="Buscar livro pelo título ou autor (ex: tolkien)..."
          aria-label="Buscar livros por título ou autor"
          className={styles.input}
        />
      </div>

      {valor && (
        <button
          type="button"
          onClick={onLimpar}
          className={styles.botaoLimpar}
        >
          Limpar busca
        </button>
      )}
    </div>
  );
}

CampoBusca.propTypes = {
  valor: PropTypes.string.isRequired,
  onMudanca: PropTypes.func.isRequired,
  onLimpar: PropTypes.func.isRequired,
};
