import React, {useEffect, useState} from 'react';

 function HomePage(){
    const [currentDate, setCurrentDate] = useState('');

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

    //The return
    return(
        <>
            <h2>Home Page</h2>
            <h2> Todays Date: {currentDate} </h2>
        </>
    );
}

export default HomePage;