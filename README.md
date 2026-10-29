# 🛒 Vitrine de Produtos - Lojinha 1727

Aplicação web do tipo **Single-Page Application (SPA)** desenvolvida em **Angular 19+**, simulando um e-commerce interativo, responsivo e moderno. O projeto consome dados de produtos via Supabase/FakeStoreAPI e gerencia o estado global da aplicação com **NgRx Store** e **NgRx Effects**, integrando persistência assíncrona com backend PostgreSQL no **Supabase**, utilizando as melhores práticas do ecossistema Angular.

---

## 👨‍💻 Autoria e Informações Acadêmicas

- **Autor:** Wagner Rogerio Cruz
- **Turma:** 1727 - Ada Tech
- **Curso / Disciplina:** Angular & Desenvolvimento Web
- **Projeto:** Avaliação Final / Projeto Integrador de E-Commerce

---

## 🎯 Objetivo do Projeto

O objetivo principal deste projeto é consolidar e demonstrar os conceitos fundamentais do ecossistema Angular moderno, englobando a construção de componentes reutilizáveis, roteamento dinâmico, consumo de APIs REST, formulários reativos avançados e gerenciamento de estado reativo com **NgRx Store/Effects**, além de persistência de dados em tempo real integrada a uma base PostgreSQL no **Supabase**..

---

## 🚀 Tecnologias e Decisões de Arquitetura

### 1. **Framework & UI**
- **Angular 19+:** Aplicação desenvolvida em modo *Standalone Components*, aproveitando os recursos reativos mais novos do ecossistema, como *Signals* e *Reactive Forms*.
- **Bootstrap 5:** Estilização responsiva e componentes de interface.

### 2. **Gerenciamento de Estado & Persistência**
- **NgRx Store & Effects:** Gerenciamento centralizado do estado do carrinho de compras e efeitos colaterais.
- **Supabase (PostgreSQL REST API):** Integração para busca do catálogo de produtos e sincronização do carrinho de compras.
- **UPSERT (`resolution=merge-duplicates`):** Estratégia de envio de dados para a tabela `carts` do Supabase evitando duplicidade de registros por usuário.

### 3. **Testes Unitários: Vitest vs. Jasmine/Karma**
Para este projeto, optamos pela integração e padronização com o **Vitest** como test runner oficial em vez da combinação tradicional Jasmine/Karma.

**Justificativas da escolha pelo Vitest:**
- **Performance Extrema:** O Vitest executa testes de forma nativa e assíncrona até **10x mais rápido** que o Karma/Jasmine, pois dispensa a abertura de instâncias do navegador real para rodar cada suíte.
- **Padrão Moderno do Angular (18+ / 19+):** A equipe do Angular descontinuou oficialmente o Karma e tornou o ecossistema baseado em Vite/Jest o novo padrão recomendado para builds e testes unitários.
- **Compatibilidade:** Mantém uma sintaxe limpa e declarativa (`describe`, `it`, `expect`, `vi.fn()`, `vi.spyOn()`), facilitando a manutenção e a integração contínua (CI/CD).

---

## 🧪 Estrutura de Testes Unitários

A cobertura de testes abrange todos os componentes, serviços, formulários reativos e pipes da aplicação:

| Módulo / Elemento | Arquivo de Teste | Principais Casos Testados |
| :--- | :--- | :--- |
| **Cabecalho** | `cabecalho.spec.ts` | Alternância do menu, escuta de ações do NgRx Store e totalizadores. |
| **CardProduto** | `cardproduto.spec.ts` | Cálculo de desconto (15% para itens > R$100) e despacho de ações no carrinho. |
| **CarrinhoSidebar** | `carrinhosidebar.spec.ts` | Alteração de quantidades, exclusão de itens e limpeza global do carrinho. |
| **ListaProdutos** | `listaprodutos.spec.ts` | Carregamento da API, estado de loading e busca reativa por `valueChanges`. |
| **Checkout** | `checkout.spec.ts` | Validação reativa de formulário, aplicar máscaras (Cartão/CEP) e disparo do pedido. |
| **DetalhesProduto** | `detalhesproduto.spec.ts` | Leitura de `ActivatedRoute` e cálculo dinâmico de regras de preço. |
| **DiscountPipe** | `discountpipe.spec.ts` | Aplicação percentual de descontos e tratamento de nulos/indefinidos. |
| **TruncatePipe** | `truncatepipe.spec.ts` | Truncamento de texto com limite padrão e customizado. |
| **Carrinho & Produto** | `carrinho.spec.ts` / `produto.spec.ts` | Gerenciamento do `localStorage` e requisições à REST API do Supabase. |
| **SupabaseCartService** | `supabasecart.spec.ts` | Envio de payload via POST com header `resolution=merge-duplicates`. |

---

## 📌 Requisitos Atendidos

### 1. Requisitos Funcionais
- **Galeria de Produtos (Home):** Exibição de todos os produtos cadastrados no Supabase através do componente reutilizável `CardProduto`.
- **Busca Reativa:** Campo de pesquisa na página inicial que filtra os produtos em tempo real por nome ou categoria.
- **Página de Detalhes do Produto (`/produto/:id`):** Rota dinâmica que carrega os dados completos de um item específico (título, descrição, categoria, imagem, preço com desconto e botão de ação).
- **Carrinho de Compras Interativo & Persistente:** 
  - Exibição da quantidade total de itens e valor total no cabeçalho em tempo real.
  - Sidebar de navegação do carrinho com ajuste dinâmico de quantidades e remoção de produtos.
  - Atualização instantânea dos valores totais.
  - **Sincronização com Banco de Dados:** Persistência automática do estado do carrinho no backend a cada alteração e restauração do carrinho salvo ao atualizar a página (F5).
- **Formulário de Checkout (Simulado):** 
  - Preenchimento de dados de contato e endereço com validações reativas.
  - Escolha dinâmica de método de pagamento (Cartão de Crédito, Pix ou Boleto).
  - Validação estrita de campos obrigatórios e formatos antes da finalização.

### 2. Requisitos Técnicos e Arquitetura
- **Organização do Código:** Arquitetura modular separando `componentes`, `pages`, `services`, `pipes` e gerenciamento de estado (`store/cart`).
- **Manipulação de Dados & Directivas:**
  - **Data Binding:** Uso de String Interpolation (`{{ }}`), Property Binding (`[]`) e Event Binding (`()`).
  - **Pipes:** Uso do `CurrencyPipe` (`BRL`) para formatação de moeda, `UppercasePipe` e custom pipes (`TruncatePipe`, `DiscountPipe`).
  - **Control Flow:** Uso das novas diretivas `@for` e `@if` para renderização condicional e iteração de listas.
- **Consumo de API REST & Supabase:** Servicio `Produto` utilizando `HttpClient` e `Observables` (`RxJS`) para realizar chamadas `GET` & `REST` autenticadas com cabeçalhos `apikey` e `Authorization` (`/products` e `/products/:id`).
- **Formulários Reativos (Reactive Forms):**
  - **Campo de Busca:** `FormControl` com escuta reativa via `valueChanges` para filtragem instantânea.
  - **Checkout:** `FormGroup` e `FormBuilder` aplicando validadores (`Validators.required`, `Validators.email`, `Validators.pattern`).
- **Interface Responsiva:**
  - A aplicação foi desenvolvida com foco em **Mobile-First e Design Responsivo**, com Layout totalmente adaptável para dispositivos **Desktop, Tablet e Mobile**utilizando:
* **Bootstrap 5.3:** Classes utilitárias, componentes fluidos, formulários e grid system.
* **CSS Flexbox & CSS Grid:** Organização adaptável dos cards de produtos e das seções de checkout.
* **Media Queries Customizadas:** Ajustes de layout fluidos para telas de desktops, tablets e smartphones.

---

## 🚀 Persistência de Dados & Integração com Supabase (Diferencial Técnico)

Um dos principais destaques técnicos do projeto é a **persistência reativa do carrinho de compras** no backend Supabase (PostgreSQL):

1. **NgRx Effects (`CartEffects`):** 
   - Intercepta automaticamente as ações de manipulação do carrinho (`adicionarProduto`, `diminuirProduto`, `limparCarrinho`).
   - Dispara requisições assíncronas via `SupabaseCartService` para salvar o estado atualizado do carrinho na tabela `carts`.
2. **Estratégia de UPSERT Atômico (`resolution=merge-duplicates`):**
   - Utiliza a instrução `on_conflict=user_id` e cabeçalho `Prefer: resolution=merge-duplicates` do Supabase REST API para realizar atualizações atômicas (UPSERT).
   - Garante que cada usuário possua **apenas 1 registro ativo** na tabela `carts`, atualizando a mesma linha em vez de acumular registros duplicados.
3. **Hidratação de Estado ao Inicializar (`carregarCarrinhoSupabase`):**
   - No ciclo de vida do componente raiz (`ngOnInit` no `App`), uma ação de inicialização é disparada para buscar o carrinho mais recente gravado no Supabase, restaurando o estado reativo do NgRx mesmo após o recarregamento total da página (F5).
4. **Segurança por Linha (RLS - Row Level Security):**
   - A tabela `carts` do Supabase conta com políticas RLS ativas para as operações de `SELECT`, `INSERT` e `UPDATE`, permitindo comunicação via chave pública/anônima (`anon key`).

---

## 🚀 Recursos Avançados

O projeto foi enriquecido com as seguintes implementações:

1. **Arquitetura de Estado Moderna (NgRx Store + Angular Signals):**
   - Gerenciamento reativo do carrinho de compras combinando a confiabilidade do **NgRx Store** com a performance dos **Angular Signals** (`selectSignal`, `signal`, `computed`).
2. **Checkout Dinâmico com Regras Condicionais de Validação:**
   - **Cartão de Crédito:** Aplicação dinâmica de validadores para exigir exatamente 16 dígitos no número do cartão e 3 dígitos no CVV (`Validators.pattern`).
   - **Pix:** Integração com API geradora de QR Code dinâmico + funcionalidade de copiar chave Pix com feedback visual em tempo real.
   - **Boleto:** Exibição da linha digitável simulada para pagamento.
3. **Cálculo de Desconto Dinâmico (Custom Pipe):**
   - Exibição de preço original ("DE") e preço promocional ("POR") nos cards de produtos.

---

## 🛠️ Tecnologias Utilizadas

- **Angular** (v19+)
- **TypeScript**
- **RxJS** (Observables, `valueChanges`, `switchMap`, `tap`, `catchError`)
- **NgRx Store** & **NgRx Effects** 
- **Angular Signals** (`selectSignal`, `signal`)
- **Supabase** (PostgreSQL / REST API / RLS)
- **Bootstrap 5** (Layout Responsivo e Componentes Visuais)
- **HTML5 & CSS3** (Flexbox / Grid)
- **FakeStoreAPI** (Backend REST)

---

## 💻 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes)
- **Angular CLI**

### Passo a Passo

1. **Clonar o repositório ou extrair os arquivos:**
   ```bash
   git clone <url-do-repositorio>
   cd lojinha-1727
   ```

2. **Instalar as dependências do projeto:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   ng serve
   ```

4. **Acessar no navegador:**
   Abra a URL `http://localhost:4200/` para navegar pela aplicação.

5. **Executar a suíte de testes unitários com Vitest**
   ```bash
   npm test
   ```

---

## 📱 Responsividade

A interface foi testada e otimizada para diferentes resoluções:
- 💻 **Desktop / Wide:** Grid de produtos com 4 colunas, cabeçalho expansível e sidebar do carrinho.
- 📱 **Mobile:** Grid adaptável de 1 coluna, menu hambúrguer interativo, botões de ação e campos de formulário otimizados para touch.

---

## 📄 Licença e Entrega

Projeto desenvolvido por Wagner Rogerio Cruz (Turma 1727 - Ada Tech) para fins acadêmicos como avaliação final da disciplina de **Angular I**.