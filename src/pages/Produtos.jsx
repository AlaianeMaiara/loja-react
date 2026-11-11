import { useState, useEffect, useMemo } from 'react';
import { buscarProdutos } from '../services/api';
import { filtrarProdutos } from '../utils/busca';
import { ProdutoCard } from '../components/molecules/ProdutoCard';
import { CampoBusca } from '../components/atoms/CampoBusca';
import styles from './Produtos.module.css';

/**
 * Página de Catálogo de Produtos (RF02 e RF04)
 * Conceitos aplicados:
 * - useState: gerencia estado da busca, lista de dados, carregamento e erros.
 * - useEffect: busca dados na API ao montar o componente (didática de ciclo de vida).
 * - useMemo: memoriza o resultado da filtragem para evitar recálculos desnecessários a cada re-render.
 * - Renderização condicional: Loading, Error, Vazio e Grade de Produtos.
 */
export function Produtos({ onAdicionarAoCarrinho }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');

  // Carrega produtos da API simulada ao montar a página
  const carregarProdutos = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await buscarProdutos();
      setProdutos(dados);
    } catch (err) {
      setErro('Não foi possível carregar os livros. Verifique se a API está rodando com npm run api.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  // RF04: Filtragem calculada com useMemo
  const produtosFiltrados = useMemo(() => {
    return filtrarProdutos(produtos, termoBusca);
  }, [produtos, termoBusca]);

  const limparBusca = () => {
    setTermoBusca('');
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.titulo}>Catálogo de Livros</h1>

      {/* Campo de Busca Controlado */}
      <CampoBusca
        valor={termoBusca}
        onMudanca={setTermoBusca}
        onLimpar={limparBusca}
      />

      {/* 1. Estado de Carregamento (Loading) */}
      {carregando && (
        <div className={styles.estadoMensagem} role="status">
          <p>Carregando livros incríveis para você...</p>
        </div>
      )}

      {/* 2. Estado de Erro (Error) */}
      {!carregando && erro && (
        <div className={styles.estadoMensagem} role="alert">
          <p className={styles.mensagemErro}>{erro}</p>
          <button
            type="button"
            onClick={carregarProdutos}
            className={styles.botaoTentarNovamente}
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* 3. Estado de Lista Vazia Geral */}
      {!carregando && !erro && produtos.length === 0 && (
        <div className={styles.estadoMensagem}>
          <p>Nenhum produto cadastrado no catálogo.</p>
        </div>
      )}

      {/* 4. Estado de Nenhum Produto Encontrado na Busca */}
      {!carregando && !erro && produtos.length > 0 && produtosFiltrados.length === 0 && (
        <div className={styles.estadoMensagem}>
          <p>Nenhum produto encontrado para &quot;{termoBusca}&quot;.</p>
          <button
            type="button"
            onClick={limparBusca}
            className={styles.botaoTentarNovamente}
          >
            Limpar busca
          </button>
        </div>
      )}

      {/* 5. Grade de Produtos com Map e Key estável */}
      {!carregando && !erro && produtosFiltrados.length > 0 && (
        <div className={styles.grade}>
          {produtosFiltrados.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              onAdicionar={onAdicionarAoCarrinho}
            />
          ))}
        </div>
      )}
    </section>
  );
}
