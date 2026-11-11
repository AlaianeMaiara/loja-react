// Módulo centralizado de comunicação com a API (RF01 e RF18)
// Suporta json-server local E fallback automático para db.json (exigência do RF18 para deploy)
import dadosLocais from '../../db.json';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Busca a lista completa de produtos.
 * Tenta consumir a API simulada do json-server; se estiver offline,
 * recorre ao fallback direto do db.json (conforme especificado no RF18).
 */
export async function buscarProdutos() {
  try {
    const resposta = await fetch(`${API_URL}/produtos`, { signal: AbortSignal.timeout(2000) });
    if (!resposta.ok) {
      throw new Error(`Status ${resposta.status}`);
    }
    return await resposta.json();
  } catch (erro) {
    console.warn('API local offline. Usando dados locais do db.json como fallback (RF18):', erro);
    return dadosLocais.produtos;
  }
}

/**
 * Busca um único produto pelo seu ID específico.
 */
export async function buscarProdutoPorId(id) {
  try {
    const resposta = await fetch(`${API_URL}/produtos/${id}`, { signal: AbortSignal.timeout(2000) });
    if (!resposta.ok) {
      throw new Error(`Status ${resposta.status}`);
    }
    return await resposta.json();
  } catch (erro) {
    console.warn(`API local offline. Buscando produto ${id} no db.json local:`, erro);
    const produto = dadosLocais.produtos.find((p) => String(p.id) === String(id));
    if (!produto) {
      throw new Error(`Produto com ID ${id} não encontrado`);
    }
    return produto;
  }
}
