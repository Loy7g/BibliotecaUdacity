import { useState } from 'react';
import StarRating from '../StarRating/StarRating';
import './BookCard.css';

const fallbackImage =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="480">
      <rect width="100%" height="100%" fill="#2a2420"/>
      <text x="50%" y="50%" font-size="42" fill="#d6b24a" font-family="Arial" text-anchor="middle" dominant-baseline="middle">📚</text>
    </svg>`
  );

const BookCard = ({ book, onEdit, onDelete, onChangeCategory, onRatingChange, showEditDelete = true }) => {
  const [imageError, setImageError] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(book.imageUrl || fallbackImage);
  const [imageAttempt, setImageAttempt] = useState(0);
  const [prevBookImageUrl, setPrevBookImageUrl] = useState(book.imageUrl);

  
  if (book.imageUrl !== prevBookImageUrl) {
    setPrevBookImageUrl(book.imageUrl);
    setImageError(false);
    setImageAttempt(0);
    setCurrentImageUrl(book.imageUrl || fallbackImage);
  }

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

  const handleImageError = () => {
    if (imageAttempt === 0 && book.imageUrl) {
      const urlWithoutZoom = book.imageUrl.replace(/&zoom=\d+/, '');
      if (urlWithoutZoom !== book.imageUrl) {
        setCurrentImageUrl(urlWithoutZoom);
        setImageAttempt(1);
        return;
      }
    }

    if (imageAttempt === 1 && book.imageUrl) {
      const urlWithoutEdge = currentImageUrl.replace(/&edge=curl/, '');
      if (urlWithoutEdge !== currentImageUrl) {
        setCurrentImageUrl(urlWithoutEdge);
        setImageAttempt(2);
        return;
      }
    }

    setCurrentImageUrl(fallbackImage);
    setImageError(true);
  };

  return (
    <div className="book-card">
      <div className="book-image">
        {currentImageUrl && !imageError ? (
          <img 
            key={`${book.id}-${imageAttempt}`}
            src={currentImageUrl} 
            alt={book.title}
            onError={handleImageError}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="no-image-placeholder">📚</div>
        )}
      </div>
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
