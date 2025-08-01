function AdventurerJobEditForm({
  setShowForm,
  isCompleted,
  isTracking,
  isPaymentTransferred,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  return (
    <form>
      <label htmlFor="completed">Job Completed?: </label>
      <input
        type="checkbox"
        name="completed"
        id="completed"
        defaultChecked={isCompleted}
      />
      <br />
      <label htmlFor="tracking">Adventurer Tracking?: </label>
      <input
        type="checkbox"
        name="tracking"
        id="tracking"
        defaultChecked={isTracking}
      />
      <br />
      <label htmlFor="paymentTransferred">Payment Transferred?: </label>
      <input
        type="checkbox"
        name="paymentTransferred"
        id="paymentTransferred"
        defaultChecked={isPaymentTransferred}
      />
      <br />
      <button type="submit" onClick={handleSubmit}>
        Submit (Disabled for Mockup)
      </button>
    </form>
  );
}

export default AdventurerJobEditForm;
