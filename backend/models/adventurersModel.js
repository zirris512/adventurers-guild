const db = require('../database/db-connector');

const getAdventurers = async () => {
  const advenQuery = `
                    SELECT 
                a.adventurer_ID,
                a.first_name,
                a.last_name,
                a.universal_telephone_number,
                a.adventurer_rank,
                a.adventurer_is_active,
                a.a_last_update,
                COALESCE(SUM(j.job_point_value), 0) AS total_points
            FROM Adventurers a
            LEFT JOIN Adventurer_Jobs aj 
                ON a.adventurer_ID = aj.adventurer_ID 
                AND aj.adventurer_completed_job = TRUE
            LEFT JOIN Jobs j 
                ON aj.job_ID = j.job_ID
            GROUP BY 
                a.adventurer_ID,
                a.first_name,
                a.last_name,
                a.universal_telephone_number,
                a.adventurer_rank,
                a.adventurer_is_active,
                a.a_last_update
            ORDER BY total_points DESC;`;
  try {
    const [allAdvens] = await db.query(advenQuery);
    return allAdvens;
  } catch (err) {
    return { Error: err };
  }

  // Send results to frontend.
};

const createAdventurer = async (
  first_name,
  last_name,
  universal_telephone_number,
  adventurer_rank,
  adventurer_is_active,
) => {
  //Call stored procedure
  try {
    await db.query(`CALL AddAdventurer(?, ?, ? , ? , ?)`, [
      first_name,
      last_name,
      universal_telephone_number,
      adventurer_rank,
      adventurer_is_active,
    ]);
  } catch (err) {
    return { Error: err };
  }
};

const updateAdventurer = async (
  adventurerId,
  first_name,
  last_name,
  universal_telephone_number,
  adventurer_rank,
  adventurer_is_active,
) => {
  const error = {};
  try {
    const [result] = await db.query('CALL UpdateAdventurer(?, ?, ?, ?, ?, ?)', [
      adventurerId,
      first_name,
      last_name,
      universal_telephone_number,
      adventurer_rank,
      adventurer_is_active,
    ]);

    if (result.affectedRows === 0) {
      error.status = 404;
      error.Error = 'Adventurer not found';
      return error;
    }
  } catch (error) {
    console.error('Error updating adventurer:', error);
    error.status = 500;
    error.Error = 'An error occurred while updating the adventurer.';
    return error;
  }
};

module.exports = { getAdventurers, createAdventurer, updateAdventurer };
