import React from 'react';

function LocationForm() {
  return (
    <form>
      <h3>Add New Location (Mockup)</h3>

      <label>
        Solar System:
        <input type="text" placeholder="e.g. Epsilon Eridani" name = "solar_system_input"/>
      </label>
      <br />

      <label>
        Celestial Body:
        <input type="text" placeholder="e.g. Epsilon III" name = "celestial_body_name_input"/>
      </label>
      <br />

      <label>
        Latitude:
        <input type="text" placeholder="e.g. 45.678N"  name = "target_latitude_input"/>
      </label>
      <br />

      <label>
        Longitude:
        <input type="text" placeholder="e.g. 120.456E"  name = "target_longitude_input"/>
      </label>
      <br />

      <button type="button">
        Add Location (Disabled for Mockup)
      </button>
    </form>
  );
}

export default LocationForm;
