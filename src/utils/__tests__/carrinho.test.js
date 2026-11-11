import { describe, it, expect } from 'vitest';
import { calcularSubtotal, calcularTotal, calcularQuantidadeTotal } from '../carrinho';

describe('Regras de Negócio do Carrinho', () => {
  const itensMassaTeste = [
    { id: '1', nome: 'Livro A', preco: 50.0, quantidade: 2 },
    { id: '2', nome: 'Livro B', preco: 30.0, quantidade: 1 },
  ];

  describe('calcularSubtotal', () => {
    // Caminho Feliz
    it('deve calcular o subtotal multiplicando preço unitário por quantidade', () => {
      expect(calcularSubtotal(50.0, 2)).toBe(100.0);
      expect(calcularSubtotal(29.99, 3)).toBe(89.97);
    });

    // Caminho Triste
    it('deve retornar 0 se o preço ou a quantidade forem negativos ou inválidos', () => {
      expect(calcularSubtotal(-50.0, 2)).toBe(0);
      expect(calcularSubtotal(50.0, -1)).toBe(0);
      expect(calcularSubtotal('50', 2)).toBe(0);
    });
  });

  describe('calcularTotal', () => {
    // Caminho Feliz
    it('deve somar os subtotais de todos os itens do carrinho com precisão', () => {
      // (50 * 2) + (30 * 1) = 130
      expect(calcularTotal(itensMassaTeste)).toBe(130.0);
    });

    // Caminho Triste
    it('deve retornar 0 para carrinho vazio ou parâmetros nulos', () => {
      expect(calcularTotal([])).toBe(0);
      expect(calcularTotal(null)).toBe(0);
      expect(calcularTotal(undefined)).toBe(0);
    });
  });

  describe('calcularQuantidadeTotal', () => {
    // Caminho Feliz
    it('deve somar a quantidade total de unidades presentes no carrinho', () => {
      expect(calcularQuantidadeTotal(itensMassaTeste)).toBe(3);
    });

    // Caminho Triste
    it('deve retornar 0 para array vazio ou parâmetro inválido', () => {
      expect(calcularQuantidadeTotal([])).toBe(0);
      expect(calcularQuantidadeTotal('invalido')).toBe(0);
    });
  });
});
