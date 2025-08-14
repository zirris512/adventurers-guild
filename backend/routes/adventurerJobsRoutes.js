const router = require('express').Router();
const adventurerJobsModel = require('../models/adventurerJobsModel');

//Adventurer_Jobs SELECT Query, pull table data.
router.get('/adventurerJobs', async (req, res) => {
  const aj_table = await adventurerJobsModel.getAllAdventurerJobs();
  if ('Error' in aj_table) {
    res
      .status(500)
      .send('An error occurred while executing the ajQuery database query.');
  } else {
    // Send results to frontend.
    res.status(200).json({ aj_table });
  }
});

// Get a single adventurer's job data
router.get('/adventurerJobs/:id', async (req, res) => {
  //Create and execute job SELECT query for general page population.
  const paramId = req.params.id;
  const aj_table = await adventurerJobsModel.getOneAdventurerJobs(paramId);
  if ('Error' in aj_table) {
    res
      .status(500)
      .send('An error occurred while executing the ajQuery database query.');
  } else {
    // Send results to frontend.
    res.status(200).json({ aj_table });
  }
});

// Create a new link between an adventurer and a job
router.post('/adventurerJobs', async (req, res) => {
  const { adventurer_ID, job_ID } = req.body;
  const err = await adventurerJobsModel.createAdventurerJob(
    adventurer_ID,
    job_ID,
  );
  if (err) {
    res.status(500).send(err.Error);
  } else {
    res.status(200).json({ message: 'Successfully created adventurer job.' });
  }
});

// Delete a single adventurer's job from Adventurer_Jobs
router.delete('/adventurerJobs', async (req, res) => {
  const { adventurer_ID, job_ID } = req.body;
  const err = await adventurerJobsModel.deleteAdventurerJob(
    adventurer_ID,
    job_ID,
  );
  if (err) {
    //Generic error code.
    res.status(err.status).send(err.Error);
  } else {
    res.status(200).json({ message: 'Successfully deleted adventurer job.' });
  }
});

// Update a single adventurer's data
router.put('/adventurerJobs', async (req, res) => {
  const {
    adventurer_ID,
    job_ID,
    updated_job_ID,
    adventurer_completed_job,
    adventurer_currently_tracking_job,
    completion_payment_transfered,
  } = req.body;

  const err = await adventurerJobsModel.updateAdventurerJob(
    adventurer_ID,
    job_ID,
    updated_job_ID,
    adventurer_completed_job,
    adventurer_currently_tracking_job,
    completion_payment_transfered,
  );

  if (err) {
    //Generic error code.
    res.status(err.status).send(err.Error);
  } else {
    res.status(200).json({ message: 'Successfully updated row.' });
  }
});

module.exports = router;
