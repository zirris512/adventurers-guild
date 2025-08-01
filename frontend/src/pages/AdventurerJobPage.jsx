import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function AdventurerJobPage() {
  const navigate = useNavigate();
  //If we call AdventurerJobPage from AdventurerPage
  //Otherwise we need a dropdown list of adventurer names
  const { id: paramId } = useParams();
  const [aj_table, set_aj_table] = useState([
    {
      adventurer_ID: 1,
      adventurer: 'Aria Thorne',
      job_ID: 1,
      adventurer_completed_job: 1,
      adventurer_currently_tracking_job: 0,
      aj_last_update: '2025-07-31 18:57:48',
      completion_payment_transfered: 1,
    },
    {
      adventurer_ID: 1,
      adventurer: 'Aria Thorne',
      job_ID: 4,
      adventurer_completed_job: 1,
      adventurer_currently_tracking_job: 0,
      aj_last_update: '2025-07-31 18:57:48',
      completion_payment_transfered: 1,
    },
    {
      adventurer_ID: 2,
      adventurer: 'Bren Stoneheart',
      job_ID: 2,
      adventurer_completed_job: 1,
      adventurer_currently_tracking_job: 0,
      aj_last_update: '2025-07-31 18:57:48',
      completion_payment_transfered: 1,
    },
    {
      adventurer_ID: 3,
      adventurer: 'Cyril Duskblade',
      job_ID: 3,
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

  return (
    <>
      <h2>Adventurer Job Page</h2>
      <table>
        <thead>
          <tr>
            <th>Adventurer</th>
            <th>Job ID</th>
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
              <td>{a.job_ID}</td>
              <td>{a.adventurer_completed_job == 1 ? 'Yes' : 'No'}</td>
              <td>{a.adventurer_currently_tracking_job == 1 ? 'Yes' : 'No'}</td>
              <td>{a.aj_last_update}</td>
              <td>{a.completion_payment_transfered == 1 ? 'Yes' : 'No'}</td>
              <td>
                <button
                  onClick={() => navigate(`/adventurerJob/${a.adventurer_ID}`)}
                >
                  View All Jobs
                </button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AdventurerJobPage;
