import { useContext, useState } from 'react';
import { BooksContext } from '../context/BooksContext';
import SearchBar from '../components/SearchBar/SearchBar';
import BookList from '../components/BookList/BookList';
import EditBookModal from '../components/EditBookModal/EditBookModal';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal';
import './Home.css';

const Home = () => {
  const { books, updateBook, deleteBook, loading } = useContext(BooksContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, bookId: null, bookTitle: '' });

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

  const getStatistics = () => {
    return {
      total: books.length,
      lidos: books.filter(b => b.category === 'lidos').length,
      lendo: books.filter(b => b.category === 'lendo').length,
      queroLer: books.filter(b => b.category === 'quero-ler').length,
    };
  };

  const stats = getStatistics();

  if (loading) {
    return (
      <div className="home">
        <div className="loading-state">
          <p>📖 Carregando livros...</p>
        </div>
      </div>
    );
  }

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

export default Home;
