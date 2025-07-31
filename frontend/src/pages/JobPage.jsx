import React, {useEffect, useState} from 'react';
import JobForm from '../components/JobForm.jsx';

function JobPage() {
  const [showForm, setShowForm] = useState(false);
  const allJobs = [ 
{
      job_ID: 1,
      job_opener_first_name: 'Lysa',
      job_opener_last_name: 'Fairwind',
      job_rank: 'F',
      job_location: 1,
      job_still_open: true,
      job_created_at: '2025-07-01',
      j_last_update: '2025-07-01',
      job_point_value: 5,
      completion_payout: '25 gold'
    },
    {
      job_ID: 2,
      job_opener_first_name: 'Torin',
      job_opener_last_name: 'Blacksteel',
      job_rank: 'F',
      job_location: 2,
      job_still_open: true,
      job_created_at: '2025-07-02',
      j_last_update: '2025-07-02',
      job_point_value: 15,
      completion_payout: '45 gold'
    },
    {
      job_ID: 3,
      job_opener_first_name: 'Ilya',
      job_opener_last_name: 'Brightstar',
      job_rank: 'F',
      job_location: 3,
      job_still_open: false,
      job_created_at: '2025-07-03',
      j_last_update: '2025-07-03',
      job_point_value: 10,
      completion_payout: '120 gold'
    },
    {
      job_ID: 4,
      job_opener_first_name: 'Eldon',
      job_opener_last_name: 'Stoneshaper',
      job_rank: 'F',
      job_location: 1,
      job_still_open: false,
      job_created_at: '2025-07-04',
      j_last_update: '2025-07-04',
      job_point_value: 5,
      completion_payout: '30 gold'
    }
  ];

  return (
    <div>
      <h2>Jobs</h2>
      <p>CRUD Operations: Create, Read</p>
      
      {/* Button Toggle for JobForm to add a new job. */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Job'}
      </button>

      {showForm && <JobForm/>}

      <table>
        <thead>
          <tr>
            <th>Opener Name</th>
            <th>Rank</th>
            <th>Location ID</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Last Update</th>
            <th>Points</th>
            <th>Payout</th>
          </tr>
        </thead>
        <tbody>
          {allJobs.map((job) => (
            <tr key={job.job_ID}>
              <td>{job.job_opener_first_name} {job.job_opener_last_name}</td>
              <td>{job.job_rank}</td>
              <td>{job.job_location}</td>
              <td>{job.job_still_open ? 'Open' : 'Closed'}</td>
              <td>{job.job_created_at}</td>
              <td>{job.j_last_update}</td>
              <td>{job.job_point_value}</td>
              <td>{job.completion_payout}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobPage;