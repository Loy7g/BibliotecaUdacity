import { createContext, useState, useEffect } from 'react';
import * as BooksAPI from '../BooksAPI';

export const BooksContext = createContext();


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

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const apiBooks = await BooksAPI.getAll();
        const formattedBooks = apiBooks.map(book => ({
          id: book.id,
          title: book.title,
          author: book.authors ? book.authors.join(', ') : 'Autor desconhecido',
          year: book.publishedDate || '',
          category: shelfToCategory[book.shelf] || 'quero-ler',
          imageUrl: book.imageLinks?.thumbnail || '',
          notes: book.description || '',
          rating: 0, 
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
      rating: book.rating || 0,
      dateAdded: new Date().toISOString(),
    };
    
    try {
      const shelf = categoryToShelf[book.category] || 'wantToRead';
      await BooksAPI.update(newBook, shelf);
      setBooks([...books, newBook]);
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  };

  const updateBook = async (id, updatedBook) => {
    try {
      const existingBook = books.find(b => b.id === id);
      
      
      if (!existingBook && updatedBook.category && updatedBook.category !== 'none') {
        const newBook = {
          id,
          ...updatedBook,
          dateAdded: new Date().toISOString()
        };
        const shelf = categoryToShelf[updatedBook.category];
        await BooksAPI.update({ id }, shelf);
        setBooks([...books, newBook]);
        return;
      }
      
      
      if (existingBook && updatedBook.category) {
        if (updatedBook.category === 'none') {
         
          await BooksAPI.update({ id }, 'none');
          setBooks(books.filter(book => book.id !== id));
        } else {
          
          const shelf = categoryToShelf[updatedBook.category];
          await BooksAPI.update({ id }, shelf);
          setBooks(books.map(book => book.id === id ? { ...book, ...updatedBook } : book));
        }
      } else if (existingBook) {
        setBooks(books.map(book => book.id === id ? { ...book, ...updatedBook } : book));
      }
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
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
