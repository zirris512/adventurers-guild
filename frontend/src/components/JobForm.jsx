/*-- Citation for the following code: Job Form
-- Date: 2025-08-05\2025-08-12
-- Adapted from Exploration web app technology.
-- AI was used to help review the code for syntax errors after an initial implementation and for general referencing.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions when needed. 
 */  
import React, {useState, useEffect} from 'react';

function JobForm({backendURL, onJobAdded}) {
  //Variable States for new job
  const [jobOpenerFirstName, setJobOpenerFirstName] = useState('');
  const [jobOpenerLastName, setJobOpenerLastName] = useState('');
  const [jobRank, setJobRank] = useState('F');  // default to 'F'
  const [jobLocation, setJobLocation] = useState('');
  const [jobStillOpen, setJobStillOpen] = useState(true);
  const [jobPointValue, setJobPointValue] = useState('');
  const [completionPayout, setCompletionPayout] = useState('');  

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

  //Submit handler.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data to be sent. 
    const payload = {
      job_opener_first_name: jobOpenerFirstName,
      job_opener_last_name: jobOpenerLastName,
      job_rank: jobRank,
      job_location: jobLocation,
      job_still_open: jobStillOpen,
      job_point_value: Number(jobPointValue),
      completion_payout: completionPayout,
    };

    try {
      const response = await fetch(`${backendURL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to add job');
      }

      alert('Job added successfully!');

      // Clear forms
      setJobOpenerFirstName('');
      setJobOpenerLastName('');
      setJobRank('F');
      setJobLocation('');
      setJobStillOpen(true);
      setJobPointValue('');
      setCompletionPayout('');

      // Refresh list
      onJobAdded();

    } catch (error) {
      console.error('Error adding job:', error);
      alert('Error adding job');
    }
  };

return (
  <form onSubmit={handleSubmit}>
    <h3>Add New Job</h3>

    <label>
      Opener First Name:
      <input
        type="text"
        value={jobOpenerFirstName}
        onChange={(e) => setJobOpenerFirstName(e.target.value)}
        placeholder="e.g. Lysa"
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
        placeholder="e.g. Fairwind"
        required
      />
    </label>
    <br />

    <label>
      Rank:
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
        required
      >
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
      Job Still Open:
      <select
        value={jobStillOpen.toString()}
        onChange={(e) => setJobStillOpen(e.target.value === 'true')}
        required
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </label>
    <br />

    <label>
      Point Value:
      <input
        type="number"
        value={jobPointValue}
        onChange={(e) => setJobPointValue(e.target.value)}
        placeholder="e.g. 10"
        required
        min="0"
      />
    </label>
    <br />

    <label>
      Completion Payout:
      <input
        type="text"
        value={completionPayout}
        onChange={(e) => setCompletionPayout(e.target.value)}
        placeholder="e.g. 50 gold"
        required
      />
    </label>
    <br />

    <button type="submit">Submit</button>
    <br />
  </form>
);
}

export default JobForm;
