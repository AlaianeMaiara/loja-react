import { createContext, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { calcularTotal, calcularQuantidadeTotal } from '../utils/carrinho';

// Criação do Contexto do Carrinho (RF06)
export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  /**
   * Adiciona um livro ao carrinho (RF07)
   * - Livros esgotados (estoque 0) não podem ser adicionados.
   * - Se o livro não existir no carrinho, adiciona com quantidade 1.
   * - Se já existir, incrementa 1, desde que não ultrapasse o estoque disponível.
   */
  const adicionarItem = useCallback((livro) => {
    if (!livro || !livro.id) return;

    // RF07: livros esgotados (estoque 0) não podem ser adicionados
    if (livro.estoque <= 0) {
      alert(`O livro "${livro.titulo || livro.nome}" está esgotado.`);
      return;
    }

    setItens((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.id === livro.id);

      if (itemExistente) {
        // Verifica limite de estoque
        if (itemExistente.quantidade >= livro.estoque) {
          alert(`Limite de estoque atingido para o livro "${livro.titulo || livro.nome}" (${livro.estoque} unidades disponíveis).`);
          return itensAtuais;
        }

        return itensAtuais.map((item) =>
          item.id === livro.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [
        ...itensAtuais,
        {
          ...livro,
          titulo: livro.titulo || livro.nome,
          capa: livro.capa || livro.imagem,
          quantidade: 1,
        },
      ];
    });
  }, []);

  /**
   * Altera a quantidade de um item no carrinho (RF08)
   * Respeita o mínimo de 1 unidade e o máximo do estoque disponível.
   */
  const alterarQuantidade = useCallback((id, novaQuantidade) => {
    setItens((itensAtuais) => {
      return itensAtuais.map((item) => {
        if (item.id !== id) return item;

        // Limite mínimo: 1 unidade
        if (novaQuantidade < 1) return item;

        // Limite máximo: estoque do produto
        if (novaQuantidade > item.estoque) {
          alert(`Quantidade solicitada excede o estoque disponível de ${item.estoque} unidades.`);
          return item;
        }

        return { ...item, quantidade: novaQuantidade };
      });
    });
  }, []);

  /**
   * Remove completamente um item do carrinho (RF08)
   */
  const removerItem = useCallback((id) => {
    setItens((itensAtuais) => itensAtuais.filter((item) => item.id !== id));
  }, []);

  /**
   * Limpa todos os itens do carrinho (usado após pagamento aprovado no RF13)
   */
  const limparCarrinho = useCallback(() => {
    setItens([]);
  }, []);

  // RF06 e Critério 4.2: useMemo aplicado para evitar recálculo de totais a cada re-render
  const valorTotal = useMemo(() => calcularTotal(itens), [itens]);
  const quantidadeTotal = useMemo(() => calcularQuantidadeTotal(itens), [itens]);

  const valorContexto = useMemo(() => ({
    itens,
    adicionarItem,
    alterarQuantidade,
    removerItem,
    limparCarrinho,
    quantidadeTotal,
    valorTotal,
  }), [itens, adicionarItem, alterarQuantidade, removerItem, limparCarrinho, quantidadeTotal, valorTotal]);

  return (
    <CarrinhoContext.Provider value={valorContexto}>
      {children}
    </CarrinhoContext.Provider>
  );
}

CarrinhoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
