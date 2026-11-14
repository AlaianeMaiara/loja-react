// Módulo centralizado de comunicação com a API (RF01 e RF18)
// Suporta json-server local E fallback automático para db.json (exigência do RF18 para deploy)
import dadosLocais from '../../db.json';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Busca a lista completa de livros (GET /livros).
 * Tenta consumir a API simulada do json-server; se estiver offline,
 * recorre ao fallback direto do db.json (conforme especificado no RF18).
 */
export async function buscarLivros() {
  try {
    const resposta = await fetch(`${API_URL}/livros`, { signal: AbortSignal.timeout(2000) });
    if (!resposta.ok) {
      throw new Error(`Status ${resposta.status}`);
    }
    return await resposta.json();
  } catch (erro) {
    console.warn('API local offline. Usando dados locais do db.json como fallback (RF18):', erro);
    return dadosLocais.livros;
  }
}

/**
 * Busca um único livro pelo seu ID específico (GET /livros/:id).
 */
export async function buscarLivroPorId(id) {
  try {
    const resposta = await fetch(`${API_URL}/livros/${id}`, { signal: AbortSignal.timeout(2000) });
    if (!resposta.ok) {
      throw new Error(`Status ${resposta.status}`);
    }
    return await resposta.json();
  } catch (erro) {
    console.warn(`API local offline. Buscando livro ${id} no db.json local:`, erro);
    const livro = dadosLocais.livros.find((l) => String(l.id) === String(id));
    if (!livro) {
      throw new Error(`Livro com ID ${id} não encontrado`);
    }
    return livro;
  }
}
