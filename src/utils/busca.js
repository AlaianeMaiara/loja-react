/**
 * Função pura para filtrar uma lista de livros pelo título OU pelo autor.
 * Não diferencia maiúsculas de minúsculas (case-insensitive).
 * Atende ao RF04 do documento de recuperação.
 * 
 * @param {Array} livros - Lista de livros
 * @param {string} termo - Termo digitado pelo usuário
 * @returns {Array} - Lista filtrada de livros
 */
export function filtrarLivros(livros, termo) {
  if (!Array.isArray(livros)) {
    return [];
  }

  if (!termo || typeof termo !== 'string' || termo.trim() === '') {
    return livros;
  }

  const termoNormalizado = termo.trim().toLowerCase();

  return livros.filter((livro) => {
    if (!livro) return false;

    const titulo = typeof livro.titulo === 'string' ? livro.titulo.toLowerCase() : '';
    const autor = typeof livro.autor === 'string' ? livro.autor.toLowerCase() : '';

    return titulo.includes(termoNormalizado) || autor.includes(termoNormalizado);
  });
}
