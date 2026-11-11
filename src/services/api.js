// Módulo centralizado de comunicação com a API (json-server)
// Boa prática: nunca espalhe URLs 'hardcoded' dentro dos componentes React!

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Busca a lista completa de produtos cadastrados.
 * Trata erros de rede e códigos de status HTTP como 404 e 500.
 */
export async function buscarProdutos() {
  try {
    const resposta = await fetch(`${API_URL}/produtos`);
    if (!resposta.ok) {
      throw new Error(`Erro ao buscar produtos (Status: ${resposta.status})`);
    }
    return await resposta.json();
  } catch (erro) {
    console.error('Falha na requisição buscarProdutos:', erro);
    throw erro;
  }
}

/**
 * Busca um único produto pelo seu ID específico.
 */
export async function buscarProdutoPorId(id) {
  try {
    const resposta = await fetch(`${API_URL}/produtos/${id}`);
    if (!resposta.ok) {
      throw new Error(`Produto com ID ${id} não encontrado (Status: ${resposta.status})`);
    }
    return await resposta.json();
  } catch (erro) {
    console.error(`Falha na requisição buscarProdutoPorId(${id}):`, erro);
    throw erro;
  }
}
