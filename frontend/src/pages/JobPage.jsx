/*-- Citation for the following code: Nathaniel Dziuba
-- Date: 2025-08-05
-- Adapted from Exploration web app technology.
-- AI was used to help review the code for syntax errors after an initial implementation and for general referencing.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions such as JS and React reference manual material. 
 */ 
import React, { useState, useEffect } from 'react';
import JobForm from '../components/JobForm.jsx';
import JobEditForm from '../components/JobEditForm.jsx';


function JobPage({backendURL}) {
  const [showForm, setShowForm] = useState(false);
  const [editJob, setEditJob] = useState(null);
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

  //Handler for Job delete.
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await fetch(`${backendURL}/jobs/${id}`, { method: 'DELETE' });
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Jobs</h2>

      {/* Button Toggle for JobForm to add a new job. */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Job'}
      </button>

      {showForm && <JobForm backendURL={backendURL} onJobAdded={getData}/>}
      {editJob && (
        <JobEditForm
          backendURL={backendURL}
          job={editJob}
          onClose={() => setEditJob(null)}
          onUpdated={getData}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Opener Name</th>
            <th>Rank</th>
            <th>Location</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Last Update</th>
            <th>Points</th>
            <th>Payout</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allJobs.map((job) => (
            <tr key={job.job_ID}>
              <td>
                {job.job_opener_first_name} {job.job_opener_last_name}
              </td>
              <td>{job.job_rank}</td>
              <td>{job.job_location_name}</td>
              <td>{job.job_still_open ? 'Open' : 'Closed'}</td>
              <td>{new Date(job.job_created_at).toLocaleString()}</td>
              <td>{new Date(job.j_last_update).toLocaleString()}</td>
              <td>{job.job_point_value}</td>
              <td>{job.completion_payout}</td>
              <td>
                <button onClick={() => setEditJob(job)}>Edit</button>
                <button onClick={() => handleDelete(job.job_ID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobPage;
