/*-- Citation for the following code: AdventurerEditForm
-- Date: 2025-08-12
-- Adapted from Exploration web app technology.
-- AI was used to help review the code for syntax errors after an initial implementation and for general referencing.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions when needed. 
-- It was also used as a reference guide for React and JS.
 */ 
import React, { useState, useEffect } from 'react';

function AdventurerEditForm({ backendURL, adventurer, onClose, onUpdated }) {
  // Separate state for each field
  const [firstName, setFirstName] = useState(adventurer.first_name);
  const [lastName, setLastName] = useState(adventurer.last_name);
  const [phone, setPhone] = useState(adventurer.universal_telephone_number);
  const [rank, setRank] = useState(adventurer.adventurer_rank);
  const [isActive, setIsActive] = useState(adventurer.adventurer_is_active);

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

  //Submit handler
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
      const res = await fetch(`${backendURL}/adventurers/${adventurer.adventurer_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      onUpdated();
      onClose();
      if(res.status ===500){
        alert("Error:Could not update.")
      } else{
        alert("Adventurer Updated Successfully!");
    }
    } catch (error) {
      console.error("Error updating adventurer:", error);
    }
  };

  return (
    <div>
      <h3>Edit Adventurer</h3>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
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
            placeholder="Last Name"
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
            placeholder="Phone Number"
            required
          />
        </label>
        <br />

        <label>
          Rank:
            <select
            value={rank}
            onChange={(e) => setRank(e.target.value)}
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
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </label>
        <br />

        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default AdventurerEditForm;
