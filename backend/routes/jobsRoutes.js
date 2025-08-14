const router = require('express').Router();
const jobsModel = require('../models/jobsModel');

// Job SELECT query, pull table data.
router.get('/jobs', async (req, res) => {
  const allJobs = await jobsModel.getAllJobs();
  if ('Error' in allJobs) {
    //Generic error code.
    res.status(500).send(err.Error);
  } else {
    // Send results to frontend.
    res.status(200).json({ allJobs });
  }
});

//Update a Job.
router.put('/jobs/:id', async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  const {
    job_opener_first_name,
    job_opener_last_name,
    job_rank,
    job_location,
    job_still_open,
    job_point_value,
    completion_payout,
  } = req.body;

  const err = await jobsModel.updateJob(
    jobId,
    job_opener_first_name,
    job_opener_last_name,
    job_rank,
    job_location,
    job_still_open,
    job_point_value,
    completion_payout,
  );

  if (err) {
    res.status(err.status).json(err.Error);
  } else {
    res.status(200).json({ message: 'Job updated successfully' });
  }
});

// Delete a Job.
router.delete('/jobs/:id', async (req, res) => {
  const jobId = req.params.id;

  const err = await jobsModel.deleteJob(jobId);

  if (err) {
    res.status(err.status).json(err.Error);
  } else {
    res.status(200).json({ message: 'Job deleted successfully' });
  }
});

// Add a Job.
router.post('/jobs', async (req, res) => {
  const {
    job_opener_first_name,
    job_opener_last_name,
    job_rank,
    job_location,
    job_still_open,
    job_point_value,
    completion_payout,
  } = req.body;

  const err = await jobsModel.createJob(
    job_opener_first_name,
    job_opener_last_name,
    job_rank,
    job_location,
    job_still_open,
    job_point_value,
    completion_payout,
  );

  if (err) {
    res.status(500).send(err.Error);
  } else {
    res.status(201).json({ message: 'Job created' });
  }
});

module.exports = router;
