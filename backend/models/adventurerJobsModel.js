const db = require('../database/db-connector');

const getAllAdventurerJobs = async () => {
  try {
    //Create and execute job SELECT query for general page population.

    const ajQuery = `CALL GetAllAdventurerJobs()`;
    const [aj_table] = await db.query(ajQuery);

    // Send results to frontend.
    return aj_table;
  } catch (err) {
    console.error('Error executing Adventurer Jobs query:', error);
    return { Error: err };
  }
};

const getOneAdventurerJobs = async (id) => {
  const ajQuery = `CALL GetOneAdventurerJobs(?)`;
  try {
    const [aj_table] = await db.query(ajQuery, [id]);

    return aj_table;
  } catch (err) {
    console.err('Error executing Adventurer Jobs query:', error);
    return { Error: err };
  }
};

const createAdventurerJob = async (adventurer_ID, job_ID) => {
  try {
    // Update adventurer job given the adventurer_ID and job_ID
    const createQuery = 'CALL CreateAdventurerJob(?, ?)';
    await db.query(createQuery, [adventurer_ID, job_ID]);
  } catch (err) {
    console.error('Error executing Create query:', err);
    return {
      Error:
        'An error occurred while inserting into the Adventurer_Jobs database.',
    };
  }
};

const deleteAdventurerJob = async (adventurer_ID, job_ID) => {
  try {
    // Update adventurer job given the adventurer_ID and job_ID
    const createQuery = 'CALL DeleteAdventurerJob(?, ?)';
    const [result] = await db.query(createQuery, [adventurer_ID, job_ID]);

    if (result.affectedRows === 0) {
      return { status: 404, Error: 'Adventurer Job not found' };
    }
    // Send results to frontend.
  } catch (err) {
    console.error('Error executing Delete query:', err);
    return {
      status: 500,
      Error:
        'An error occurred while deleting from the Adventurer_Jobs database query.',
    };
  }
};

const updateAdventurerJob = async (
  adventurer_ID,
  job_ID,
  updated_job_ID,
  adventurer_completed_job,
  adventurer_currently_tracking_job,
  completion_payment_transfered,
) => {
  try {
    // Update adventurer job given the adventurer_ID and job_ID
    const updateQuery = 'CALL UpdateAdventurerJob(?, ?, ?, ?, ?, ?)';
    const [result] = await db.query(updateQuery, [
      adventurer_ID,
      job_ID,
      updated_job_ID,
      adventurer_completed_job,
      adventurer_currently_tracking_job,
      completion_payment_transfered,
    ]);
    if (result.affectedRows === 0) {
      return { status: 404, Error: 'Adventurer Job not found.' };
    }
  } catch (err) {
    console.error('Error executing Update query:', err);
    return {
      status: 500,
      Error:
        'An error occurred while updated the Adventurer_Jobs database query.',
    };
  }
};

module.exports = {
  getAllAdventurerJobs,
  getOneAdventurerJobs,
  createAdventurerJob,
  deleteAdventurerJob,
  updateAdventurerJob,
};
