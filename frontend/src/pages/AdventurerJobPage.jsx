import React, { useEffect, useState } from 'react';
import AdventurerJobEditForm from '../components/AdventurerJobEditForm';
import AdventurerJobCreateForm from '../components/AdventurerJobCreateForm';
import DeleteConfirm from '../components/DeleteConfirm';
import { useParams } from 'react-router-dom';

function AdventurerJobPage() {
  //If we call AdventurerJobPage from AdventurerPage
  //Otherwise we need a dropdown list of adventurer names
  const { id: paramId } = useParams();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [isPaymentTransferred, setIsPaymentTransferred] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [aj_table, set_aj_table] = useState([
    {
      adventurer_ID: 1,
      adventurer: 'Aria Thorne',
      job_ID: 1,
      job_opener: 'Lysa Fairwind',
      adventurer_completed_job: 1,
      adventurer_currently_tracking_job: 0,
      aj_last_update: '2025-07-31 18:57:48',
      completion_payment_transfered: 1,
    },
    {
      adventurer_ID: 1,
      adventurer: 'Aria Thorne',
      job_ID: 4,
      job_opener: 'Eldon Stoneshaper',
      adventurer_completed_job: 1,
      adventurer_currently_tracking_job: 0,
      aj_last_update: '2025-07-31 18:57:48',
      completion_payment_transfered: 1,
    },
    {
      adventurer_ID: 2,
      adventurer: 'Bren Stoneheart',
      job_ID: 2,
      job_opener: 'Torin Blacksteel',
      adventurer_completed_job: 1,
      adventurer_currently_tracking_job: 0,
      aj_last_update: '2025-07-31 18:57:48',
      completion_payment_transfered: 1,
    },
    {
      adventurer_ID: 3,
      adventurer: 'Cyril Duskblade',
      job_ID: 3,
      job_opener: 'Ilya Brightstar',
      adventurer_completed_job: 1,
      adventurer_currently_tracking_job: 0,
      aj_last_update: '2025-07-31 18:57:48',
      completion_payment_transfered: 1,
    },
  ]);

  useEffect(() => {
    if (paramId) {
      set_aj_table((prevData) =>
        prevData.filter((data) => paramId == data.adventurer_ID),
      );
    }
  }, [paramId]);

  const handleEditSubmit = (adventurer_data) => {
    setIsCompleted(adventurer_data.adventurer_completed_job);
    setIsTracking(adventurer_data.adventurer_currently_tracking_job);
    setIsPaymentTransferred(adventurer_data.completion_payment_transfered);
    setShowEditForm(true);
  };

  const handleOpen = () => {
    setShowConfirm(true);
  };

  const handleClose = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <h2>Adventurer Job Page</h2>

      {showEditForm && (
        <AdventurerJobEditForm
          setShowEditForm={setShowEditForm}
          isCompleted={isCompleted}
          isTracking={isTracking}
          isPaymentTransferred={isPaymentTransferred}
        />
      )}
      {!showCreateForm ? (
        <button onClick={() => setShowCreateForm(true)}>
          Create Adventurer Job
        </button>
      ) : (
        <AdventurerJobCreateForm setShowCreateForm={setShowCreateForm} />
      )}
      <table>
        <thead>
          <tr>
            <th>Adventurer</th>
            <th>Job Opener</th>
            <th>Completed?</th>
            <th>Tracking?</th>
            <th>Last Update</th>
            <th>Pay Transferred?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {aj_table.map((a, index) => (
            <tr key={index}>
              <td>{a.adventurer}</td>
              <td>{a.job_opener}</td>
              <td>{a.adventurer_completed_job == 1 ? 'Yes' : 'No'}</td>
              <td>{a.adventurer_currently_tracking_job == 1 ? 'Yes' : 'No'}</td>
              <td>{a.aj_last_update}</td>
              <td>{a.completion_payment_transfered == 1 ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEditSubmit(a)}>Edit</button>
                <button onClick={handleOpen}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteConfirm
        isOpen={showConfirm}
        onClose={handleClose}
        onConfirm={handleClose}
      />
    </>
  );
}

export default AdventurerJobPage;
