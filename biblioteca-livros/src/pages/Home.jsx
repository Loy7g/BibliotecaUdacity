import { useContext, useState } from 'react';
import { BooksContext } from '../context/BooksContext';
import SearchBar from '../components/SearchBar/SearchBar';
import BookList from '../components/BookList/BookList';
import './Home.css';

const Home = () => {
  const { books, updateBook, deleteBook } = useContext(BooksContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredBooks = books.filter(book => {
    const searchLower = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    );
  });

  const handleEdit = (book) => {
    alert(`Editar: ${book.title}\n(Funcionalidade de edição pode ser implementada em um modal)`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      deleteBook(id);
    }
  };

  const handleChangeCategory = (id, newCategory) => {
    updateBook(id, { category: newCategory });
  };

  const getStatistics = () => {
    return {
      total: books.length,
      lidos: books.filter(b => b.category === 'lidos').length,
      lendo: books.filter(b => b.category === 'lendo').length,
      queroLer: books.filter(b => b.category === 'quero-ler').length,
    };
  };

  const stats = getStatistics();

  return (
    <div className="home">
      <div className="hero">
        <h1>📚 Minha Biblioteca Pessoal</h1>
        <p>Organize e acompanhe seus livros de forma simples e eficiente</p>
      </div>

      <div className="statistics">
        <div className="stat-card">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total de Livros</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.lidos}</span>
          <span className="stat-label">Já Li</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.lendo}</span>
          <span className="stat-label">Lendo</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.queroLer}</span>
          <span className="stat-label">Quero Ler</span>
        </div>
      </div>

      <div className="search-section">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="books-section">
        <h2>
          {searchTerm ? `Resultados da busca: "${searchTerm}"` : 'Todos os Livros'}
        </h2>
        <BookList
          books={filteredBooks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChangeCategory={handleChangeCategory}
          emptyMessage={searchTerm ? 'Nenhum livro encontrado com essa busca' : 'Nenhum livro cadastrado ainda. Comece adicionando seu primeiro livro!'}
        />
      </div>
    </div>
  );
};

export default Home;
