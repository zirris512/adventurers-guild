const db = require('../database/db-connector');

const getAllJobs = async () => {
  //Create and execute job SELECT query for general page population.
  const jobsQuery = `SELECT 
                    j.job_ID,
                    j.job_opener_first_name,
                    j.job_opener_last_name,
                    j.job_rank,
                    j.job_location,
                    CONCAT(l.solar_system, ' (', l.celestial_body_name, ')') AS job_location_name,
                    j.job_still_open,
                    j.job_created_at,
                    j.j_last_update,
                    j.job_point_value,
                    j.completion_payout
                FROM Jobs j
                JOIN Locations l ON j.job_location = l.location_ID;`;
  try {
    const [allJobs] = await db.query(jobsQuery);
    return allJobs;
  } catch (err) {
    console.error('Error executing Jobs query:', err);
    return {
      Error: 'An error occurred while executing the Jobs database query.',
    };
  }
};

const updateJob = async (
  jobId,
  job_opener_first_name,
  job_opener_last_name,
  job_rank,
  job_location,
  job_still_open,
  job_point_value,
  completion_payout,
) => {
  try {
    const [result] = await db.query('CALL UpdateJob(?, ?, ?, ?, ?, ?, ?, ?)', [
      jobId,
      job_opener_first_name,
      job_opener_last_name,
      job_rank,
      job_location,
      job_still_open,
      job_point_value,
      completion_payout,
    ]);

    if (result.affectedRows === 0) {
      return { status: 404, Error: 'Job not found' };
    }
  } catch (err) {
    console.error('Error updating job:', err);
    return { status: 500, Error: 'An error occurred while updating the job.' };
  }
};

const deleteJob = async (jobId) => {
  const deleteJobQuery = `DELETE FROM Jobs WHERE job_ID = ?;`;

  try {
    const [result] = await db.query(deleteJobQuery, [jobId]);

    if (result.affectedRows === 0) {
      return { status: 404, Error: 'Job not found' };
    }
  } catch (err) {
    console.error('Error deleting job:', err);
    return { status: 500, Error: 'An error occurred while deleting the job.' };
  }
};

const createJob = async (
  job_opener_first_name,
  job_opener_last_name,
  job_rank,
  job_location,
  job_still_open,
  job_point_value,
  completion_payout,
) => {
  try {
    // Call stored procedure
    await db.query('CALL AddJob(?, ?, ?, ?, ?, ?, ?)', [
      job_opener_first_name,
      job_opener_last_name,
      job_rank,
      job_location,
      job_still_open,
      job_point_value,
      completion_payout,
    ]);
  } catch (err) {
    console.error('Error creating job:', err);
    return { Error: 'Error creating job' };
  }
};

module.exports = { getAllJobs, updateJob, deleteJob, createJob };
