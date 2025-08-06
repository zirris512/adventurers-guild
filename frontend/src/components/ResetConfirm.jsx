const ResetConfirm = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="content">
        <h2>Are you sure you want to reset the database?</h2>
        <div className="actions">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="confirm-btn">
            Reset DB
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirm;
