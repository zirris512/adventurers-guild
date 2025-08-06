import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdventurerForm from '../components/AdventurerForm';

function AdventurerPage({backendURL}) {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [allAdvens, setAdvens] = useState([]);

  const getData = async function() {
    try{
      //Get reqeust for Adventures query.
      const response = await fetch(backendURL + '/adventurers');

      //Convert response into JSON format
      const {allAdvens} = await response.json();

      //Update job state with response data.
      setAdvens(allAdvens);

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
      <h2>Adventurers</h2>
      <p>CRUD Operations: Create</p>

      {/* Button Toggle for AdventurerForm to add a new adventurer. */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Adventurer'}
      </button>

      {showForm && <AdventurerForm />}

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Rank</th>
            <th>Active?</th>
            <th>Last Update</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allAdvens.map((a) => (
            <tr key={a.adventurer_ID}>
              <td>{a.first_name}</td>
              <td>{a.last_name}</td>
              <td>{a.universal_telephone_number}</td>
              <td>{a.adventurer_rank}</td>
              <td>{a.adventurer_is_active ? 'Yes' : 'No'}</td>
              <td>{new Date(a.a_last_update).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => navigate(`/adventurerJob/${a.adventurer_ID}`)}
                >
                  View All Jobs
                </button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdventurerPage;
