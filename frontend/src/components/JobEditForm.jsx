/*-- Citation for the following code: Nathaniel Dziuba
-- Date: 2025-08-11
-- Adapted from Exploration web app technology.
-- AI was used to help review the code for syntax errors after an initial implementation and for general referencing.
-- It was also used to help generate the handleChange function due to issues in the initial setup. 
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions. It was also used to help build hadnelChange function
-- due to improper formatting and syntax. General assistance was asked for it to give hits as to what needed to be done. It also gave suggestions to
-- simplify the code for brevity.
 */ 
import React, { useState } from 'react';

function JobEditForm({ backendURL, job, onClose, onUpdated }) {
  // Separate state for each field
  const [jobOpenerFirstName, setJobOpenerFirstName] = useState(job.job_opener_first_name);
  const [jobOpenerLastName, setJobOpenerLastName] = useState(job.job_opener_last_name);
  const [jobRank, setJobRank] = useState(job.job_rank);
  const [jobLocation, setJobLocation] = useState(job.job_location);
  const [jobStillOpen, setJobStillOpen] = useState(job.job_still_open);
  const [jobPointValue, setJobPointValue] = useState(job.job_point_value);
  const [completionPayout, setCompletionPayout] = useState(job.completion_payout);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      job_opener_first_name: jobOpenerFirstName,
      job_opener_last_name: jobOpenerLastName,
      job_rank: jobRank,
      job_location: jobLocation,
      job_still_open: jobStillOpen,
      job_point_value: Number(jobPointValue),
      completion_payout: completionPayout
    };

    try {
      await fetch(`${backendURL}/jobs/${job.job_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      onUpdated();
      onClose();
      alert("Job Updated Successfully!");
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div>
      <h3>Edit Job</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Opener First Name:
          <input
            type="text"
            value={jobOpenerFirstName}
            onChange={(e) => setJobOpenerFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </label>
        <br />

        <label>
          Opener Last Name:
          <input
            type="text"
            value={jobOpenerLastName}
            onChange={(e) => setJobOpenerLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </label>
        <br />

        <label>
          Job Rank:
          <input
            type="text"
            value={jobRank}
            onChange={(e) => setJobRank(e.target.value)}
            placeholder="Rank"
            required
          />
        </label>
        <br />

        <label>
          Job Location:
          <input
            type="number"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            placeholder="Location ID"
            required
          />
        </label>
        <br />

        <label>
          Is Job Still Open?:
          <input
            type="checkbox"
            checked={jobStillOpen}
            onChange={(e) => setJobStillOpen(e.target.checked)}
          />
        </label>
        <br />

        <label>
          Job Point Value:
          <input
            type="number"
            value={jobPointValue}
            onChange={(e) => setJobPointValue(e.target.value)}
            placeholder="Points"
            required
          />
        </label>
        <br />

        <label>
          Completion Payout:
          <input
            type="text"
            value={completionPayout}
            onChange={(e) => setCompletionPayout(e.target.value)}
            placeholder="Payout"
            required
          />
        </label>
        <br />

        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default JobEditForm;

