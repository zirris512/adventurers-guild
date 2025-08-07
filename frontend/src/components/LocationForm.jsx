/*-- Citation for the following code: Nathaniel Dziuba
-- Date: 2025-08-05
-- Adapted from Exploration web app technology.
-- AI was used to help review the code for syntax errors after an initial implementation and for general referencing.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions. 
 */  
import React, { useState } from 'react';

function LocationForm({ backendURL, refreshLocations }) {
  const [solarSystem, setSolarSystem] = useState('');
  const [celestialBody, setCelestialBody] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = async () => {
    const newLoc = {
      solar_system: solarSystem,
      celestial_body_name: celestialBody,
      target_latitude: latitude,
      target_longitude: longitude
    };

    try {
      const response = await fetch(backendURL + '/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLoc)
      });

      if (!response.ok) throw new Error('Failed to add location');

      refreshLocations();
      // Reset fields
      setSolarSystem('');
      setCelestialBody('');
      setLatitude('');
      setLongitude('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h3>Add New Location</h3>

      <label>
        Solar System:
        <input
          type="text"
          value={solarSystem}
          onChange={(e) => setSolarSystem(e.target.value)}
        />
      </label>
      <br />

      <label>
        Celestial Body:
        <input
          type="text"
          value={celestialBody}
          onChange={(e) => setCelestialBody(e.target.value)}
        />
      </label>
      <br />

      <label>
        Latitude:
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </label>
      <br />

      <label>
        Longitude:
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </label>
      <br />

      <button type="button" onClick={handleSubmit}>
        Add Location
      </button>
    </form>
  );
}

export default LocationForm;