import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', type = 'danger' }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div className="confirm-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className={`confirm-icon ${type}`}>
          {type === 'danger' ? '⚠️' : type === 'warning' ? '🔔' : 'ℹ️'}
        </div>
        
        <div className="confirm-header">
          <h2>{title}</h2>
        </div>
        
        <div className="confirm-message">
          <p>{message}</p>
        </div>

        <div className="confirm-actions">
          <button onClick={onClose} className="btn-confirm-cancel">
            {cancelText}
          </button>
          <button onClick={onConfirm} className={`btn-confirm-action ${type}`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
