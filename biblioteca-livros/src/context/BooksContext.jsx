import { createContext, useState, useEffect } from 'react';
import * as BooksAPI from '../BooksAPI';

export const BooksContext = createContext();

// Mapeamento entre categorias da aplicação e shelves da API
const categoryToShelf = {
  'lidos': 'read',
  'lendo': 'currentlyReading',
  'quero-ler': 'wantToRead'
};

const shelfToCategory = {
  'read': 'lidos',
  'currentlyReading': 'lendo',
  'wantToRead': 'quero-ler'
};

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega os livros da API na montagem do componente
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const apiBooks = await BooksAPI.getAll();
        // Converte os livros da API para o formato da aplicação
        const formattedBooks = apiBooks.map(book => ({
          id: book.id,
          title: book.title,
          author: book.authors ? book.authors.join(', ') : 'Autor desconhecido',
          year: book.publishedDate || '',
          category: shelfToCategory[book.shelf] || 'quero-ler',
          imageUrl: book.imageLinks?.thumbnail || '',
          notes: book.description || '',
          dateAdded: new Date().toISOString()
        }));
        setBooks(formattedBooks);
      } catch (error) {
        console.error('Erro ao carregar livros:', error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const addBook = async (book) => {
    const newBook = {
      id: Date.now().toString(),
      ...book,
      dateAdded: new Date().toISOString(),
    };
    
    try {
      // Atualiza o livro na API com a shelf correspondente
      const shelf = categoryToShelf[book.category] || 'wantToRead';
      await BooksAPI.update(newBook, shelf);
      setBooks([...books, newBook]);
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  };

  const updateBook = async (id, updatedBook) => {
    try {
      const book = books.find(b => b.id === id);
      if (book && updatedBook.category) {
        const shelf = categoryToShelf[updatedBook.category];
        await BooksAPI.update({ id }, shelf);
      }
      setBooks(books.map(book => book.id === id ? { ...book, ...updatedBook } : book));
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      // Remove o livro da shelf (move para 'none')
      await BooksAPI.update({ id }, 'none');
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  };

  const getBooksByCategory = (category) => {
    return books.filter(book => book.category === category);
  };

  return (
    <BooksContext.Provider value={{
      books,
      addBook,
      updateBook,
      deleteBook,
      getBooksByCategory,
      loading
    }}>
      {children}
    </BooksContext.Provider>
  );
};
