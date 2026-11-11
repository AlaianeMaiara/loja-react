import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { buscarProdutoPorId } from '../services/api';
import { useCarrinho } from '../hooks/useCarrinho';
import { formatarMoeda } from '../utils/moeda';
import styles from './DetalheProduto.module.css';

/**
 * Página de Detalhe do Produto (RF05 e RF07)
 */
export function DetalheProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  const { adicionarItem } = useCarrinho();

  useEffect(() => {
    let ativo = true;

    async function carregarDetalhe() {
      try {
        setCarregando(true);
        setErro(false);
        const dados = await buscarProdutoPorId(id);
        if (ativo) {
          setProduto(dados);
        }
      } catch (err) {
        if (ativo) {
          setErro(true);
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarDetalhe();

    return () => {
      ativo = false;
    };
  }, [id]);

  if (carregando) {
    return (
      <div className={styles.container}>
        <div className={styles.estadoMensagem} role="status">
          <p>Carregando detalhes do livro...</p>
        </div>
      </div>
    );
  }

  if (erro || !produto) {
    return (
      <div className={styles.container}>
        <div className={styles.estadoMensagem} role="alert">
          <p>Produto não encontrado.</p>
          <Link to="/produtos" className={styles.voltarLink}>
            ← Voltar para o catálogo de livros
          </Link>
        </div>
      </div>
    );
  }

  const { nome, descricao, preco, categoria, imagem, estoque } = produto;
  const semEstoque = estoque <= 0;

  return (
    <div className={styles.container}>
      <Link to="/produtos" className={styles.voltarLink}>
        ← Voltar para o catálogo
      </Link>

      <article className={styles.detalheCard}>
        <div className={styles.imagemWrapper}>
          <img
            src={imagem}
            alt={`Capa do livro ${nome}`}
            className={styles.imagem}
          />
        </div>

        <div className={styles.infoWrapper}>
          <span className={styles.categoria}>{categoria}</span>
          <h1 className={styles.titulo}>{nome}</h1>
          <p className={styles.descricao}>{descricao}</p>

          <div className={styles.metaInfo}>
            <div className={styles.preco}>{formatarMoeda(preco)}</div>
            <p className={styles.estoque}>
              {semEstoque ? 'Produto esgotado' : `Estoque disponível: ${estoque} unidades`}
            </p>

            <button
              type="button"
              disabled={semEstoque}
              onClick={() => adicionarItem(produto)}
              className={styles.botaoAdicionar}
            >
              {semEstoque ? 'Indisponível' : 'Adicionar ao carrinho'}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
