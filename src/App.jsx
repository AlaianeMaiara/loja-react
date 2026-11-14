import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/templates/Layout';
import { Livros } from './pages/Livros';
import { DetalheLivro } from './pages/DetalheLivro';
import { Carrinho } from './pages/Carrinho';
import { Pagamento } from './pages/Pagamento';
import { Sucesso } from './pages/Sucesso';
import { Falha } from './pages/Falha';
import { NaoEncontrada } from './pages/NaoEncontrada';
import { RotaPrivada } from './routes/RotaPrivada';

/**
 * Componente Raiz de Configuração das Rotas (RF02, RF05, RF11, RF12 e RF14)
 * Mapeamento atualizado para a recuperação:
 * - / -> redireciona para /livros
 * - /livros -> Catálogo com busca
 * - /livros/:id -> Detalhe com tags semânticas e selo Esgotado
 * - /carrinho -> Carrinho com Context API
 * - /pagamento -> Rota privada
 * - /sucesso e /falha -> Telas de resultado
 * - * -> Página 404
 */
export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Rota inicial: Redireciona para /livros */}
        <Route path="/" element={<Navigate to="/livros" replace />} />

        {/* Grupo A: Catálogo e Detalhes de Livros */}
        <Route path="/livros" element={<Livros />} />
        <Route path="/livros/:id" element={<DetalheLivro />} />

        {/* Grupo B: Carrinho de Compras */}
        <Route path="/carrinho" element={<Carrinho />} />

        {/* Grupo C: Rota Privada de Pagamento e Resultados */}
        <Route
          path="/pagamento"
          element={
            <RotaPrivada>
              <Pagamento />
            </RotaPrivada>
          }
        />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/falha" element={<Falha />} />

        {/* Rota 404 para URLs não mapeadas */}
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;
