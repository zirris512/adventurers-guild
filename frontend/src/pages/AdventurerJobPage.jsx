import React, { useEffect, useState } from 'react';
import AdventurerJobEditForm from '../components/AdventurerJobEditForm';
import AdventurerJobCreateForm from '../components/AdventurerJobCreateForm';
import DeleteConfirm from '../components/DeleteConfirm';
import { useParams, useNavigate } from 'react-router-dom';

function AdventurerJobPage({backendURL}) {
  //If we call AdventurerJobPage from AdventurerPage
  //Otherwise we need a dropdown list of adventurer names
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [isPaymentTransferred, setIsPaymentTransferred] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [aj_table, set_aj_table] = useState([]);
  const [full_aj_table, set_full_aj_table] = useState([]);

  const getData = async function() {
    try{
      //Get reqeust for adventure's jobs query.
      const response = await fetch(backendURL + '/adventurerJobs');

      //Convert response into JSON format
      const {aj_table} = await response.json();

      //Update job state with response data.
      set_full_aj_table(aj_table);
      return aj_table;

    } catch (error){
      //IF  API call fails
      console.log(error);
      return [];
    }
  };
  
  // Load data onto page
  useEffect(() => {
    getData();
  }, []);

  //Use paramId to filter full datatable to only selected adventurers.
useEffect(() => {
  if (paramId) {
    // If param is present, load filtered data for storage and load viewing table (aj_table).
      const filtered_data = full_aj_table.filter(data => Number(data.adventurer_ID) === Number(paramId));
      set_aj_table(filtered_data);
    } else {
      // if no param, load full data table into viewing table.
      set_aj_table(full_aj_table);
    }
}, [paramId, full_aj_table]);


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

  //Reload the page to the full data set.
  //Refetch data and then reload. Can be used after edit or delete
  const dataReload = async () => {
    navigate('/adventurerJob/');
    const freshData = await getData();
    set_aj_table(freshData);
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
      <button onClick={dataReload}>Reload All Adventurers</button>
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
          {aj_table.map((a) => (
            <tr key={a.adventurer_ID + '-' + a.job_ID}>
              <td>{a.adventurer}</td>
              <td>{a.job_opener}</td>
              <td>{a.adventurer_completed_job == 1 ? 'Yes' : 'No'}</td>
              <td>{a.adventurer_currently_tracking_job == 1 ? 'Yes' : 'No'}</td>
              <td>{new Date(a.aj_last_update).toLocaleString()}</td>
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
