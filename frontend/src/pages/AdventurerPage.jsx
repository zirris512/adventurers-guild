import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdventurerForm from '../components/AdventurerForm';

function AdventurerPage() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const adventurers = [
    {
      adventurer_ID: 1,
      first_name: 'Aria',
      last_name: 'Thorne',
      universal_telephone_number: '104-121-2428',
      adventurer_rank: 'F',
      adventurer_is_active: true,
      a_last_update: '2025-07-23 20:11:14',
    },
    {
      adventurer_ID: 2,
      first_name: 'Bren',
      last_name: 'Stoneheart',
      universal_telephone_number: '916-091-5393',
      adventurer_rank: 'F',
      adventurer_is_active: true,
      a_last_update: '2025-07-24 20:11:14',
    },
    {
      adventurer_ID: 3,
      first_name: 'Cyril',
      last_name: 'Duskblade',
      universal_telephone_number: '235-253-8300',
      adventurer_rank: 'F',
      adventurer_is_active: true,
      a_last_update: '2025-07-26 20:11:14',
    },
  ];

  return (
    <div>
      <h2>Adventurers</h2>
      <p>CRUD Operations: Create, Read</p>

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
          {adventurers.map((a, index) => (
            <tr key={index}>
              <td>{a.first_name}</td>
              <td>{a.last_name}</td>
              <td>{a.universal_telephone_number}</td>
              <td>{a.adventurer_rank}</td>
              <td>{a.adventurer_is_active ? 'Yes' : 'No'}</td>
              <td>{a.a_last_update}</td>
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
