/*-- Citation for the following code: Nathaniel Dziuba
-- Date: 2025-08-05\2025-08-06
-- Adapted from Exploration Web Application Technology.
-- AI was used to help review the code for syntax errors after an initial implementation.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions. It was also used for troubleshooting
-- server issues where the server.js file was not being update properly on reload. Helped in troubleshooting how to insert the inputed variables from
-- the user into the query using prepared statements. */
// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: '*' }));
app.use(express.json()); // this is needed for post requests

const PORT = 10101;

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
// Job SELECT query, pull table data.
app.get('/jobs', async (req, res) => {
  try {
    //Create and execute job SELECT query for general page population.

    const jobsQuery = 'SELECT * FROM Jobs';
    const [allJobs] = await db.query(jobsQuery);

    // Send results to frontend.
    res.status(200).json({ allJobs });
  } catch (error) {
    console.error('Error executing Jobs query:', error);

    //Generic error code.
    res
      .status(500)
      .send('An error occurred while executing the Jobs database query.');
  }
});

//Location SELECT query, pull table data.
app.get('/locations', async (req, res) => {
  try {
    //Create and execute job SELECT query for general page population.

    const locationQuery = 'SELECT * FROM Locations;';
    const [allLocations] = await db.query(locationQuery);

    // Send results to frontend.
    res.status(200).json({ allLocations });
  } catch (error) {
    console.error('Error executing Locations query:', error);

    //Generic error code.
    res
      .status(500)
      .send('An error occurred while executing the Locations database query.');
  }
});

// Rank SELECT query, pull table data.
app.get('/ranks', async (req, res) => {
  try {
    //Create and execute job SELECT query for general page population.

    const rankQuery = 'SELECT * FROM Ranks;';
    const [allRanks] = await db.query(rankQuery);

    // Send results to frontend.
    res.status(200).json({ allRanks });
  } catch (error) {
    console.error('Error executing Ranks query:', error);

    //Generic error code.
    res
      .status(500)
      .send('An error occurred while executing the allRanks database query.');
  }
});

//Adventure's SELECT query, pull table data.
app.get('/adventurers', async (req, res) => {
  try {
    //Create and execute job SELECT query for general page population.

    const advenQuery = 'SELECT * FROM Adventurers;';
    const [allAdvens] = await db.query(advenQuery);

    // Send results to frontend.
    res.status(200).json({ allAdvens });
  } catch (error) {
    console.error('Error executing Adventurers query:', error);

    //Generic error code.
    res
      .status(500)
      .send('An error occurred while executing the allAdvens database query.');
  }
});

//Adventurer_Jobs SELECT Query, pull table data.
app.get('/adventurerJobs', async (req, res) => {
  try {
    //Create and execute job SELECT query for general page population.

    const ajQuery = `CALL GetAllAdventurerJobs()`;
    const [aj_table] = await db.query(ajQuery);

    // Send results to frontend.
    res.status(200).json({ aj_table });
  } catch (error) {
    console.error('Error executing Adventurer Jobs query:', error);

    //Generic error code.
    res
      .status(500)
      .send('An error occurred while executing the ajQuery database query.');
  }
});

// Get a single adventurer's job data
app.get('/adventurerJobs/:id', async (req, res) => {
  try {
    //Create and execute job SELECT query for general page population.
    const paramId = req.params.id;

    const ajQuery = `CALL GetOneAdventurerJobs(?)`;
    const [aj_table] = await db.query(ajQuery, [paramId]);

    // Send results to frontend.
    res.status(200).json({ aj_table });
  } catch (error) {
    console.error('Error executing Adventurer Jobs query:', error);

    //Generic error code.
    res
      .status(500)
      .send('An error occurred while executing the ajQuery database query.');
  }
});

// Create a new link between an adventurer and a job
app.post('/adventurerJobs', async (req, res) => {
  const { adventurer_ID, job_ID } = req.body;
  try {
    // Update adventurer job given the adventurer_ID and job_ID
    const createQuery = 'CALL CreateAdventurerJob(?, ?)';
    await db.query(createQuery, [adventurer_ID, job_ID]);

    // Send results to frontend.
    res.status(200).json({ message: 'Successfully created adventurer job.' });
  } catch (error) {
    console.error('Error executing Create query:', error);

    //Generic error code.
    res
      .status(500)
      .send(
        'An error occurred while inserting into the Adventurer_Jobs database.',
      );
  }
});

// Delete a single adventurer's job from Adventurer_Jobs
app.delete('/adventurerJobs', async (req, res) => {
  const { adventurer_ID, job_ID } = req.body;
  try {
    // Update adventurer job given the adventurer_ID and job_ID
    const createQuery = 'CALL DeleteAdventurerJob(?, ?)';
    await db.query(createQuery, [adventurer_ID, job_ID]);

    // Send results to frontend.
    res.status(200).json({ message: 'Successfully deleted adventurer job.' });
  } catch (error) {
    console.error('Error executing Delete query:', error);

    //Generic error code.
    res
      .status(500)
      .send(
        'An error occurred while deleting from the Adventurer_Jobs database query.',
      );
  }
});

// Update a single adventurer's data
app.put('/adventurerJobs', async (req, res) => {
  const {
    adventurer_ID,
    job_ID,
    updated_job_ID,
    adventurer_completed_job,
    adventurer_currently_tracking_job,
    completion_payment_transfered,
  } = req.body;
  try {
    // Update adventurer job given the adventurer_ID and job_ID
    const updateQuery = 'CALL UpdateAdventurerJob(?, ?, ?, ?, ?, ?)';
    await db.query(updateQuery, [
      adventurer_ID,
      job_ID,
      updated_job_ID,
      adventurer_completed_job,
      adventurer_currently_tracking_job,
      completion_payment_transfered,
    ]);

    // Send results to frontend.
    res.status(200).json({ message: 'Successfully updated row.' });
  } catch (error) {
    console.error('Error executing Update query:', error);

    //Generic error code.
    res
      .status(500)
      .send(
        'An error occurred while updated the Adventurer_Jobs database query.',
      );
  }
});

//Database Reset Call
app.post('/dbReset', async (req, res) => {
  const { request } = req.body;

  if (request === 'RESET_DB') {
    try {
      const [response] = await db.query('CALL RESET_DB()');
      res.status(201).json({ message: 'Database was reset', data: response });
    } catch (error) {
      res.status(500).json({ message: 'Database reset failed' });
    }
  } else {
    res.status(400).json({ message: 'RESET REQUEST FAILED.' });
  }
});

// Add a new location.
app.post('/locations', async (req, res) => {
  const {
    solar_system,
    celestial_body_name,
    target_latitude,
    target_longitude,
  } = req.body;

  const addLocationQuery = `CALL InsertLocation(?, ?, ?, ?)`;

  try {
    await db.query(addLocationQuery, [
      solar_system,
      celestial_body_name,
      target_latitude,
      target_longitude,
    ]);

    res.status(201).json({ message: 'Location added successfully' });
  } catch (error) {
    console.error('Error inserting location:', error);
    res.status(500).json({ error: 'Failed to add location' });
  }
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
  console.log(
    'Express started on http://classwork.engr.oregonstate.edu:' +
      PORT +
      '; press Ctrl-C to terminate.',
  );
});
