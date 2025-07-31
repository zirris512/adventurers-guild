import React from 'react';

function AdventurerForm() {
  return (
    <form>
      <h3>Add New Adventurer Form (Mockup)</h3>
      <label>
        First Name:
        <input 
        type="text" 
        placeholder="Enter first name" 
        name = "fname_input"
        />
      </label>
      <br />

      <label>
        Last Name:
        <input 
        type="text" 
        placeholder="Enter last name" 
        name = "lname_input"
        />
      </label>
      <br />

      <label>
        Phone Number:
        <input type="tel" placeholder="e.g. 123-456-7890" name = "tele_input"/>
      </label>
      <br />

      <label>
        Rank:
        <select>
          <option value="F">F</option>
          <option value="E">E</option>
          <option value="D">D</option>
          <option value="C">C</option>
          <option value="B">B</option>
          <option value="A">A</option>
          name = "a_rank"
        </select>
      </label>
      <br />

      <label>
        Is Active:
        <input type="checkbox" defaultChecked name = "a_status"/>
      </label>
      <br />

      <button type="submit">
        Submit (Disabled for Mockup)
      </button>
    </form>
  );
}

export default AdventurerForm;