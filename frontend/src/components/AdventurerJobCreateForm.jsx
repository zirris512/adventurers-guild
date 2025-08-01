function AdventurerJobEditForm({ setShowCreateForm }) {
  const adventurer_data = [
    {
      adventurer_ID: 1,
      adventurer_name: 'Aria Thorne',
    },
    {
      adventurer_ID: 2,
      adventurer_name: 'Bren Stoneheart',
    },
    {
      adventurer_ID: 3,
      adventurer_name: 'Cyril Duskblade',
    },
  ];
  const job_data = [
    {
      job_ID: 1,
      job_name: 'Lysa Fairwind',
    },
    {
      job_ID: 2,
      job_name: 'Torin Blacksteel',
    },
    {
      job_ID: 3,
      job_name: 'Ilya Brightstar',
    },
    {
      job_ID: 4,
      job_name: 'Eldon Stoneshaper',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCreateForm(false);
  };

  return (
    <form>
      <label htmlFor="adventurer_id">Adventurer: </label>
      <select name="adventurer_id" id="adventurer_id">
        {adventurer_data.map((a) => (
          <option key={a.adventurer_ID} value={a.adventurer_ID}>
            {a.adventurer_name}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="job_id">Job: </label>
      <select name="adventurer_id" id="adventurer_id">
        {job_data.map((j) => (
          <option key={j.job_ID} value={j.job_ID}>
            {j.job_name}
          </option>
        ))}
      </select>
      <br />
      <button type="submit" onClick={handleSubmit}>
        Submit (Disabled for Mockup)
      </button>
    </form>
  );
}

export default AdventurerJobEditForm;
