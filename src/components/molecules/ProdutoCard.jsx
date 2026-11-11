import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatarMoeda } from '../../utils/moeda';
import styles from './ProdutoCard.module.css';

/**
 * Componente de Card de Produto (RF03)
 * Demonstração de boas práticas:
 * - Props bem tipadas com PropTypes (Critério 6)
 * - CSS Modules para isolamento de estilos (Critério 14)
 * - Link semântico do React Router
 * - Imagem acessível com texto alternativo descritivo (Critério 15)
 */
export function ProdutoCard({ produto, onAdicionar }) {
  const { id, nome, categoria, preco, imagem, estoque } = produto;
  const semEstoque = estoque <= 0;

  return (
    <article className={styles.card}>
      <div className={styles.imagemContainer}>
        <img
          src={imagem}
          alt={`Capa do livro ${nome}`}
          className={styles.imagem}
          loading="lazy"
        />
      </div>

      <div className={styles.conteudo}>
        <span className={styles.categoria}>{categoria}</span>

        <h3 className={styles.nome}>
          <Link to={`/produtos/${id}`} className={styles.linkDetalhe}>
            {nome}
          </Link>
        </h3>

        <p className={styles.estoque}>
          {semEstoque ? 'Esgotado' : `Estoque disponível: ${estoque}`}
        </p>

        <div className={styles.preco}>
          {formatarMoeda(preco)}
        </div>

        <button
          type="button"
          onClick={() => onAdicionar && onAdicionar(produto)}
          disabled={semEstoque}
          className={styles.botaoAdicionar}
        >
          {semEstoque ? 'Indisponível' : 'Adicionar ao carrinho'}
        </button>
      </div>
    </article>
  );
}

ProdutoCard.propTypes = {
  produto: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nome: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    imagem: PropTypes.string.isRequired,
    estoque: PropTypes.number.isRequired,
  }).isRequired,
  onAdicionar: PropTypes.func,
};
