import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BooksContext } from '../context/BooksContext';
import BookList from '../components/BookList/BookList';
import SearchBar from '../components/SearchBar/SearchBar';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { getBooksByCategory, updateBook, deleteBook } = useContext(BooksContext);
  const [searchTerm, setSearchTerm] = useState('');

  const categoryLabels = {
    'lidos': 'Já Li',
    'lendo': 'Lendo',
    'quero-ler': 'Quero Ler'
  };

  const categoryDescriptions = {
    'lidos': 'Livros que você já concluiu a leitura',
    'lendo': 'Livros que você está lendo atualmente',
    'quero-ler': 'Livros que você pretende ler em breve'
  };

  const categoryEmojis = {
    'lidos': '✅',
    'lendo': '📖',
    'quero-ler': '📚'
  };

  const books = getBooksByCategory(category);

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

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>
          {categoryEmojis[category]} {categoryLabels[category]}
        </h1>
        <p>{categoryDescriptions[category]}</p>
        <div className="category-count">
          {books.length} {books.length === 1 ? 'livro' : 'livros'}
        </div>
      </div>

      {books.length > 0 && (
        <div className="search-section">
          <SearchBar onSearch={handleSearch} />
        </div>
      )}

      <BookList
        books={filteredBooks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onChangeCategory={handleChangeCategory}
        emptyMessage={
          searchTerm
            ? 'Nenhum livro encontrado com essa busca'
            : `Você ainda não tem livros nesta categoria. Que tal adicionar um?`
        }
      />

      {books.length === 0 && (
        <div className="add-book-cta">
          <button onClick={() => navigate('/adicionar')} className="btn-primary">
            + Adicionar Primeiro Livro
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
