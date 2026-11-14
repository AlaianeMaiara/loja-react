import { useState, useEffect, useMemo } from 'react';
import { buscarLivros } from '../services/api';
import { filtrarLivros } from '../utils/busca';
import { useCarrinho } from '../hooks/useCarrinho';
import { LivroCard } from '../components/molecules/LivroCard';
import { CampoBusca } from '../components/atoms/CampoBusca';
import styles from './Livros.module.css';

/**
 * Página de Catálogo de Livros (RF02 e RF04)
 * - Busca todos os livros da API via fetch dentro de useEffect
 * - Estados de carregamento, erro e lista vazia tratados
 * - Busca controlada por título OU autor calculada com useMemo
 * - Grade responsiva mobile-first com map e key estável
 */
export function Livros() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');

  const { adicionarItem } = useCarrinho();

  const carregarLivros = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await buscarLivros();
      setLivros(dados);
    } catch (err) {
      setErro('Não foi possível carregar os livros. Verifique se a API está rodando com npm run api.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  // RF04: Filtragem calculada com useMemo por título OU autor
  const livrosFiltrados = useMemo(() => {
    return filtrarLivros(livros, termoBusca);
  }, [livros, termoBusca]);

  const limparBusca = () => {
    setTermoBusca('');
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.titulo}>Catálogo de Livros</h1>

      {/* Campo de Busca Controlado por Título ou Autor */}
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
            onClick={carregarLivros}
            className={styles.botaoTentarNovamente}
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* 3. Estado de Lista Vazia Geral */}
      {!carregando && !erro && livros.length === 0 && (
        <div className={styles.estadoMensagem}>
          <p>Nenhum livro cadastrado no catálogo.</p>
        </div>
      )}

      {/* 4. Estado de Nenhum Livro Encontrado na Busca */}
      {!carregando && !erro && livros.length > 0 && livrosFiltrados.length === 0 && (
        <div className={styles.estadoMensagem}>
          <p>Nenhum livro encontrado para &quot;{termoBusca}&quot;.</p>
          <button
            type="button"
            onClick={limparBusca}
            className={styles.botaoTentarNovamente}
          >
            Limpar busca
          </button>
        </div>
      )}

      {/* 5. Grade de Livros com Map e Key estável */}
      {!carregando && !erro && livrosFiltrados.length > 0 && (
        <div className={styles.grade}>
          {livrosFiltrados.map((livro) => (
            <LivroCard
              key={livro.id}
              livro={livro}
              onAdicionar={adicionarItem}
            />
          ))}
        </div>
      )}
    </section>
  );
}
