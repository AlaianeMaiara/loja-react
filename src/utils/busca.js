/**
 * Função pura para filtrar uma lista de produtos pelo nome.
 * Não diferencia maiúsculas de minúsculas (case-insensitive).
 * 
 * @param {Array} produtos - Lista de produtos
 * @param {string} termo - Termo digitado pelo usuário
 * @returns {Array} - Lista filtrada de produtos
 */
export function filtrarProdutos(produtos, termo) {
  if (!Array.isArray(produtos)) {
    return [];
  }

  if (!termo || typeof termo !== 'string' || termo.trim() === '') {
    return produtos;
  }

  const termoNormalizado = termo.trim().toLowerCase();

  return produtos.filter((produto) => {
    if (!produto || !produto.nome || typeof produto.nome !== 'string') {
      return false;
    }
    return produto.nome.toLowerCase().includes(termoNormalizado);
  });
}
