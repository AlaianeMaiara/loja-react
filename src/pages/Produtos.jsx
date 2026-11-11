import { useState, useEffect, useMemo } from 'react';
import { buscarProdutos } from '../services/api';
import { filtrarProdutos } from '../utils/busca';
import { useCarrinho } from '../hooks/useCarrinho';
import { ProdutoCard } from '../components/molecules/ProdutoCard';
import { CampoBusca } from '../components/atoms/CampoBusca';
import styles from './Produtos.module.css';

/**
 * Página de Catálogo de Produtos (RF02, RF04 e RF07)
 */
export function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');
  
  const { adicionarItem } = useCarrinho();

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

  const produtosFiltrados = useMemo(() => {
    return filtrarProdutos(produtos, termoBusca);
  }, [produtos, termoBusca]);

  const limparBusca = () => {
    setTermoBusca('');
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.titulo}>Catálogo de Livros</h1>

      <CampoBusca
        valor={termoBusca}
        onMudanca={setTermoBusca}
        onLimpar={limparBusca}
      />

      {carregando && (
        <div className={styles.estadoMensagem} role="status">
          <p>Carregando livros incríveis para você...</p>
        </div>
      )}

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

      {!carregando && !erro && produtos.length === 0 && (
        <div className={styles.estadoMensagem}>
          <p>Nenhum produto cadastrado no catálogo.</p>
        </div>
      )}

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

      {!carregando && !erro && produtosFiltrados.length > 0 && (
        <div className={styles.grade}>
          {produtosFiltrados.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              onAdicionar={adicionarItem}
            />
          ))}
        </div>
      )}
    </section>
  );
}
