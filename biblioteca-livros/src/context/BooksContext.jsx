import { createContext, useState, useEffect } from 'react';

export const BooksContext = createContext();

const initialBooks = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    year: "1949",
    category: "lidos",
    notes: "Uma distopia assustadoramente profética sobre vigilância e totalitarismo.",
    dateAdded: new Date().toISOString()
  },
  {
    id: 2,
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    year: "1954",
    category: "lidos",
    notes: "A épica jornada de Frodo pela Terra Média. Uma obra-prima da fantasia.",
    dateAdded: new Date().toISOString()
  },
  {
    id: 3,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    year: "2011",
    category: "lendo",
    notes: "Uma história fascinante da humanidade desde a pré-história até os dias atuais.",
    dateAdded: new Date().toISOString()
  },
  {
    id: 4,
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    year: "1937",
    category: "lidos",
    notes: "A aventura de Bilbo Bolseiro que antecede O Senhor dos Anéis.",
    dateAdded: new Date().toISOString()
  },
  {
    id: 5,
    title: "Dune",
    author: "Frank Herbert",
    year: "1965",
    category: "lendo",
    notes: "Ficção científica épica sobre política, religião e ecologia em um planeta desértico.",
    dateAdded: new Date().toISOString()
  },
  {
    id: 6,
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    year: "1945",
    category: "lidos",
    notes: "Fábula política satírica sobre poder e corrupção.",
    dateAdded: new Date().toISOString()
  },
  {
    id: 7,
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    year: "1943",
    category: "lidos",
    notes: "Um conto filosófico sobre amizade, amor e perda.",
    dateAdded: new Date().toISOString()
  },
  {
    id: 8,
    title: "Neuromancer",
    author: "William Gibson",
    year: "1984",
    category: "quero-ler",
    notes: "O livro que definiu o cyberpunk.",
    dateAdded: new Date().toISOString()
  },
  {
    id: 9,
    title: "Fundação",
    author: "Isaac Asimov",
    year: "1951",
    category: "quero-ler",
    notes: "A saga épica da psico-história e o destino da galáxia.",
    dateAdded: new Date().toISOString()
  },
  {
    id: 10,
    title: "Cem Anos de Solidão",
    author: "Gabriel García Márquez",
    year: "1967",
    category: "quero-ler",
    notes: "Obra-prima do realismo mágico latino-americano.",
    dateAdded: new Date().toISOString()
  },
  {
    id: 11,
    title: "O Nome do Vento",
    author: "Patrick Rothfuss",
    year: "2007",
    category: "lendo",
    notes: "A história de Kvothe, um lendário mago e aventureiro.",
    dateAdded: new Date().toISOString()
  },
  {
    id: 12,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    year: "1953",
    category: "lidos",
    notes: "Distopia sobre censura e a queima de livros.",
    dateAdded: new Date().toISOString()
  }
];

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('biblioteca-livros');
    if (savedBooks) {
      return JSON.parse(savedBooks);
    }
    return initialBooks;
  });

  useEffect(() => {
    localStorage.setItem('biblioteca-livros', JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    const newBook = {
      id: Date.now(),
      ...book,
      dateAdded: new Date().toISOString(),
    };
    setBooks([...books, newBook]);
  };

  const updateBook = (id, updatedBook) => {
    setBooks(books.map(book => book.id === id ? { ...book, ...updatedBook } : book));
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
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
      getBooksByCategory
    }}>
      {children}
    </BooksContext.Provider>
  );
};
