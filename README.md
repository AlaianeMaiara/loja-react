# 📚 Livraria React — Projeto Avaliativo de Recuperação (Módulo 2)

> Projeto de Recuperação do **Módulo 2 (Semana 14)** do curso **Front-End React - Turma 01**.  
> **Prazo de Entrega no AVA:** 16/11/2026 às 22h  
> **Desenvolvido por:** Alaiane Ferreira  
> **Repositório:** Privado (Avaliadores adicionados: `yanesteves` e `lab365-operacao`)

---

## 1. 🎯 Sobre o Projeto

A **Livraria React** é uma Single Page Application (SPA) completa de comércio eletrônico de livros. Ela resolve o problema de descoberta literária e compra fluida, atendendo rigorosamente a todos os requisitos do documento de recuperação:
1. **Catálogo de Livros (`/livros`):** 12 livros divididos em 4 categorias (`Tecnologia`, `Fantasia`, `Romance`, `Ficção Científica`), incluindo títulos esgotados (`estoque: 0`);
2. **Busca em Tempo Real (RF04):** Campo controlado filtrando tanto pelo **título** quanto pelo **autor** do livro (ex.: digitar *"tolkien"* exibe os livros de J.R.R. Tolkien), calculado com `useMemo`;
3. **Tratamento de Livros Esgotados (RF03, RF05 e Critério 5):** Exibição do selo **"Esgotado"** e botão *"Adicionar ao carrinho"* desabilitado tanto no card quanto na tela de detalhe, impedindo que itens sem estoque entrem no carrinho;
4. **Detalhe do Livro Semântico (`/livros/:id` - RF05):** Rota dinâmica com `useParams` utilizando HTML semântico obrigatório (`<article>`, `<h1>`, `<img>` com alt descritivo, `<p>` para o resumo, preço em reais e estoque);
5. **Carrinho com Context API (`/carrinho` - RF06 a RF09):** Gerenciamento de estado global com `CarrinhoContext` e custom hook `useCarrinho`, controles de quantidade (`- 1 +`), cálculo de subtotais e valor total com `useMemo`, e indicador `Badge` do Material UI no Header;
6. **Checkout Protegido por Rota Privada (RF10 a RF13):** Acesso restrito a carrinhos com itens via `RotaPrivada` com `<Navigate />`. Formulário com `React Hook Form` e `Zod`, simulação assíncrona com botão desabilitado, detecção de fraude com mensagem exata `"tentativa de golpe"` na tela `/falha` (mantendo itens) e tela `/sucesso` (limpando o carrinho);
7. **Testes Unitários Automatizados (RF17):** 18 testes automatizados no Vitest cobrindo caminhos felizes e tristes para as 4 regras de negócio em `src/utils/` (`moeda.js`, `carrinho.js`, `busca.js` e `pagamento.js`).

---

## 2. 🚀 Tecnologias e Bibliotecas Utilizadas

| Tecnologia | Finalidade no Projeto |
| :--- | :--- |
| **React 19** | Construção da interface reativa baseada em componentes funcionais. |
| **Vite 8** | Servidor de desenvolvimento ultrarrápido com HMR e empacotamento de produção otimizado. |
| **React Router DOM 7** | Navegação SPA com rotas dinâmicas (`/livros/:id`), layout aninhado com `<Outlet />`, rota privada e página 404. |
| **Context API & Hooks** | Gerenciamento de estado global com `CarrinhoContext`, `useCarrinho`, `useMemo` e `useCallback`. |
| **React Hook Form & Zod** | Formulário de checkout de alta performance com validação declarativa de schemas. |
| **Material UI (@mui/material)** | Componente `Badge` no cabeçalho exibindo a contagem do carrinho em tempo real. |
| **CSS Modules** | Estilos modulares e design responsivo *mobile-first* (1 coluna mobile, 2 tablet, 4 desktop). |
| **json-server** | API REST mock servindo a coleção `"livros"` a partir de `db.json` na porta 3001. |
| **Vitest** | Suíte de testes unitários automatizados para as funções puras de regras de negócio. |
| **Git & GitHub** | Controle de versão seguindo o padrão Gitflow profissional com branches temáticas. |

---

## 3. 📂 Estrutura de Pastas (Atomic Design)

```text
loja-react/
├── db.json                     # Banco com 12 livros (sendo 2 com estoque 0)
├── package.json                # Dependências e scripts (dev, api, test, build)
├── vite.config.js              # Configuração do Vite
├── README.md                   # Documentação técnica oficial
└── src/
    ├── main.jsx                # Ponto de entrada (BrowserRouter + CarrinhoProvider)
    ├── App.jsx                 # Configuração das rotas (/livros, /livros/:id, /carrinho, etc.)
    ├── index.css               # Estilos globais e reset
    ├── components/
    │   ├── atoms/              # Botões, inputs e selos
    │   │   ├── CampoBusca.jsx
    │   │   ├── CampoBusca.module.css
    │   │   ├── SeloEsgotado.jsx
    │   │   └── SeloEsgotado.module.css
    │   ├── molecules/          # Cards e itens modulares
    │   │   ├── LivroCard.jsx
    │   │   ├── LivroCard.module.css
    │   │   ├── ItemCarrinho.jsx
    │   │   └── ItemCarrinho.module.css
    │   ├── organisms/          # Header com Badge e Footer
    │   │   ├── Header.jsx
    │   │   ├── Header.module.css
    │   │   ├── Footer.jsx
    │   │   └── Footer.module.css
    │   └── templates/          # Layout estrutural com <Outlet />
    │       ├── Layout.jsx
    │       └── Layout.module.css
    ├── pages/                  # Telas completas
    │   ├── Livros.jsx          # Catálogo com busca por título ou autor
    │   ├── DetalheLivro.jsx    # Detalhe semântico com useParams
    │   ├── Carrinho.jsx        # Carrinho com cálculos e controles
    │   ├── Pagamento.jsx       # Checkout com validação Zod
    │   ├── Sucesso.jsx         # Confirmação de compra
    │   ├── Falha.jsx           # Tela anti-golpe com botão tentar novamente
    │   └── NaoEncontrada.jsx   # Página 404 personalizada
    ├── routes/
    │   └── RotaPrivada.jsx     # Proteção da rota de pagamento
    ├── contexts/
    │   └── CarrinhoContext.jsx # Estado global e ações do carrinho
    ├── hooks/
    │   └── useCarrinho.js      # Custom hook para consumo do contexto
    ├── services/
    │   └── api.js              # Chamadas HTTP (GET /livros, GET /livros/:id com fallback)
    └── utils/
        ├── moeda.js            # Formatação de moeda BRL (R$)
        ├── busca.js            # Filtro por título OU autor (filtrarLivros)
        ├── carrinho.js         # Cálculos de subtotais e total geral
        ├── pagamento.js        # Regra de golpe (todosDigitosIguais)
        └── __tests__/          # 18 testes automatizados no Vitest
            ├── moeda.test.js
            ├── carrinho.test.js
            ├── busca.test.js
            └── pagamento.test.js
```

---

## 4. ⚙️ Como Executar a Aplicação

### Pré-requisitos:
- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [Git](https://git-scm.com/)

### Comandos:

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar a API simulada (json-server):**
   ```bash
   npm run api
   ```
   *Servidor rodando em: `http://localhost:3001/livros`*

3. **Iniciar a aplicação React (em outro terminal):**
   ```bash
   npm run dev
   ```
   *Acesse em: `http://localhost:5173/`*

4. **Rodar a bateria de testes automatizados:**
   ```bash
   npm test
   ```
   *Executa 18 testes com 100% de sucesso cobrindo as regras de negócio.*

5. **Gerar a versão de produção:**
   ```bash
   npm run build
   ```

---

## 5. 🌿 Branches e Histórico no Gitflow

- **`main`**: Versão estável final consolidada para entrega.
- **`develop`**: Linha de integração de desenvolvimento.
- **`feature/configuracao-inicial`**: Dependências e ambiente Vite.
- **`feature/api-produtos`**: Criação da primeira versão do `db.json`.
- **`feature/catalogo`**: Primeira versão do catálogo.
- **`feature/carrinho-context`**: Implementação do `CarrinhoContext` e `useCarrinho`.
- **`feature/checkout-pagamento`**: Rota privada, formulário Zod e telas de resultado.
- **`feature/testes-unitarios`**: Testes unitários com Vitest.
- **`feature/documentacao-readme`**: Documentação inicial.
- **`feature/recuperacao-livraria`**: Atualização completa para os requisitos de recuperação (endpoints `/livros`, busca por autor, selo "Esgotado", bloqueio de estoque 0 e semântica HTML).

---

## 6. 🧪 Cobertura de Testes Automatizados (RF17)

Foram implementados testes cobrindo caminho feliz e caminho triste para todas as regras de negócio:
- `formatarMoeda`: Formatação em R$, valores negativos, nulos e tipos inválidos.
- `calcularSubtotal`: Multiplicação unitária e proteção contra negativos.
- `calcularTotal`: Soma de todos os itens e tolerância a carrinho vazio.
- `calcularQuantidadeTotal`: Soma de unidades presentes no carrinho.
- `filtrarLivros`: Busca por **título** ou por **autor** (ex.: "tolkien"), case-insensitive, termos vazios e dados corrompidos.
- `todosDigitosIguais`: Detecção exata de golpe (16 dígitos iguais com ou sem traços/espaços).

**Resultado:** `Test Files: 4 passed (4) | Tests: 18 passed (18)`.

---

## 7. 🎬 Roteiro de Gravação do Vídeo (Item 5.4 - até 7 min)

Grave mostrando seu rosto no início, boa iluminação, e compartilhe a tela:

1. **Abertura e Aprendizado com IA:**
   - Destaque que utilizou a Inteligência Artificial como **professora e mentora sênior**, comando a comando, para aprender os conceitos com profundidade e fugir do *vibe code* (atendendo ao checklist `[x] Conferi o código sugerido pela IA e consigo explicá-lo`).
2. **Demonstração do Sistema:**
   - Mostre a rota `/livros` com os 12 livros e os 2 livros marcados com o selo **"Esgotado"** e botões desabilitados.
   - Digite `"tolkien"` na busca para mostrar a filtragem por autor em tempo real com `useMemo`.
   - Abra um livro para mostrar a rota `/livros/:id` com as tags semânticas pedidas (`<article>`, `<h1>`, `<img>` com alt descritivo, `<p>` para o resumo e estoque).
   - Adicione livros e mostre o `Badge` no Header atualizando em tempo real com a Context API.
   - Demonstre a tela `/carrinho` com totais.
   - Tente acessar `/pagamento` com carrinho vazio para comprovar o bloqueio da `RotaPrivada`.
   - Demonstre o pagamento com cartão repetido (`1111 1111 1111 1111`) levando à tela `/falha` com a mensagem exata `"tentativa de golpe"`.
   - Conclua com cartão válido (`1234 5678 9012 3456`) aprovando a compra em `/sucesso` e limpando o carrinho.
3. **Como Executar o Sistema:**
   - Explique os scripts `npm install`, `npm run api`, `npm run dev` e execute `npm test` no terminal mostrando os 18 testes passando.
4. **Organização das Tarefas:**
   - Planejamento com Kanban no Trello (opcional, mas recomendado).
5. **Branches e Gitflow:**
   - Apresente as branches no GitHub (`main`, `develop` e feature branches).
6. **Melhorias Futuras:**
   - Salvar no `localStorage`, criar `TemaContext` (dark mode) e gateway de pagamento real.

---

## 8. 🔗 Links de Entrega

- **Repositório GitHub Privado:** `https://github.com/AlaianeMaiara/loja-react`
- **Vídeo no Google Drive (Modo Leitor):** [Inserir Link do Vídeo]
- **Trello (Opcional):** [Inserir Link do Trello Público]
