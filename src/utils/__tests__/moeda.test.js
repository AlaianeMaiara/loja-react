import { describe, it, expect } from 'vitest';
import { formatarMoeda } from '../moeda';

describe('formatarMoeda', () => {
  // Caminho Feliz
  it('deve formatar um valor numérico positivo para a moeda em reais (R$)', () => {
    const resultado = formatarMoeda(89.9).replace(/\u00a0/g, ' ');
    expect(resultado).toBe('R$ 89,90');
  });

  it('deve formatar zero corretamente', () => {
    const resultado = formatarMoeda(0).replace(/\u00a0/g, ' ');
    expect(resultado).toBe('R$ 0,00');
  });

  // Caminho Triste
  it('deve retornar "R$ 0,00" quando o valor for negativo', () => {
    const resultado = formatarMoeda(-45.5).replace(/\u00a0/g, ' ');
    expect(resultado).toBe('R$ 0,00');
  });

  it('deve retornar "R$ 0,00" quando o parâmetro não for um número válido', () => {
    expect(formatarMoeda('texto').replace(/\u00a0/g, ' ')).toBe('R$ 0,00');
    expect(formatarMoeda(null).replace(/\u00a0/g, ' ')).toBe('R$ 0,00');
    expect(formatarMoeda(undefined).replace(/\u00a0/g, ' ')).toBe('R$ 0,00');
    expect(formatarMoeda(NaN).replace(/\u00a0/g, ' ')).toBe('R$ 0,00');
  });
});
