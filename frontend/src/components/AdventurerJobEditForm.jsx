import { useState } from 'react';

function AdventurerJobEditForm({
  setShowEditForm,
  adventurer,
  allJobs,
  adventurerJobIds,
  backendURL,
  isCompleted,
  isTracking,
  isPaymentTransferred,
  dataReload,
}) {
  const [isCompletedInput, setIsCompletedInput] = useState(isCompleted);
  const [isTrackingInput, setIsTrackingInput] = useState(isTracking);
  const [isPaymentTransferredInput, setIsPaymentTransferredInput] =
    useState(isPaymentTransferred);
  const [updatedJobId, setUpdatedJobId] = useState(adventurerJobIds.job_ID);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(backendURL + '/adventurerJobs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adventurer_ID: adventurerJobIds.adventurer_ID,
          job_ID: adventurerJobIds.job_ID,
          updated_job_ID: updatedJobId,
          adventurer_completed_job: isCompletedInput,
          adventurer_currently_tracking_job: isTrackingInput,
          completion_payment_transfered: isPaymentTransferredInput,
        }),
      });
      if (response.ok) {
        dataReload();
      }
    } catch (err) {
      console.log(err);
    }
    setShowEditForm(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p htmlFor="adventurerName">{adventurer}</p>
      <label htmlFor="allJobs">Jobs:</label>
      <select
        name="allJobs"
        id="allJobs"
        value={updatedJobId}
        onChange={(e) => setUpdatedJobId(Number(e.target.value))}
      >
        {allJobs.map((aj) => (
          <option key={aj.job_ID} value={aj.job_ID}>
            {aj.job_opener}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="completed">Job Completed?: </label>
      <input
        type="checkbox"
        name="completed"
        id="completed"
        defaultChecked={isCompletedInput}
        onChange={() => setIsCompletedInput((prev) => !prev)}
      />
      <br />
      <label htmlFor="tracking">Adventurer Tracking?: </label>
      <input
        type="checkbox"
        name="tracking"
        id="tracking"
        defaultChecked={isTrackingInput}
        onChange={() => setIsTrackingInput((prev) => !prev)}
      />
      <br />
      <label htmlFor="paymentTransferred">Payment Transferred?: </label>
      <input
        type="checkbox"
        name="paymentTransferred"
        id="paymentTransferred"
        defaultChecked={isPaymentTransferredInput}
        onChange={() => setIsPaymentTransferredInput((prev) => !prev)}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AdventurerJobEditForm;
