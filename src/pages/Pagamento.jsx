import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCarrinho } from '../hooks/useCarrinho';
import { formatarMoeda } from '../utils/moeda';
import { todosDigitosIguais } from '../utils/pagamento';
import styles from './Pagamento.module.css';

/**
 * Esquema de Validação Zod para o Formulário de Pagamento (RF10)
 * Regras:
 * - Titular: preenchido (mínimo 3 caracteres)
 * - Cartão: 16 dígitos (desconsiderando espaços e hífens)
 * - Validade: MM/AA com mês entre 01 e 12
 * - CVV: 3 dígitos numéricos
 */
const schemaPagamento = z.object({
  titular: z
    .string()
    .min(3, 'O nome do titular deve ter pelo menos 3 caracteres')
    .nonempty('Nome do titular é obrigatório'),
  numeroCartao: z
    .string()
    .nonempty('Número do cartão é obrigatório')
    .refine((val) => {
      const digitos = val.replace(/[\s-]/g, '');
      return /^\d{16}$/.test(digitos);
    }, 'O cartão deve conter exatamente 16 dígitos numéricos'),
  validade: z
    .string()
    .nonempty('Validade é obrigatória')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Formato inválido. Use MM/AA (ex: 12/28)'),
  cvv: z
    .string()
    .nonempty('CVV é obrigatório')
    .regex(/^\d{3}$/, 'O CVV deve ter exatamente 3 dígitos'),
});

export function Pagamento() {
  const { valorTotal, limparCarrinho } = useCarrinho();
  const [processando, setProcessando] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaPagamento),
    mode: 'onBlur',
  });

  const onSubmit = (dados) => {
    setProcessando(true);

    // Simulação do processamento assíncrono (RF11)
    setTimeout(() => {
      const isGolpe = todosDigitosIguais(dados.numeroCartao);

      if (isGolpe) {
        // RF11: Cartão com todos os dígitos iguais vai para /falha com mensagem exata
        // RF13: Mantém os itens no carrinho
        setProcessando(false);
        navigate('/falha', { state: { mensagem: 'tentativa de golpe' } });
      } else {
        // Compra aprovada: limpa o carrinho e vai para /sucesso (RF13)
        limparCarrinho();
        setProcessando(false);
        navigate('/sucesso');
      }
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.titulo}>Pagamento do Pedido</h1>
        <p className={styles.subtitulo}>Preencha os dados do cartão para concluir sua compra fictícia.</p>

        {/* Resumo do Total vindo do CarrinhoContext (RF10) */}
        <div className={styles.resumoValor}>
          <span className={styles.totalLabel}>Total a pagar:</span>
          <span className={styles.totalValor}>{formatarMoeda(valorTotal)}</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
          {/* Nome do Titular */}
          <div className={styles.grupoCampo}>
            <label htmlFor="titular" className={styles.label}>Nome impresso no cartão</label>
            <input
              id="titular"
              type="text"
              placeholder="Ex: Maria Silva"
              {...register('titular')}
              className={`${styles.input} ${errors.titular ? styles.inputErro : ''}`}
            />
            {errors.titular && (
              <span className={styles.mensagemErro} role="alert">{errors.titular.message}</span>
            )}
          </div>

          {/* Número do Cartão */}
          <div className={styles.grupoCampo}>
            <label htmlFor="numeroCartao" className={styles.label}>Número do cartão (16 dígitos)</label>
            <input
              id="numeroCartao"
              type="text"
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              {...register('numeroCartao')}
              className={`${styles.input} ${errors.numeroCartao ? styles.inputErro : ''}`}
            />
            {errors.numeroCartao && (
              <span className={styles.mensagemErro} role="alert">{errors.numeroCartao.message}</span>
            )}
          </div>

          {/* Validade e CVV lado a lado */}
          <div className={styles.linhaCampos}>
            <div className={styles.grupoCampo}>
              <label htmlFor="validade" className={styles.label}>Validade (MM/AA)</label>
              <input
                id="validade"
                type="text"
                maxLength={5}
                placeholder="12/28"
                {...register('validade')}
                className={`${styles.input} ${errors.validade ? styles.inputErro : ''}`}
              />
              {errors.validade && (
                <span className={styles.mensagemErro} role="alert">{errors.validade.message}</span>
              )}
            </div>

            <div className={styles.grupoCampo}>
              <label htmlFor="cvv" className={styles.label}>CVV</label>
              <input
                id="cvv"
                type="text"
                maxLength={3}
                placeholder="123"
                {...register('cvv')}
                className={`${styles.input} ${errors.cvv ? styles.inputErro : ''}`}
              />
              {errors.cvv && (
                <span className={styles.mensagemErro} role="alert">{errors.cvv.message}</span>
              )}
            </div>
          </div>

          {/* Botão de Envio Assíncrono com trava de desabilitação (RF11) */}
          <button
            type="submit"
            disabled={processando}
            className={styles.botaoPagar}
          >
            {processando ? 'Processando compra...' : `Pagar ${formatarMoeda(valorTotal)}`}
          </button>
        </form>
      </div>
    </div>
  );
}
