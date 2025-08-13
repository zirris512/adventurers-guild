/*-- Citation for the following code: Nathaniel Dziuba
-- Date: 2025-08-12
-- Adapted from Exploration web app technology.
-- AI was used to help review the code for syntax errors after an initial implementation and for general referencing.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions when needed. 
-- It was also used as a reference guide for React and JS.
 */  

import React, { useState, useEffect } from 'react';

function AdventurerForm({ backendURL, onAdventurerAdded }) {
  // Form states for each variable.
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [rank, setAdventurerRank] = useState('F'); 
  const [isActive, setIsActive] = useState(true);

  // Data from ranks table
  const [ranks, setRanks] = useState([]);

  // Get ranks data
  useEffect(() => {
    const getRanks = async () => {
      try {
        const res = await fetch(`${backendURL}/ranks`);
        const data = await res.json();
        setRanks(data.allRanks);
      } catch (error) {
        console.error('Failed to get ranks:', error);
      }
    };
    getRanks();
  }, [backendURL]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      first_name: firstName,
      last_name: lastName,
      universal_telephone_number: phone,
      adventurer_rank: rank,
      adventurer_is_active: isActive
    };

    try {
      const response = await fetch(`${backendURL}/adventurers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to add adventurer');
      }

      alert('Adventurer added successfully!');

      // Clear form
      setFirstName('');
      setLastName('');
      setPhone('');
      setAdventurerRank('F');
      setIsActive(true);

      // Refresh list
      onAdventurerAdded();

    } catch (error) {
      console.error('Error adding adventurer:', error);
      alert('Error adding adventurer');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Adventurer</h3>

      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="e.g. Aria"
          required
        />
      </label>
      <br />

      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="e.g. Thorne"
          required
        />
      </label>
      <br />

      <label>
        Phone Number:
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. 104-121-2428"
          required
        />
      </label>
      <br />

      <label>
        Rank:
        <select
          value={rank}
          onChange={(e) => setAdventurerRank(e.target.value)}
          required>

          <option value="">-- Select a Rank --</option>
          {ranks.map((r) => (
            <option key={r.rank_ID} value={r.rank_ID}>
              {r.rank_ID}
            </option>
          ))}
        </select>
      </label>
      <br />

      <label>
        Is Active?:
        <select
          value={isActive.toString()}
          onChange={(e) => setIsActive(e.target.value === 'true')}
          required
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>
      <br />

      <button type="submit">Submit</button>
      <br />
    </form>
  );
}

export default AdventurerForm;
