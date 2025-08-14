import React, { useEffect, useState, useCallback } from 'react';
import AdventurerJobEditForm from '../components/AdventurerJobEditForm';
import AdventurerJobCreateForm from '../components/AdventurerJobCreateForm';
import DeleteConfirm from '../components/DeleteConfirm';
import { useParams } from 'react-router-dom';

function AdventurerJobPage({ backendURL }) {
  //If we call AdventurerJobPage from AdventurerPage
  //Otherwise we need a dropdown list of adventurer names
  const { id: paramId } = useParams();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedIds, setSelectedIds] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [isPaymentTransferred, setIsPaymentTransferred] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [full_aj_table, set_full_aj_table] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [allAdventurers, setAllAdventurers] = useState([]);
  const [selectedAdventurer, setSelectedAdventurer] = useState('');

  const getData = useCallback(
    async function () {
      try {
        //Get reqeust for adventure's jobs query.
        const response = await fetch(backendURL + '/adventurerJobs');

        //Convert response into JSON format
        const { aj_table } = await response.json();

        //Update job state with response data.
        set_full_aj_table(aj_table[0]);
      } catch (error) {
        //IF  API call fails
        console.log(error);
      }

      try {
        //Get reqeust for jobs query.
        const response = await fetch(backendURL + '/jobs');

        //Convert response into JSON format
        const { allJobs } = await response.json();

        //Update job state with response data.
        setAllJobs(
          allJobs.map((aj) => ({
            job_opener: aj.job_opener_first_name + aj.job_opener_last_name,
            job_ID: aj.job_ID,
          })),
        );
      } catch (error) {
        //IF  API call fails
        console.log(error);
      }

      try {
        //Get reqeust for jobs query.
        const response = await fetch(backendURL + '/adventurers');

        //Convert response into JSON format
        const { allAdvens } = await response.json();

        //Update job state with response data.
        setAllAdventurers(
          allAdvens.map((aa) => ({
            adventurer: aa.first_name + aa.last_name,
            adventurer_ID: aa.adventurer_ID,
          })),
        );
      } catch (err) {
        //IF  API call fails
        console.log(err);
      }
    },
    [backendURL],
  );

  const getOneAdventurerData = useCallback(
    async function (id) {
      try {
        //Get reqeust for adventure's jobs query.
        const response = await fetch(backendURL + '/adventurerJobs/' + id);

        //Convert response into JSON format
        const { aj_table } = await response.json();

        //Update job state with response data.
        set_full_aj_table(aj_table[0]);
      } catch (error) {
        //IF  API call fails
        console.log(error);
      }
    },
    [backendURL],
  );

  //Use paramId to filter full datatable to only selected adventurers.
  useEffect(() => {
    if (paramId) {
      // Load only one adventurer's data if paramId is not empty
      getOneAdventurerData(paramId);
    } else {
      // if no param, load full data table into viewing table.
      getData();
    }
  }, [paramId, getData, getOneAdventurerData]);

  const handleEditSubmit = (adventurer_data) => {
    setSelectedIds({
      adventurer_ID: adventurer_data.adventurer_ID,
      job_ID: adventurer_data.job_ID,
    });
    setSelectedAdventurer(adventurer_data.adventurer);
    setIsCompleted(adventurer_data.adventurer_completed_job);
    setIsTracking(adventurer_data.adventurer_currently_tracking_job);
    setIsPaymentTransferred(adventurer_data.completion_payment_transfered);
    setShowEditForm(true);
  };

  const handleOpen = (adventurer_ID, job_ID) => {
    setSelectedIds({
      adventurer_ID,
      job_ID,
    });
    setShowConfirm(true);
  };

  const handleClose = async (isConfirmed) => {
    if (isConfirmed) {
      try {
        const response = await fetch(backendURL + '/adventurerJobs', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...selectedIds,
          }),
        });
        if (response.ok) {
          dataReload();
        }
      } catch (err) {
        //IF  API call fails
        console.log(err);
      }
    }
    setSelectedIds({});
    setShowConfirm(false);
  };

  //Reload the page to the full data set.
  //Refetch data and then reload. Can be used after edit or delete
  const dataReload = async () => {
    getData();
  };

  return (
    <>
      <h2>Adventurer Job Page</h2>

      {showEditForm && (
        <AdventurerJobEditForm
          setShowEditForm={setShowEditForm}
          adventurer={selectedAdventurer}
          allJobs={allJobs}
          adventurerJobIds={selectedIds}
          backendURL={backendURL}
          isCompleted={isCompleted}
          isTracking={isTracking}
          isPaymentTransferred={isPaymentTransferred}
          dataReload={dataReload}
        />
      )}
      {!showCreateForm ? (
        <button onClick={() => setShowCreateForm(true)}>
          Create Adventurer Job
        </button>
      ) : (
        <AdventurerJobCreateForm
          setShowCreateForm={setShowCreateForm}
          allJobs={allJobs}
          allAdventurers={allAdventurers}
          backendURL={backendURL}
          dataReload={dataReload}
        />
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
          {full_aj_table.map((a) => (
            <tr key={a.adventurer_ID + '-' + a.job_ID}>
              <td>{a.adventurer}</td>
              <td>{a.job_opener}</td>
              <td>{a.adventurer_completed_job == 1 ? 'Yes' : 'No'}</td>
              <td>{a.adventurer_currently_tracking_job == 1 ? 'Yes' : 'No'}</td>
              <td>{new Date(a.aj_last_update).toLocaleString()}</td>
              <td>{a.completion_payment_transfered == 1 ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEditSubmit(a)}>Edit</button>
                <button onClick={() => handleOpen(a.adventurer_ID, a.job_ID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteConfirm
        isOpen={showConfirm}
        onClose={() => handleClose(false)}
        onConfirm={() => handleClose(true)}
        selectedIds={selectedIds}
      />
    </>
  );
}

export default AdventurerJobPage;
