# Cash Control 💰

Um aplicativo de controle financeiro desenvolvido em React que permite gerenciar entradas e saídas de dinheiro.

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)


## 🚀 Funcionalidades

### 1. Gestão de Transações
- Adicionar novas transações (entradas e saídas)
- Visualizar histórico de transações em uma tabela
- Categorização das transações
- Ordenação por data mais recente
- Opção de registrar investimentos
- Possibilidade de registrar transações recorrentes
- Acompanhamento do progresso das transações recorrentes

### 2. Dashboard
- Resumo financeiro com:
- Total de entradas
- Total de saídas
- Saldo total (com indicador visual positivo/negativo)
- Saldo de investimentos (caso seja cadastrado)

### 3. Busca e Filtros
- Pesquisa por descrição ou categoria
- Filtro por mês
- Filtro por tipo de transação
- Filtro por range de preço
- Filtros case-insensitive
- Resultados em tempo real

### 4. Tela de Histórico
- Opção de visualização (mensal ou anual)
- Gráfico de acompanhamento das transações
- Opção de acompanhamento personalizado por mês ou ano

### 5. Aplicação independente por usuário
- Sistema integrado com o firebase
- Usuário autenticado pelo firebase
- Segurança nas informações
- Transações únicas por usuário


## 💻 Tecnologias Utilizadas

#### Core
- React
- TypeScript
- Vite
- Javascript
#### Estilização
- Styled Components
- Phosphor Icons
- Radix UI (Dialog, Radio Group)
- Shadcn/ui (gráficos)

#### Gerenciamento de Estado e Dados
- React Context API
- Axios
- Api do firebase 100% integrada com o usuário

#### Formulários e Validação
- React Hook Form
- Zod

#### Hooks
- useContext
- useMemo
- useCallback
- useState
- useEffect

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
- Opção de temas light e dark
- Tema contraste para acessibilidade
