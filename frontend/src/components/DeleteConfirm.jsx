const DeleteConfirm = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="content">
        <h2>Are you sure you want to delete?</h2>
        <div className="actions">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="confirm-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
