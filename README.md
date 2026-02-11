# 📚 Biblioteca de Livros

Uma aplicação web moderna para gerenciar sua biblioteca pessoal de livros, construída com React e Vite, integrada com a API do Udacity.

## 📋 Sobre o Projeto

Esta aplicação permite que você organize seus livros em três categorias principais:
- **Quero Ler**: Livros que você planeja ler
- **Lendo**: Livros que você está lendo atualmente
- **Já Li**: Livros que você já terminou de ler

Além disso, você pode buscar e adicionar novos livros através da integração com a API de livros do Udacity.

## ✨ Funcionalidades

- 🔍 **Buscar livros** na base de dados do Udacity
  - Busca por título ou autor
  - Suporte para múltiplas palavras (ex: "inteligência artificial")
  - Busca funciona mesmo sem miniatura ou autor disponível
  - Resultados em tempo real com debounce
  - Adicionar livros encontrados às suas estantes
- ⭐ **Sistema de Avaliação** estilo Letterboxd
  - Avaliar livros de 1 a 5 estrelas
  - Interface interativa com hover e animações
  - Feedback visual imediato
  - Persistência automática das avaliações
  - Disponível em todas as páginas (Home, Categorias, Busca)
- ✅ Adicionar novos livros com título, autor, ano e notas
- 📊 Visualizar estatísticas da sua biblioteca
- 🏷️ Categorizar livros (Quero Ler, Lendo, Já Li)
- ✏️ Editar informações dos livros com modal elegante
- 🔄 Alterar categoria dos livros entre estantes
- 🗑️ Excluir livros com confirmação modal
- 💾 Sincronização automática com API do Udacity
- 📱 Design responsivo para mobile e desktop
- 🎨 Interface moderna com tema elegante dourado/escuro
- 🖼️ Exibição de capas dos livros

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server ultra-rápido
- **React Router DOM** - Gerenciamento de rotas
- **Context API** - Gerenciamento de estado global
- **BooksAPI (Udacity)** - API REST para gerenciar livros
- **CSS3** - Estilização moderna e responsiva

## 📁 Estrutura do Projeto

```
biblioteca-livros/
├── public/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── BookCard/       # Card de exibição de livro
│   │   ├── BookForm/       # Formulário de adição/edição
│   │   ├── BookList/       # Lista de livros
│   │   ├── Header/         # Cabeçalho com navegação
│   │   ├── SearchBar/      # Barra de busca
│   │   ├── EditBookModal/  # Modal de edição de livros
│   │   ├── ConfirmModal/   # Modal de confirmação
│   │   └── StarRating/     # Componente de avaliação por estrelas
│   ├── context/            # Context API
│   │   └── BooksContext.jsx
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.jsx        # Página inicial
│   │   ├── CategoryPage.jsx # Página de categoria
│   │   ├── AddBook.jsx     # Página de adicionar livro
│   │   └── SearchPage.jsx  # Página de busca
│   ├── BooksAPI.js         # Cliente da API do Udacity
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Ponto de entrada
│   └── index.css           # Estilos globais
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório ou navegue até a pasta do projeto:
```cmd
cd biblioteca-livros
```

2. Instale as dependências:
```cmd
npm install
```

### Executando a Aplicação

Para iniciar o servidor de desenvolvimento:

```cmd
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

Para criar uma build otimizada para produção:

```cmd
npm run build
```

Para visualizar a build de produção:

```cmd
npm run preview
```

## 🎯 Boas Práticas Implementadas

### Componentização
- Componentes pequenos e reutilizáveis
- Separação clara de responsabilidades
- Props bem definidas

### Gerenciamento de Estado
- Context API para estado global
- LocalStorage para persistência
- Estado local quando apropriado

### Rotas
- React Router para navegação
- Rotas semânticas e intuitivas
- Navegação programática

### CSS
- Estilos modulares por componente
- Design responsivo mobile-first
- Variáveis CSS para consistência
- Suporte a temas claro/escuro

### Código Limpo
- Nomes descritivos de variáveis e funções
- Código formatado e organizado
- Comentários quando necessário
- Estrutura de pastas lógica

## 🎯 Funcionalidades Implementadas

### Página de Busca
- ✅ Campo de entrada de busca com feedback visual
- ✅ Resultados em tempo real conforme o usuário digita (com debounce de 300ms)
- ✅ Resultados não são mostrados quando a caixa de busca está vazia
- ✅ Tratamento de consultas inválidas e resultados vazios
- ✅ Funciona corretamente com livros sem miniatura ou autor
- ✅ Suporte para busca de múltiplas palavras (ex: "inteligência artificial", "poesia", "biografia")

### Sincronização entre Páginas
- ✅ Livros podem ser movidos entre estantes (Quero Ler, Lendo, Já Li, Nenhuma)
- ✅ Mudanças na página de busca refletem na página principal
- ✅ Estante correta é exibida para livros já categorizados
- ✅ Opção "Nenhuma" disponível para remover livros das estantes

### Modais e Interface
- ✅ Modal elegante para edição de livros
- ✅ Modal de confirmação para exclusão com design profissional
- ✅ Animações suaves e transições
- ✅ Design responsivo e moderno
  
# Sistema de Avaliação
- ✅ Componente de estrelas interativo (1-5 estrelas)
- ✅ Animações ao passar o mouse e clicar
- ✅ Feedback visual claro (cores douradas)
- ✅ Texto descritivo da avaliação (Fraco, Regular, Bom, Muito Bom, Excelente)
- ✅ Funciona em todos os contextos (cards, modais, formulários)
- ✅ Clique na mesma estrela remove a avaliação
- ✅ Persistência automática no contexto global

## 📄 Licença

Este projeto foi criado para fins educacionais.
---

Feito com ❤️ e React
