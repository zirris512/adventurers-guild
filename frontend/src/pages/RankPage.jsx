import React, { useEffect, useState } from 'react';

function RankPage({backendURL}) {
  const [allRanks, setRanks] = useState([]);
  
  const getData = async function() {
    try{
      //Get reqeust for Ranks query.
      const response = await fetch(backendURL + '/ranks');

      //Convert response into JSON format
      const {allRanks} = await response.json();

      //Update job state with response data.
      setRanks(allRanks);

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
      <h2>Rank Thresholds</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Threshold (Points)</th>
          </tr>
        </thead>
        <tbody>
          {allRanks.map((rank) => (
            <tr key={rank.rank_ID}>
              <td>{rank.rank_ID}</td>
              <td>{rank.rank_threshold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RankPage;
