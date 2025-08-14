/*-- Citation for the following code: Nathaniel Dziuba
-- Date: 2025-08-05
-- Adapted from Exploration web app technology.
-- AI was used to help review the code for syntax errors after an initial implementation. It was also used as a reference for javascript methods.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions. It was also used as a generic search engine for built in javascript
-- methods that could be used, such as the date modification method. 
 */
import ResetConfirm from '../components/ResetConfirm';
import React, {useEffect, useState} from 'react';


 function HomePage({backendURL}){
  const [currentDate, setCurrentDate] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const dbReset = async () => {
    
    try{
      const response = await fetch(backendURL + '/dbReset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "request": 'RESET_DB' }),
      });

      const data = await response.json();
      console.log('Reset Confirmed:', data);
      setShowConfirm(false);

    }catch(error){
      console.log("ERROR during reset:", error);
      setShowConfirm(false);
    }
  };

  useEffect(() => {
    const today = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const formattedDate = today.toLocaleDateString('en-US', options);
    setCurrentDate(formattedDate);
  }, []);

  const handleOpen = () => {
    setShowConfirm(true);
  };

  const handleClose = () => {
    setShowConfirm(false);
  };


    //The return
    return(
        <>
            <h2>Home Page</h2>
            <h2> Todays Date: {currentDate} </h2>
            <h2 class="homepage-page-title"> Job Board Page Descriptions</h2>
              <h3>Homepage: Page descriptions and location of database reset button.</h3>
              <h3>Adventurers Page: Record of adventurer's information.</h3>
              <h3>Active Adventurer's Jobs: Record of jobs accepted by adventurer's and thier outcomes.</h3>
              <h3>Jobs Page: Record of all jobs posted to the Guild.</h3>
              <h3> Ranks Page: All available ranks at this Guild and their point threshold. </h3>
              <h3>Locations Page: Record of all job site locations.</h3>
            <button onClick={handleOpen}>Reset Database</button>
            <ResetConfirm
              isOpen={showConfirm}
              onClose={handleClose}
              onConfirm={dbReset}/>
        </>
    );
}

export default HomePage;