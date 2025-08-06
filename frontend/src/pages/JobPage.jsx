import React, { useState, useEffect } from 'react';
import JobForm from '../components/JobForm.jsx';


function JobPage({backendURL}) {
  const [showForm, setShowForm] = useState(false);
  const [allJobs, setJobs] = useState([]);

  const getData = async function() {
    try{
      //Get reqeust for jobs query.
      const response = await fetch(backendURL + '/jobs');

      //Convert response into JSON format
      const {allJobs} = await response.json();

      //Update job state with response data.
      setJobs(allJobs);

    } catch (error){
      //IF  API call fails
      console.log(error);
    }
  };

  // Load data onto page
  useEffect(() => {
    getData();
  }, []);


  return (
    <div>
      <h2>Jobs</h2>

      {/* Button Toggle for JobForm to add a new job. */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Job'}
      </button>

      {showForm && <JobForm />}

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
              <td>
                {job.job_opener_first_name} {job.job_opener_last_name}
              </td>
              <td>{job.job_rank}</td>
              <td>{job.job_location}</td>
              <td>{job.job_still_open ? 'Open' : 'Closed'}</td>
              <td>{new Date(job.job_created_at).toLocaleString()}</td>
              <td>{new Date(job.j_last_update).toLocaleString()}</td>
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
