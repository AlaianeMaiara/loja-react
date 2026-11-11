import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/templates/Layout';
import { Produtos } from './pages/Produtos';
import { DetalheProduto } from './pages/DetalheProduto';
import { Carrinho } from './pages/Carrinho';
import { NaoEncontrada } from './pages/NaoEncontrada';

/**
 * Componente Raiz de Configuração das Rotas (RF14)
 */
export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Rota inicial: Redireciona para /produtos */}
        <Route path="/" element={<Navigate to="/produtos" replace />} />

        {/* Grupo A: Catálogo e Detalhes */}
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/:id" element={<DetalheProduto />} />

        {/* Grupo B: Carrinho de Compras */}
        <Route path="/carrinho" element={<Carrinho />} />

        {/* Rota 404 para URLs não mapeadas */}
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;
