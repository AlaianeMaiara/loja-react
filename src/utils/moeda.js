/**
 * Utilitário de formatação de valores monetários para o padrão brasileiro (R$).
 * Função pura: mesmo input sempre gera o mesmo output, sem efeitos colaterais.
 * Exemplo: 89.9 -> "R$ 89,90"
 */
export function formatarMoeda(valor) {
  if (typeof valor !== 'number' || isNaN(valor) || valor < 0) {
    return 'R$ 0,00';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}
