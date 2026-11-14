import { describe, it, expect } from 'vitest';
import { filtrarLivros } from '../busca';

describe('filtrarLivros (Busca por título ou autor - RF04 e RF17)', () => {
  const listaLivros = [
    { id: '1', titulo: 'Código Limpo', autor: 'Robert C. Martin' },
    { id: '2', titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien' },
    { id: '3', titulo: 'O Hobbit', autor: 'J.R.R. Tolkien' },
    { id: '4', titulo: 'Dom Casmurro', autor: 'Machado de Assis' },
  ];

  // Caminho Feliz
  it('deve filtrar livros pelo título sem diferenciar maiúsculas e minúsculas', () => {
    const resultado = filtrarLivros(listaLivros, 'código');
    expect(resultado).toHaveLength(1);
    expect(resultado[0].titulo).toBe('Código Limpo');
  });

  it('deve filtrar livros pelo autor sem diferenciar maiúsculas e minúsculas (ex: "tolkien")', () => {
    const resultado = filtrarLivros(listaLivros, 'tolkien');
    expect(resultado).toHaveLength(2);
    expect(resultado.map((l) => l.titulo)).toEqual(['O Senhor dos Anéis', 'O Hobbit']);
  });

  it('deve retornar lista completa se o termo de busca for vazio ou contiver apenas espaços', () => {
    expect(filtrarLivros(listaLivros, '')).toHaveLength(4);
    expect(filtrarLivros(listaLivros, '   ')).toHaveLength(4);
  });

  // Caminho Triste
  it('deve retornar array vazio quando nenhum livro corresponder ao termo pesquisado', () => {
    const resultado = filtrarLivros(listaLivros, 'AutorInexistenteXYZ');
    expect(resultado).toHaveLength(0);
  });

  it('deve tratar entradas corrompidas ou nulas sem quebrar', () => {
    expect(filtrarLivros(null, 'termo')).toEqual([]);
    expect(filtrarLivros(undefined, 'termo')).toEqual([]);
    expect(filtrarLivros('nao-array', 'termo')).toEqual([]);
  });
});
