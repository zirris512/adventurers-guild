/*-- Citation for the following code: JobEditForm
-- Date: 2025-08-11
-- Adapted from Exploration web app technology.
-- AI was used to help review the code for syntax errors after an initial implementation and for general referencing.
-- It was also used to help generate the handleChange function due to issues in the initial setup. 
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions when needed. 
-- It was also used to help build handlesubmit function due to improper formatting and syntax. 
-- General assistance was asked for references to the react and JS manuals. It also gave suggestions to
-- simplify the code for brevity like naming conventions.
 */ 
import React, { useState, useEffect } from 'react';

function JobEditForm({ backendURL, job, onClose, onUpdated }) {
  // Separate state for each field
  const [jobOpenerFirstName, setJobOpenerFirstName] = useState(job.job_opener_first_name);
  const [jobOpenerLastName, setJobOpenerLastName] = useState(job.job_opener_last_name);
  const [jobRank, setJobRank] = useState(job.job_rank);
  const [jobLocation, setJobLocation] = useState(job.job_location);
  const [jobStillOpen, setJobStillOpen] = useState(job.job_still_open);
  const [jobPointValue, setJobPointValue] = useState(job.job_point_value);
  const [completionPayout, setCompletionPayout] = useState(job.completion_payout);

  //data from locations and ranks table.
  const [locations, setLocations] = useState([]);
  const [ranks, setRanks] = useState([]);
  
  //Get locations data.
  useEffect(() => {
    const getLocations = async () => {
      try {
        const res = await fetch(`${backendURL}/locations`);
        const data = await res.json();
        setLocations(data.allLocations);
      } catch (error) {
        console.error('Failed to get locations:', error);
      }
    };
    getLocations();
  }, [backendURL]);  
  
  //Get ranks data.
  useEffect(() => {
    const getRanks = async () => {
      try {
        const res = await fetch(`${backendURL}/ranks`);
        const data = await res.json();
        setRanks(data.allRanks);
      } catch (error) {
        console.error('Failed to get all ranks', error);
      }
    };
    getRanks();
  }, [backendURL]);

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
          <select
            value={jobRank}
            onChange={(e) => setJobRank(e.target.value)}
            required
          >
            <option value="">-- Select a Rank --</option>
            {ranks.map((rank) => (
              <option key={rank.rank_ID} value={rank.rank_ID}>
                {rank.rank_ID}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Job Location:
          <select
          value={jobLocation}
          onChange={(e) => setJobLocation(e.target.value)}
          required>
          <option value="">-- Select a location --</option>
          {locations.map((loc) => (
            <option key={loc.location_ID} value={loc.location_ID}>
              {loc.celestial_body_name} ({loc.solar_system})
            </option>
          ))}
        </select>
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

