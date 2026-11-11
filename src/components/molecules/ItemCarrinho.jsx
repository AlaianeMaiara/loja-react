import PropTypes from 'prop-types';
import { formatarMoeda } from '../../utils/moeda';
import { calcularSubtotal } from '../../utils/carrinho';
import styles from './ItemCarrinho.module.css';

/**
 * Item individual na listagem do carrinho (RF08)
 * Validação de Props rigorosa com PropTypes (Critério 6 da Avaliação).
 */
export function ItemCarrinho({ item, onAlterarQuantidade, onRemover }) {
  const { id, nome, preco, imagem, estoque, quantidade } = item;
  const subtotal = calcularSubtotal(preco, quantidade);

  return (
    <div className={styles.itemCard}>
      <img
        src={imagem}
        alt={`Capa de ${nome}`}
        className={styles.imagem}
      />

      <div className={styles.info}>
        <h4 className={styles.nome}>{nome}</h4>
        <span className={styles.precoUnitario}>
          Unitário: {formatarMoeda(preco)}
        </span>
      </div>

      <div className={styles.controles}>
        {/* Controles de Quantidade */}
        <div className={styles.seletorQtd}>
          <button
            type="button"
            aria-label="Diminuir quantidade"
            disabled={quantidade <= 1}
            onClick={() => onAlterarQuantidade(id, quantidade - 1)}
            className={styles.botaoQtd}
          >
            -
          </button>

          <span className={styles.valorQtd} aria-label={`Quantidade: ${quantidade}`}>
            {quantidade}
          </span>

          <button
            type="button"
            aria-label="Aumentar quantidade"
            disabled={quantidade >= estoque}
            onClick={() => onAlterarQuantidade(id, quantidade + 1)}
            className={styles.botaoQtd}
          >
            +
          </button>
        </div>

        {/* Subtotal */}
        <div className={styles.subtotalWrapper}>
          <span className={styles.rotuloSubtotal}>Subtotal</span>
          <p className={styles.subtotal}>{formatarMoeda(subtotal)}</p>
        </div>

        {/* Botão Remover */}
        <button
          type="button"
          onClick={() => onRemover(id)}
          className={styles.botaoRemover}
          aria-label={`Remover ${nome} do carrinho`}
        >
          Remover
        </button>
      </div>
    </div>
  );
}

ItemCarrinho.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nome: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    imagem: PropTypes.string.isRequired,
    estoque: PropTypes.number.isRequired,
    quantidade: PropTypes.number.isRequired,
  }).isRequired,
  onAlterarQuantidade: PropTypes.func.isRequired,
  onRemover: PropTypes.func.isRequired,
};
