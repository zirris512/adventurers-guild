import React, {useState} from 'react';

function JobForm() {

    const [selectedLocation, setSelectedLocation] = useState('');
    
    //This will link back to all possible job locations from the Location Page.
    //Static data is abbreviated. 
    const allLocations = [
    { location_ID: 1, name: 'Epsilon III (Epsilon Eridani)' },
    { location_ID: 2, name: 'Alpha B2 (Alpha Centauri)' },
    { location_ID: 3, name: 'Mars (Sol)' },
  ];

  return (
    <form>
      <h3>Add New Job (Mockup)</h3>

      <label>
        Opener First Name:
        <input type="text" name="job_opener_first_name_input" placeholder="e.g. Lysa" />
      </label>
      <br />

      <label>
        Opener Last Name:
        <input type="text" name="job_opener_last_name_input" placeholder="e.g. Fairwind" />
      </label>
      <br />

      <label>
        Rank:
        <select name="job_rank_input">
          <option value="F">F</option>
          <option value="E">E</option>
          <option value="D">D</option>
          <option value="C">C</option>
          <option value="B">B</option>
          <option value="A">A</option>
        </select>
      </label>
      <br />

     <label>
        Job Location:
        <select
          name="job_location_input"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">-- Select a location --</option>
          {allLocations.map((loc) => (
            <option key={loc.location_ID} value={loc.location_ID}>
              {loc.name}
            </option>
          ))}
        </select>
      </label>
      <br />

      <label>
        Job Still Open:
        <select name="job_still_open_input">
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </label>
      <br />

      <label>
        Point Value:
        <input type="number" name="job_point_value_input" placeholder="e.g. 10" />
      </label>
      <br />

      <label>
        Completion Payout:
        <input type="text" name="completion_payout_input" placeholder="e.g. 50 gold" />
      </label>
      <br />

      <button type="submit">
        Submit (Disabled for Mockup)
      </button>
      <br />
    </form>
  );
}

export default JobForm;
