import { useState, useContext, useEffect } from 'react';
import { BooksContext } from '../context/BooksContext';
import * as BooksAPI from '../BooksAPI';
import BookCard from '../components/BookCard/BookCard';
import './SearchPage.css';

const SearchPage = () => {
  const { books, updateBook } = useContext(BooksContext);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const searchBooks = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        setError('');
        return;
      }

      setSearching(true);
      setError('');

      try {
        const results = await BooksAPI.search(query.trim(), 20);
        
        
        if (!results || results.error === 'empty query' || !Array.isArray(results)) {
          setSearchResults([]);
          setError('');
          return;
        }

        
        const formattedResults = results.map(book => {
          
          const existingBook = books.find(b => b.id === book.id);
          
          return {
            id: book.id,
            title: book.title || 'Título não disponível',
            author: book.authors ? book.authors.join(', ') : 'Autor desconhecido',
            year: book.publishedDate || '',
            category: existingBook ? existingBook.category : 'none',
            imageUrl: book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail || '',
            notes: book.description || '',
            dateAdded: existingBook ? existingBook.dateAdded : new Date().toISOString()
          };
        });

        setSearchResults(formattedResults);
      } catch (err) {
        console.error('Erro na busca:', err);
        setSearchResults([]);
        setError('');
      } finally {
        setSearching(false);
      }
    };

   
    const timeoutId = setTimeout(() => {
      searchBooks();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, books]);

  const handleChangeCategory = async (bookId, newCategory) => {
    
    const existingBook = books.find(b => b.id === bookId);
    
    if (existingBook) {
      if (newCategory === 'none') {
        await updateBook(bookId, { category: newCategory });
      } else {
        await updateBook(bookId, { category: newCategory });
      }
    } else {
      if (newCategory !== 'none') {
        const searchBook = searchResults.find(b => b.id === bookId);
        if (searchBook) {
          await updateBook(bookId, { 
            ...searchBook,
            category: newCategory 
          });
        }
      }
    }

    setSearchResults(prevResults =>
      prevResults.map(book =>
        book.id === bookId ? { ...book, category: newCategory } : book
      )
    );
  };

  const handleRatingChange = async (bookId, newRating) => {
    const existingBook = books.find(b => b.id === bookId);
    
    if (existingBook) {
      await updateBook(bookId, { rating: newRating });
    } else {

      const searchBook = searchResults.find(b => b.id === bookId);
      if (searchBook && searchBook.category !== 'none') {
        await updateBook(bookId, { ...searchBook, rating: newRating });
      }
    }


    setSearchResults(prevResults =>
      prevResults.map(book =>
        book.id === bookId ? { ...book, rating: newRating } : book
      )
    );
  };

  const handleEdit = () => {
    
  };

  const handleDelete = () => {
    
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>🔍 Buscar Livros</h1>
        <p>Encontre e adicione novos livros à sua biblioteca</p>
      </div>

      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por título ou autor (ex: inteligência artificial, poesia, biografia)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        {searching && <div className="search-loading">🔄 Buscando...</div>}
      </div>

      <div className="search-results">
        {!query.trim() && (
          <div className="search-empty-state">
            <p>💡 Digite algo no campo acima para começar a buscar livros</p>
          </div>
        )}

        {query.trim() && !searching && searchResults.length === 0 && !error && (
          <div className="search-empty-state">
            <p>📚 Nenhum livro encontrado para "{query}"</p>
            <p className="search-hint">Tente buscar por outro termo</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <>
            <div className="search-results-header">
              <h2>Resultados da busca: "{query}"</h2>
              <span className="results-count">
                {searchResults.length} {searchResults.length === 1 ? 'livro encontrado' : 'livros encontrados'}
              </span>
            </div>
            <div className="search-results-grid">
              {searchResults.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onChangeCategory={handleChangeCategory}
                  onRatingChange={handleRatingChange}
                  showEditDelete={false}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
