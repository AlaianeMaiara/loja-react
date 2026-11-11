import { Link } from 'react-router-dom';
import { useCarrinho } from '../hooks/useCarrinho';
import { ItemCarrinho } from '../components/molecules/ItemCarrinho';
import { formatarMoeda } from '../utils/moeda';
import styles from './Carrinho.module.css';

/**
 * Página do Carrinho de Compras (RF08)
 * Consome os dados compartilhados via Context API:
 * - Lista dinâmica de itens selecionados
 * - Métodos de alterar quantidade e remover item
 * - Valor total recalculado de forma reativa
 */
export function Carrinho() {
  const { itens, alterarQuantidade, removerItem, valorTotal, quantidadeTotal } = useCarrinho();

  if (itens.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.carrinhoVazio} role="status">
          <p>Seu carrinho de compras está vazio no momento.</p>
          <Link to="/produtos" className={styles.botaoFinalizar}>
            Explorar catálogo de livros
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Meu Carrinho ({quantidadeTotal} {quantidadeTotal === 1 ? 'item' : 'itens'})</h1>

      {/* Lista de Itens do Carrinho */}
      <div className={styles.listaItens}>
        {itens.map((item) => (
          <ItemCarrinho
            key={item.id}
            item={item}
            onAlterarQuantidade={alterarQuantidade}
            onRemover={removerItem}
          />
        ))}
      </div>

      {/* Resumo da Compra */}
      <div className={styles.resumoCard}>
        <div className={styles.linhaResumo}>
          <span>Total da Compra:</span>
          <span className={styles.valorTotal}>{formatarMoeda(valorTotal)}</span>
        </div>

        <div className={styles.botoesAcao}>
          <Link to="/produtos" className={styles.linkContinuar}>
            Continuar comprando
          </Link>
          <Link to="/pagamento" className={styles.botaoFinalizar}>
            Finalizar compra →
          </Link>
        </div>
      </div>
    </div>
  );
}
