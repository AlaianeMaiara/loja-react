/**
 * Utilitários puros para cálculos das regras de negócio do carrinho de compras (RF06, RF08 e RF17).
 * Funções puras que serão cobertas por testes automatizados com Vitest.
 */

/**
 * Calcula o subtotal de um item multiplicando o preço unitário pela quantidade.
 */
export function calcularSubtotal(preco, quantidade) {
  if (typeof preco !== 'number' || typeof quantidade !== 'number' || preco < 0 || quantidade < 0) {
    return 0;
  }
  return Number((preco * quantidade).toFixed(2));
}

/**
 * Calcula o valor financeiro total somando os subtotais de todos os itens do carrinho.
 */
export function calcularTotal(itens) {
  if (!Array.isArray(itens)) {
    return 0;
  }

  const total = itens.reduce((acumulador, item) => {
    if (!item || typeof item.preco !== 'number' || typeof item.quantidade !== 'number') {
      return acumulador;
    }
    return acumulador + item.preco * item.quantidade;
  }, 0);

  return Number(total.toFixed(2));
}

/**
 * Calcula a contagem total de unidades de itens presentes no carrinho.
 */
export function calcularQuantidadeTotal(itens) {
  if (!Array.isArray(itens)) {
    return 0;
  }

  return itens.reduce((acumulador, item) => {
    if (!item || typeof item.quantidade !== 'number' || item.quantidade < 0) {
      return acumulador;
    }
    return acumulador + item.quantidade;
  }, 0);
}
