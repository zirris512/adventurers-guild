import React from 'react';

function RankPage() {
  // Static rank data
  const rank = [
    { rank_ID: 'F', rank_threshold: 0 },
    { rank_ID: 'E', rank_threshold: 100 },
    { rank_ID: 'D', rank_threshold: 200 },
    { rank_ID: 'C', rank_threshold: 400 },
    { rank_ID: 'B', rank_threshold: 800 },
    { rank_ID: 'A', rank_threshold: 1600 },
  ];

  return (
    <div>
      <h2>Rank Thresholds</h2>
      <p>CRUD Operations: READ</p>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Threshold (Points)</th>
          </tr>
        </thead>
        <tbody>
          {rank.map((rank) => (
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
