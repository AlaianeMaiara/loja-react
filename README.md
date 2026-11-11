# 📚 Livraria React — E-commerce SPA Completo

> Projeto Avaliativo do **Módulo 2 (Semana 12)** do curso **Front-End React T1**.  
> Desenvolvido por: **Alaiane Ferreira**  
> Repositório: Privado (Avaliadores adicionados: `yanesteves` e `lab365-operacao`)

---

## 1. 🎯 Sobre o Projeto

A **Livraria React** é uma Single Page Application (SPA) completa de comércio eletrônico de livros. Ela resolve o problema de descoberta literária e compra fluida, permitindo ao usuário:
1. **Explorar um catálogo** variado de livros organizados por categorias (`Tecnologia`, `Ficção Científica`, `Desenvolvimento Pessoal`);
2. **Filtrar títulos em tempo real** através de um campo de busca otimizado com `useMemo`;
3. **Ver detalhes completos** de cada obra em rotas dinâmicas (`/produtos/:id`);
4. **Gerenciar um carrinho de compras global** alimentado por `Context API`, com controle rigoroso de estoque e persistência de dados;
5. **Realizar checkout protegido por Rota Privada**, com validação de dados de cartão via `React Hook Form` + `Zod`, e detecção automática de fraudes (regra anti-golpe).

---

## 2. 🚀 Tecnologias e Bibliotecas Utilizadas

| Tecnologia | Finalidade no Projeto |
| :--- | :--- |
| **React 19** | Biblioteca declarativa para construção de interfaces reativas e baseadas em componentes. |
| **Vite 8** | Build tool e servidor local ultrarrápido com Hot Module Replacement (HMR). |
| **React Router DOM 7** | Gerenciamento de rotas SPA, rotas aninhadas com `<Outlet />`, parâmetros dinâmicos (`useParams`) e rotas privadas (`<Navigate />`). |
| **Context API & Custom Hooks** | Gerenciamento de estado global do carrinho (`CarrinhoContext` e `useCarrinho`) com `useMemo` e `useCallback`. |
| **React Hook Form & Zod** | Formulário de checkout com alta performance (componentes não controlados) e validação estrita com schemas declarativos. |
| **Material UI (@mui/material)** | Componente `Badge` estilizado no cabeçalho exibindo a contagem de itens do carrinho em tempo real. |
| **CSS Modules** | Estilização com escopo local isolado e design responsivo *mobile-first* (1 coluna no mobile, 2 no tablet e 4 no desktop). |
| **json-server** | API REST mock local servindo a coleção de produtos a partir de `db.json`. |
| **Vitest** | Executor de testes unitários automatizados cobrindo as regras de negócio em `utils/`. |
| **Git & GitHub** | Controle de versão profissional seguindo padrão Gitflow com branches por funcionalidade. |

---

## 3. 📂 Estrutura de Pastas (Atomic Design)

A arquitetura do projeto segue o padrão **Atomic Design** e separação modular de responsabilidades:

```text
loja-react/
├── db.json                     # Banco de dados simulado da API (12 livros, 3 categorias)
├── package.json                # Dependências, metadados e scripts de execução
├── vite.config.js              # Configuração do empacotador Vite
├── README.md                   # Documentação oficial do projeto
└── src/
    ├── main.jsx                # Ponto de entrada (BrowserRouter + CarrinhoProvider)
    ├── App.jsx                 # Configuração central das rotas da aplicação
    ├── index.css               # Estilos globais e reset de CSS
    ├── components/
    │   ├── atoms/              # Componentes básicos indivisíveis
    │   │   ├── CampoBusca.jsx
    │   │   └── CampoBusca.module.css
    │   ├── molecules/          # Junções de átomos com propósito específico
    │   │   ├── ProdutoCard.jsx
    │   │   ├── ProdutoCard.module.css
    │   │   ├── ItemCarrinho.jsx
    │   │   └── ItemCarrinho.module.css
    │   ├── organisms/          # Blocos completos da interface
    │   │   ├── Header.jsx (Badge MUI)
    │   │   ├── Header.module.css
    │   │   ├── Footer.jsx
    │   │   └── Footer.module.css
    │   └── templates/          # Estruturas de layout da página
    │       ├── Layout.jsx (Header + Outlet + Footer)
    │       └── Layout.module.css
    ├── pages/                  # Telas completas da aplicação
    │   ├── Produtos.jsx        # Catálogo com busca e listagem
    │   ├── DetalheProduto.jsx  # Tela dinâmica com useParams
    │   ├── Carrinho.jsx        # Gerenciamento de itens e subtotais
    │   ├── Pagamento.jsx       # Checkout com validação Zod
    │   ├── Sucesso.jsx         # Confirmação e carrinho limpo
    │   ├── Falha.jsx           # Erro anti-golpe e retenção dos itens
    │   └── NaoEncontrada.jsx   # Página 404 personalizada
    ├── routes/
    │   └── RotaPrivada.jsx     # Proteção de acesso ao checkout
    ├── contexts/
    │   └── CarrinhoContext.jsx # Estado global, ações e cálculos
    ├── hooks/
    │   └── useCarrinho.js      # Custom hook para consumo seguro do contexto
    ├── services/
    │   └── api.js              # Chamadas HTTP com fallback automático (RF18)
    └── utils/
        ├── moeda.js            # Formatação monetária BRL (R$)
        ├── busca.js            # Filtro case-insensitive de produtos
        ├── carrinho.js         # Cálculos de subtotais e totais
        ├── pagamento.js        # Regra de detecção de tentativa de golpe
        └── __tests__/          # Suíte de 17 testes automatizados
            ├── moeda.test.js
            ├── carrinho.test.js
            ├── busca.test.js
            └── pagamento.test.js
```

---

## 4. ⚙️ Como Executar a Aplicação

### Pré-requisitos:
- [Node.js](https://nodejs.org/) (versão 20 ou superior recomendada)
- [Git](https://git-scm.com/)

### Passo a passo:

1. **Clonar o repositório:**
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd loja-react
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Iniciar a API simulada (json-server):**
   ```bash
   npm run api
   ```
   *A API estará disponível em: `http://localhost:3001/produtos`*

4. **Iniciar a aplicação React (em um novo terminal):**
   ```bash
   npm run dev
   ```
   *Acesse a loja no navegador em: `http://localhost:5173/`*

5. **Executar a bateria de testes unitários automatizados:**
   ```bash
   npm test
   ```
   *Executa 17 testes cobrindo todas as regras de negócio em `src/utils/` com caminho feliz e caminho triste.*

6. **Gerar a versão otimizada de produção:**
   ```bash
   npm run build
   ```

---

## 5. 🌿 Padrão de Versionamento Gitflow

O projeto utilizou uma abordagem profissional com branches isoladas por funcionalidade, histórico linear e mensagens de commit descritivas no presente/imperativo:

- **`main`**: Branch de produção estável, contendo apenas a versão final consolidada.
- **`develop`**: Branch de integração contínua de todas as features.
- **`feature/configuracao-inicial`**: Instalação do ecossistema de bibliotecas e configuração do Vite/Vitest.
- **`feature/api-produtos`**: Criação do banco de dados `db.json` com 12 livros e script `npm run api` (RF01).
- **`feature/catalogo`**: Listagem, card acessível com `PropTypes`, busca com `useMemo`, detalhes com `useParams` e layout (RF02 a RF05, RF14 e RF15).
- **`feature/carrinho-context`**: Estado global com `CarrinhoContext` e hook `useCarrinho`, controle de estoque e Badge no Header (RF06 a RF09).
- **`feature/checkout-pagamento`**: Rota privada, formulário com `React Hook Form` + `Zod`, fluxo anti-golpe e telas de resultado (RF10 a RF13).
- **`feature/testes-unitarios`**: 17 testes automatizados cobrindo as 4 regras de negócio de `utils/` (RF17).
- **`feature/documentacao-readme`**: Elaboração deste README técnico e guia de apresentação.

---

## 6. 🧪 Cobertura de Testes Automatizados (RF17)

Foram implementados testes unitários para as 4 funções de regra de negócio, cobrindo caminhos felizes e tristes:

- `formatarMoeda`: Formatação em R$, valores negativos, nulos e tipos inválidos.
- `calcularSubtotal`: Multiplicação de preço e quantidade, proteção contra valores negativos.
- `calcularTotal`: Soma dos itens do carrinho, tolerância a arrays vazios e dados corrompidos.
- `calcularQuantidadeTotal`: Soma de unidades de produtos, validação de entradas inválidas.
- `filtrarProdutos`: Busca sem distinção de maiúsculas/minúsculas, termo vazio e entradas nulas.
- `todosDigitosIguais`: Identificação exata de tentativa de golpe (16 dígitos iguais com traços/espaços) vs cartões legítimos.

Resultado: **17 testes aprovados com 100% de sucesso**.

---

## 7. 🎬 Roteiro de Gravação do Vídeo (Item 5.4 - até 7 min)

Para gravação do vídeo de apresentação da aluna **Alaiane Ferreira**, siga este roteiro estruturado:

1. **Qual o objetivo do sistema e demonstração prática:**
   - Apresente a **Livraria React**, uma loja virtual completa para amantes de livros.
   - Mostre o catálogo carregando os 12 livros da API (`db.json`).
   - Mostre a busca instantânea com `useMemo` filtrando sem recarregar a tela.
   - Abra um livro para mostrar a rota dinâmica `/produtos/:id` com `useParams`.
   - Adicione livros ao carrinho e aponte para o `Badge` do cabeçalho subindo em tempo real.
   - Abra `/carrinho`, altere quantidades e mostre o cálculo do total.
   - Clique em "Finalizar compra" e mostre a **Rota Privada** bloqueando se o carrinho estivesse vazio.
   - Simule o golpe com cartão repetido (`1111 1111 1111 1111`) exibindo *"tentativa de golpe"*.
   - Em seguida, conclua uma compra com cartão válido mostrando a tela de sucesso e a limpeza do carrinho.

2. **O que deve ser realizado para executar o sistema:**
   - Explicar os scripts: `npm install`, `npm run api` na porta 3001, `npm run dev` na porta 5173 e `npm test` para os testes do Vitest.

3. **Como organizou as tarefas antes de começar:**
   - Planejamento através do Kanban no **Trello** dividido em: A Fazer, Em Andamento, Em Testes e Concluído.
   - Organização em arquitetura **Atomic Design** e módulos separados (`services`, `contexts`, `hooks`, `utils`).

4. **Quais as branches criadas e seus objetivos:**
   - Citar a `main` (produção), `develop` (integração) e as 7 feature branches descritas na seção 5 deste README.

5. **O que faltou ou poderia ser melhorado:**
   - Adição de persistência no `localStorage` para manter o carrinho ao fechar o navegador.
   - Criação de um segundo contexto para alternância de Tema Claro / Tema Escuro (*Dark Mode*).
   - Integração com gateway de pagamento real via API webhook.

---

## 8. 🔗 Links de Entrega

- **Quadro do Trello:** [Inserir Link do Trello Público]
- **Deploy em Produção:** [Inserir Link da Netlify/Vercel]
- **Vídeo de Demonstração (Google Drive):** [Inserir Link do Vídeo em Modo Leitor]
