import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatarMoeda } from '../../utils/moeda';
import { SeloEsgotado } from '../atoms/SeloEsgotado';
import styles from './LivroCard.module.css';

/**
 * Componente LivroCard (RF03 e Critério 5 e 6)
 * Exibe a capa com texto alternativo, título, autor, categoria, preço formatado em reais,
 * link para o detalhe do livro e botão "Adicionar ao carrinho".
 * Quando estoque for 0: exibe selo "Esgotado" e desabilita o botão.
 */
export function LivroCard({ livro, onAdicionar }) {
  const { id, titulo, autor, categoria, preco, capa, estoque } = livro;
  const esgotado = estoque <= 0;

  return (
    <article className={styles.card}>
      <div className={styles.imagemContainer}>
        <img
          src={capa}
          alt={`Capa do livro ${titulo}`}
          className={styles.imagem}
          loading="lazy"
        />
        {esgotado && (
          <div className={styles.badgeEsgotado}>
            <SeloEsgotado />
          </div>
        )}
      </div>

      <div className={styles.conteudo}>
        <div className={styles.cabecalhoCard}>
          <span className={styles.categoria}>{categoria}</span>
          {esgotado && <SeloEsgotado />}
        </div>

        <h3 className={styles.titulo}>
          <Link to={`/livros/${id}`} className={styles.linkDetalhe}>
            {titulo}
          </Link>
        </h3>

        <p className={styles.autor}>Por {autor}</p>

        <div className={styles.preco}>
          {formatarMoeda(preco)}
        </div>

        <button
          type="button"
          onClick={() => onAdicionar && onAdicionar(livro)}
          disabled={esgotado}
          className={styles.botaoAdicionar}
        >
          {esgotado ? 'Esgotado' : 'Adicionar ao carrinho'}
        </button>
      </div>
    </article>
  );
}

LivroCard.propTypes = {
  livro: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    titulo: PropTypes.string.isRequired,
    autor: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    capa: PropTypes.string.isRequired,
    estoque: PropTypes.number.isRequired,
  }).isRequired,
  onAdicionar: PropTypes.func,
};
