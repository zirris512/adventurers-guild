/*-- Citation for the following code: Adventurer Page
-- Date: 2025-08-05\2025-08-12
-- Adapted from Exploration web app technology.
-- Skeleton code was used as a base and all functions are original.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions. It was also used to help troubleshoot and assist in creating
-- the button toggle used in the forms. Clarifying questions were references to the react and JS manuals for methods and explanations. 
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdventurerForm from '../components/AdventurerForm';
import AdventurerEditForm from '../components/AdventurerEditForm';

function AdventurerPage({backendURL}) {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [allAdvens, setAdvens] = useState([]);
  const [editAdventurer, setEditAdventurer] = useState(null);

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
      {/* Button Toggle for AdventurerForm to add a new adventurer. */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Adventurer'}
      </button>

      {showForm && <AdventurerForm backendURL = {backendURL} onAdventurerAdded = {getData}/>}
      {editAdventurer && (<AdventurerEditForm 
          backendURL = {backendURL} 
          adventurer = {editAdventurer} 
          onClose={() => setEditAdventurer(null)}
          onUpdated={getData} />)}

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Rank</th>
            <th>Active?</th>
            <th>Last Update</th>
            <th>Total Points</th>
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
              <td>{a.total_points}</td>
              <td>
                <button onClick={() => navigate(`/adventurerJob/${a.adventurer_ID}`)}>View All Jobs</button>{' '}
                <button onClick={()=> setEditAdventurer(a)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdventurerPage;
