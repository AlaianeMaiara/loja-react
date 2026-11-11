/**
 * Utilitários e regras de negócio para pagamentos (RF11 e RF17).
 * Função pura que será coberta por testes automatizados com Vitest.
 */

/**
 * Verifica se um número de cartão é composto exclusivamente por dígitos iguais.
 * Ignora espaços e hífens.
 * Exemplo: "1111 1111 1111 1111" ou "2222-2222-2222-2222" -> true
 *          "1234 5678 9012 3456" -> false
 * 
 * @param {string} numeroCartao 
 * @returns {boolean}
 */
export function todosDigitosIguais(numeroCartao) {
  if (!numeroCartao || typeof numeroCartao !== 'string') {
    return false;
  }

  // Remove espaços em branco e traços
  const apenasDigitos = numeroCartao.replace(/[\s-]/g, '');

  // Deve conter apenas números e ter pelo menos 1 dígito
  if (!/^\d+$/.test(apenasDigitos)) {
    return false;
  }

  // Verifica se todos os caracteres são iguais ao primeiro
  const primeiroDigito = apenasDigitos[0];
  return apenasDigitos.split('').every((digito) => digito === primeiroDigito);
}
