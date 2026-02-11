import StarRating from '../StarRating/StarRating';
import './BookCard.css';

const BookCard = ({ book, onEdit, onDelete, onChangeCategory, onRatingChange, showEditDelete = true }) => {
  const categoryLabels = {
    'lidos': 'Já Li',
    'lendo': 'Lendo',
    'quero-ler': 'Quero Ler',
    'none': 'Nenhuma'
  };

  const handleRatingChange = (newRating) => {
    if (onRatingChange) {
      onRatingChange(book.id, newRating);
    }
  };

  return (
    <div className="book-card">
      {book.imageUrl && (
        <div className="book-image">
          <img src={book.imageUrl} alt={book.title} />
        </div>
      )}
      <div className="book-card-header">
        <h3 className="book-title">{book.title}</h3>
        {book.category !== 'none' && (
          <span className={`category-badge ${book.category}`}>
            {categoryLabels[book.category]}
          </span>
        )}
      </div>
      
      <p className="book-author">por {book.author}</p>
      
      {book.year && <p className="book-year">Ano: {book.year}</p>}
      
      <div className="book-rating-section">
        <StarRating
          rating={book.rating || 0}
          onRatingChange={handleRatingChange}
          size="medium"
        />
      </div>
      
      {book.notes && (
        <p className="book-notes">{book.notes}</p>
      )}
      
      <div className="book-card-actions">
        <select 
          className="category-select"
          value={book.category}
          onChange={(e) => onChangeCategory(book.id, e.target.value)}
        >
          <option value="none">Nenhuma</option>
          <option value="quero-ler">Quero Ler</option>
          <option value="lendo">Lendo</option>
          <option value="lidos">Já Li</option>
        </select>
        
        {showEditDelete && (
          <>
            <button onClick={() => onEdit(book)} className="btn-edit">
              ✏️ Editar
            </button>
            
            <button onClick={() => onDelete(book.id)} className="btn-delete">
              🗑️ Excluir
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookCard;
