import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BooksContext } from '../context/BooksContext';
import BookList from '../components/BookList/BookList';
import SearchBar from '../components/SearchBar/SearchBar';
import EditBookModal from '../components/EditBookModal/EditBookModal';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { getBooksByCategory, updateBook, deleteBook, loading } = useContext(BooksContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, bookId: null, bookTitle: '' });

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
    setEditingBook(book);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (formData) => {
    updateBook(editingBook.id, formData);
    setEditingBook(null);
  };

  const handleDelete = (id) => {
    const book = books.find(b => b.id === id);
    setDeleteConfirm({
      isOpen: true,
      bookId: id,
      bookTitle: book?.title || 'este livro'
    });
  };

  const confirmDelete = () => {
    deleteBook(deleteConfirm.bookId);
    setDeleteConfirm({ isOpen: false, bookId: null, bookTitle: '' });
  };

  const handleChangeCategory = (id, newCategory) => {
    updateBook(id, { category: newCategory });
  };

  const handleRatingChange = (id, newRating) => {
    updateBook(id, { rating: newRating });
  };

  if (loading) {
    return (
      <div className="category-page">
        <div className="loading-state">
          <p>📖 Carregando livros...</p>
        </div>
      </div>
    );
  }

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
        onRatingChange={handleRatingChange}
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

      <EditBookModal
        key={editingBook?.id}
        book={editingBook}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingBook(null);
        }}
        onSave={handleSaveEdit}
      />

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, bookId: null, bookTitle: '' })}
        onConfirm={confirmDelete}
        title="Excluir Livro"
        message={`Tem certeza que deseja excluir "${deleteConfirm.bookTitle}"? Esta ação não pode ser desfeita.`}
        confirmText="🗑️ Excluir"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};

export default CategoryPage;
