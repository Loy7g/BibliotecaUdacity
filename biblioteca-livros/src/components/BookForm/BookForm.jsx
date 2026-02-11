import { useState } from 'react';
import StarRating from '../StarRating/StarRating';
import './BookForm.css';

const BookForm = ({ initialBook, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialBook || {
    title: '',
    author: '',
    year: '',
    category: 'quero-ler',
    notes: '',
    rating: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (newRating) => {
    setFormData(prev => ({
      ...prev,
      rating: newRating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.author.trim()) {
      onSubmit(formData);
      setFormData({
        title: '',
        author: '',
        year: '',
        category: 'quero-ler',
        notes: '',
        rating: 0
      });
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{initialBook ? 'Editar Livro' : 'Adicionar Novo Livro'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Título *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Digite o título do livro"
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Autor *</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          placeholder="Digite o nome do autor"
        />
      </div>

      <div className="form-group">
        <label htmlFor="year">Ano de Publicação</label>
        <input
          type="number"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Ex: 2024"
          min="1000"
          max="2100"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Categoria *</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="quero-ler">Quero Ler</option>
          <option value="lendo">Lendo</option>
          <option value="lidos">Já Li</option>
        </select>
      </div>

      <div className="form-group">
        <label>Avaliação</label>
        <div className="rating-input">
          <StarRating
            rating={formData.rating}
            onRatingChange={handleRatingChange}
            size="large"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notas / Observações</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Adicione suas anotações sobre o livro"
          rows="4"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {initialBook ? 'Salvar Alterações' : 'Adicionar Livro'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default BookForm;
