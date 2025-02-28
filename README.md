# Cash Control 💰

Um aplicativo de controle financeiro desenvolvido em React que permite gerenciar entradas e saídas de dinheiro.


## 🚀 Funcionalidades

### 1. Gestão de Transações
- Adicionar novas transações (entradas e saídas)
- Visualizar histórico de transações em uma tabela
- Categorização das transações
- Ordenação por data mais recente

### 2. Dashboard
- Resumo financeiro com:
- Total de entradas
- Total de saídas
- Saldo total (com indicador visual positivo/negativo)

### 3. Busca e Filtros
- Pesquisa por descrição ou categoria
- Filtro case-insensitive
- Resultados em tempo real


## 💻 Tecnologias Utilizadas

#### Core
- React
- TypeScript
- Vite
'
#### Estilização
- Styled Components
- Phosphor Icons
- Radix UI (Dialog, Radio Group)

#### Gerenciamento de Estado e Dados
- React Context API
- Axios
- JSON Server (API Mock)

#### Formulários e Validação
- React Hook Form
- Zod

#### Hooks
- useContext
- useMemo
- useCallback

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/FerrazNathan/cash-control.git

# Instale as dependências
npm install ou yarn

# Inicie o servidor JSON
npm run server ou yarn server

# Inicie a aplicação
npm run dev ou yarn dev
```


## 📌 Endpoints da API

O projeto utiliza JSON Server rodando na porta 3333 com os seguintes endpoints:

GET /transactions - Lista todas as transações
POST /transactions - Cria uma nova transação



## 🔍 Estrutura do Projeto

```
src/
  ├── components/      # Componentes reutilizáveis
  ├── contexts/        # Contextos React
  ├── hooks/          # Hooks customizados
  ├── sections/       # Seções maiores da aplicação
  ├── styles/         # Estilos globais e temas
  ├── utils/          # Utilitários e formatadores
  └── lib/            # Configurações de bibliotecas
```


## 🎨 Temas e Estilos
O projeto utiliza um tema customizado com uma paleta de cores predefinida, incluindo:
- Tons de cinza para o layout base
- Verde para indicadores positivos
- Vermelho para indicadores negativos