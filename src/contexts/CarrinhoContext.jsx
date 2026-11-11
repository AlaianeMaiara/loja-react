import { createContext, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { calcularTotal, calcularQuantidadeTotal } from '../utils/carrinho';

// Criação do Contexto do Carrinho (RF06)
export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  /**
   * Adiciona um produto ao carrinho (RF07)
   * - Se o produto não existir, adiciona com quantidade 1.
   * - Se já existir, incrementa 1, desde que não ultrapasse o estoque disponível.
   */
  const adicionarItem = useCallback((produto) => {
    if (!produto || !produto.id) return;

    setItens((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.id === produto.id);

      if (itemExistente) {
        // Verifica limite de estoque
        if (itemExistente.quantidade >= produto.estoque) {
          alert(`Limite de estoque atingido para o livro "${produto.nome}" (${produto.estoque} unidades disponíveis).`);
          return itensAtuais;
        }

        return itensAtuais.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      // Se for a primeira vez que entra no carrinho, valida se há estoque
      if (produto.estoque <= 0) {
        alert(`O livro "${produto.nome}" está esgotado.`);
        return itensAtuais;
      }

      return [...itensAtuais, { ...produto, quantidade: 1 }];
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
