# 📚 Biblioteca de Livros

Uma aplicação web moderna para gerenciar sua biblioteca pessoal de livros, construída com React e Vite.

## 📋 Sobre o Projeto

Esta aplicação permite que você organize seus livros em três categorias principais:
- **Quero Ler**: Livros que você planeja ler
- **Lendo**: Livros que você está lendo atualmente
- **Já Li**: Livros que você já terminou de ler

## ✨ Funcionalidades

- ✅ Adicionar novos livros com título, autor, ano e notas
- 🔍 Buscar livros por título ou autor
- 📊 Visualizar estatísticas da sua biblioteca
- 🏷️ Categorizar livros (Quero Ler, Lendo, Já Li)
- ✏️ Alterar categoria dos livros facilmente
- 🗑️ Excluir livros da biblioteca
- 💾 Persistência de dados usando LocalStorage
- 📱 Design responsivo para mobile e desktop
- 🎨 Interface moderna com tema claro/escuro automático

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server ultra-rápido
- **React Router DOM** - Gerenciamento de rotas
- **Context API** - Gerenciamento de estado global
- **CSS3** - Estilização moderna e responsiva
- **LocalStorage** - Persistência de dados local

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
│   │   └── SearchBar/      # Barra de busca
│   ├── context/            # Context API
│   │   └── BooksContext.jsx
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.jsx        # Página inicial
│   │   ├── CategoryPage.jsx # Página de categoria
│   │   └── AddBook.jsx     # Página de adicionar livro
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

## 🔄 Futuras Melhorias

Algumas ideias para expandir o projeto:

- [ ] Modal para edição de livros
- [ ] Sistema de avaliação (estrelas)
- [ ] Upload de capas de livros
- [ ] Filtros avançados (por autor, ano, etc.)
- [ ] Ordenação (por título, data, etc.)
- [ ] Exportar/Importar dados (JSON, CSV)
- [ ] Gráficos de leitura
- [ ] Metas de leitura
- [ ] Compartilhamento de listas
- [ ] Backend com API REST
- [ ] Autenticação de usuários

## 📄 Licença

Este projeto foi criado para fins educacionais.

## 👨‍💻 Autor

Desenvolvido como projeto de estudo de React + Vite.

---

Feito com ❤️ e React
