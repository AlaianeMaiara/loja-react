import { describe, it, expect } from 'vitest';
import { todosDigitosIguais } from '../pagamento';

describe('todosDigitosIguais (Regra Anti-Golpe)', () => {
  // Caminho Feliz (Detecção do Golpe)
  it('deve retornar true quando todos os dígitos do cartão forem iguais', () => {
    expect(todosDigitosIguais('1111111111111111')).toBe(true);
    expect(todosDigitosIguais('2222 2222 2222 2222')).toBe(true);
    expect(todosDigitosIguais('9999-9999-9999-9999')).toBe(true);
  });

  // Caminho Feliz (Cartão Normal)
  it('deve retornar false quando o cartão tiver dígitos variados', () => {
    expect(todosDigitosIguais('1234567890123456')).toBe(false);
    expect(todosDigitosIguais('4111 1111 1111 1111')).toBe(false);
  });

  // Caminho Triste
  it('deve retornar false para valores vazios, nulos ou que não contenham dígitos', () => {
    expect(todosDigitosIguais('')).toBe(false);
    expect(todosDigitosIguais(null)).toBe(false);
    expect(todosDigitosIguais(undefined)).toBe(false);
    expect(todosDigitosIguais('cartao-invalido')).toBe(false);
  });
});
