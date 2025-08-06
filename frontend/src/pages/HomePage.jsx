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
            <button onClick={handleOpen}>Reset Database</button>
            <ResetConfirm
              isOpen={showConfirm}
              onClose={handleClose}
              onConfirm={dbReset}/>
        </>
    );
}

export default HomePage;