import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { buscarLivroPorId } from '../services/api';
import { useCarrinho } from '../hooks/useCarrinho';
import { formatarMoeda } from '../utils/moeda';
import { SeloEsgotado } from '../components/atoms/SeloEsgotado';
import styles from './DetalheLivro.module.css';

/**
 * Página de Detalhe do Livro (RF05, Critério 5 e 8)
 * Atende rigorosamente ao HTML semântico exigido:
 * - o nome do livro em um <h1>
 * - a imagem da capa em <img> com texto alternativo (alt) descritivo
 * - o preço formatado em reais
 * - o resumo do livro em um parágrafo <p>
 * - agrupados em um <article>
 * - botão desabilitado e acompanhado do selo "Esgotado" quando estoque for 0
 * - Se não existir: "Livro não encontrado" com link para /livros
 */
export function DetalheLivro() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  const { adicionarItem } = useCarrinho();

  useEffect(() => {
    let ativo = true;

    async function carregarDetalhe() {
      try {
        setCarregando(true);
        setErro(false);
        const dados = await buscarLivroPorId(id);
        if (ativo) {
          setLivro(dados);
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

  if (erro || !livro) {
    return (
      <div className={styles.container}>
        <div className={styles.estadoMensagem} role="alert">
          <p>Livro não encontrado.</p>
          <Link to="/livros" className={styles.voltarLink}>
            ← Voltar para o catálogo de livros
          </Link>
        </div>
      </div>
    );
  }

  const { titulo, autor, resumo, preco, categoria, capa, estoque } = livro;
  const esgotado = estoque <= 0;

  return (
    <div className={styles.container}>
      <Link to="/livros" className={styles.voltarLink}>
        ← Voltar para o catálogo
      </Link>

      <article className={styles.detalheCard}>
        <div className={styles.imagemWrapper}>
          <img
            src={capa}
            alt={`Capa do livro ${titulo} de ${autor}`}
            className={styles.imagem}
          />
          {esgotado && (
            <div className={styles.badgeEsgotado}>
              <SeloEsgotado />
            </div>
          )}
        </div>

        <div className={styles.infoWrapper}>
          <div className={styles.cabecalhoDetalhe}>
            <span className={styles.categoria}>{categoria}</span>
            {esgotado && <SeloEsgotado />}
          </div>

          <h1 className={styles.titulo}>{titulo}</h1>
          <p className={styles.autor}>Autor: {autor}</p>

          <p className={styles.resumo}>{resumo}</p>

          <div className={styles.metaInfo}>
            <div className={styles.preco}>{formatarMoeda(preco)}</div>

            <div className={styles.estoque}>
              <span>{esgotado ? 'Livro indisponível' : `Estoque disponível: ${estoque} unidades`}</span>
              {esgotado && <SeloEsgotado />}
            </div>

            <button
              type="button"
              disabled={esgotado}
              onClick={() => adicionarItem(livro)}
              className={styles.botaoAdicionar}
            >
              {esgotado ? 'Esgotado' : 'Adicionar ao carrinho'}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
