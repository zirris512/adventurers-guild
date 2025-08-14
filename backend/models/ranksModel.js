const db = require('../database/db-connector');

const getRanks = async () => {
  const rankQuery = 'SELECT * FROM Ranks;';
  try {
    //Create and execute job SELECT query for general page population.

    const [allRanks] = await db.query(rankQuery);

    return allRanks;
  } catch (error) {
    console.error('Error executing Ranks query:', error);
    return {
      Error: 'An error occurred while executing the allRanks database query.',
    };
  }
};

module.exports = { getRanks };
