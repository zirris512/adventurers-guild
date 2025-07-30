import React, { useEffect, useState } from 'react';
import LocationForm from '../components/LocationForm';

function LocationPage() {

    const [showForm, setShowForm] = useState(false);
    const locations = [
        {
        solar_system: 'Epsilon Eridani',
        celestial_body_name: 'Epsilon III',
        target_latitude: '45.678N',
        target_longitude: '120.456E',
        },
        {
        solar_system: 'Alpha Centauri',
        celestial_body_name: 'Alpha B2',
        target_latitude: '33.210S',
        target_longitude: '75.900W',
        },
        {
        solar_system: 'Sol',
        celestial_body_name: 'Mars',
        target_latitude: '15.000N',
        target_longitude: '100.000E',
        },
    ];

  return (
    <div>
        <h2>Relevant Locations</h2>
        <p>CRUD Operations: Create, Read</p>


        <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Location'}
        </button>

        {showForm && <LocationForm />}


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
          {locations.map((loc, index) => (
            <tr key={index}>
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
