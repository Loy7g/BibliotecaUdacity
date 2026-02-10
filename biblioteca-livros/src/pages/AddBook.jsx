import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BooksContext } from '../context/BooksContext';
import BookForm from '../components/BookForm/BookForm';
import './AddBook.css';

const AddBook = () => {
  const { addBook } = useContext(BooksContext);
  const navigate = useNavigate();

  const handleSubmit = (bookData) => {
    addBook(bookData);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="add-book-page">
      <div className="add-book-container">
        <BookForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default AddBook;
