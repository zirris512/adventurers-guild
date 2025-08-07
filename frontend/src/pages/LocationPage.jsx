/*-- Citation for the following code: Nathaniel Dziuba
-- Date: 2025-08-05
-- Adapted from Exploration web app technology.
-- AI was used to help review the code for syntax errors after an initial implementation and for general referencing.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions. 
 */ 
import React, { useEffect, useState } from 'react';
import LocationForm from '../components/LocationForm';

function LocationPage({backendURL}) {
  const [showForm, setShowForm] = useState(false);
  const [allLocations, setLocations] = useState([]);

  const getData = async function() {
    try{
      //Get reqeust for jobs query.
      const response = await fetch(backendURL + '/locations');

      //Convert response into JSON format
      const {allLocations} = await response.json();

      //Update job state with response data.
      setLocations(allLocations);

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
        <h2>Relevant Locations</h2>

{/* Button Toggle for LocationForm to add a new Location. */}

        <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Location'}
        </button>

        {showForm && <LocationForm backendURL = {backendURL} refreshLocations = {getData} />}


      <table>
        <thead>
          <tr>
            <th>Solar System</th>
            <th>Celestial Body</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {allLocations.map((loc) => (
            <tr key={loc.location_id}>
              <td>{loc.solar_system}</td>
              <td>{loc.celestial_body_name}</td>
              <td>{loc.target_latitude}</td>
              <td>{loc.target_longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LocationPage;
