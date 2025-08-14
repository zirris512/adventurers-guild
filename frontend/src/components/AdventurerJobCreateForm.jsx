import { useState } from 'react';

function AdventurerJobCreateForm({
  setShowCreateForm,
  allJobs,
  allAdventurers,
  backendURL,
  dataReload,
}) {
  const [newAdventurerId, setNewAdventurerId] = useState(1);
  const [newJobId, setNewJobId] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(backendURL + '/adventurerJobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adventurer_ID: newAdventurerId,
          job_ID: newJobId,
        }),
      });
      if (response.ok) {
        dataReload();
      }
    } catch (err) {
      console.log(err);
    }
    setShowCreateForm(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="adventurer_id">Adventurer: </label>
      <select
        name="adventurer_id"
        id="adventurer_id"
        value={newAdventurerId}
        onChange={(e) => setNewAdventurerId(Number(e.target.value))}
      >
        {allAdventurers.map((a) => (
          <option key={a.adventurer_ID} value={a.adventurer_ID}>
            {a.adventurer}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="job_id">Job: </label>
      <select
        name="adventurer_id"
        id="adventurer_id"
        value={newJobId}
        onChange={(e) => setNewJobId(Number(e.target.value))}
      >
        {allJobs.map((j) => (
          <option key={j.job_ID} value={j.job_ID}>
            {j.job_opener}
          </option>
        ))}
      </select>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AdventurerJobCreateForm;
