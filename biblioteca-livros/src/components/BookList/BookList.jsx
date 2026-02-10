import BookCard from '../BookCard/BookCard';
import './BookList.css';

const BookList = ({ books, onEdit, onDelete, onChangeCategory, emptyMessage = 'Nenhum livro encontrado' }) => {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>📚 {emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeCategory={onChangeCategory}
        />
      ))}
    </div>
  );
};

export default BookList;
