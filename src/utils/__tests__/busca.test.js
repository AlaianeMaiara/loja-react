import { describe, it, expect } from 'vitest';
import { filtrarProdutos } from '../busca';

describe('filtrarProdutos', () => {
  const listaProdutos = [
    { id: '1', nome: 'Código Limpo' },
    { id: '2', nome: 'Duna' },
    { id: '3', nome: 'Entendendo Algoritmos' },
  ];

  // Caminho Feliz
  it('deve filtrar produtos ignorando maiúsculas e minúsculas (case-insensitive)', () => {
    const resultadoMinusculo = filtrarProdutos(listaProdutos, 'código');
    expect(resultadoMinusculo).toHaveLength(1);
    expect(resultadoMinusculo[0].nome).toBe('Código Limpo');

    const resultadoMaiusculo = filtrarProdutos(listaProdutos, 'DUNA');
    expect(resultadoMaiusculo).toHaveLength(1);
    expect(resultadoMaiusculo[0].nome).toBe('Duna');
  });

  it('deve retornar lista completa se o termo de busca for vazio ou contiver apenas espaços', () => {
    expect(filtrarProdutos(listaProdutos, '')).toHaveLength(3);
    expect(filtrarProdutos(listaProdutos, '   ')).toHaveLength(3);
  });

  // Caminho Triste
  it('deve retornar array vazio se nenhum produto corresponder ao termo pesquisado', () => {
    const resultado = filtrarProdutos(listaProdutos, 'TermoInexistenteXYZ');
    expect(resultado).toHaveLength(0);
  });

  it('deve tratar entradas corrompidas ou nulas sem quebrar', () => {
    expect(filtrarProdutos(null, 'termo')).toEqual([]);
    expect(filtrarProdutos(undefined, 'termo')).toEqual([]);
    expect(filtrarProdutos('nao-array', 'termo')).toEqual([]);
  });
});
