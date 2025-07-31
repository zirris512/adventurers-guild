import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AdventurerJobPage() {

  //If we call AdventurerJobPage from AdventurerPage
  //Otherwise we need a dropdown list of adventurer names
  const { id: paramId } = useParams();


  return (
    <>
      <h2>Adventurer Job Page</h2>
      <p>This page will show active jobs for each adventurer.</p>
      <p><strong>Selected Adventurer ID:</strong> {paramId}</p>
    </>
  );
}

export default AdventurerJobPage;
