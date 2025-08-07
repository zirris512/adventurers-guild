/*-- Citation for the following code: Nathaniel Dziuba
-- Date: 2025-08-05
-- Adapted from Exploration Web Application Technology.
-- AI was used to help review the code for syntax errors after an initial implementation.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions. It was also used for troubleshooting
-- server issues where the server.js file was not being update properly on reload. */
// ########################################
// ########## SETUP
console.log("SERVER FILE LOADED FROM:", __filename);

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();


// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = 50100;

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
// Job SELECT query, pull table data.
app.get('/jobs', async (req, res) => {
    try{
        //Create and execute job SELECT query for general page population.
        
        const jobsQuery = 'SELECT * FROM Jobs;';
        const [allJobs] = await db.query(jobsQuery);

        // Send results to frontend.
        res.status(200).json({allJobs});
    } catch (error) {
        console.error("Error executing Jobs query:", error);
        
        //Generic error code.
        res.status(500).send("An error occurred while executing the Jobs database query.");
    }
});

//Location SELECT query, pull table data.
app.get('/locations', async (req, res) => {
    try{
        //Create and execute job SELECT query for general page population.
        
        const locationQuery = 'SELECT * FROM Locations;';
        const [allLocations] = await db.query(locationQuery);

        // Send results to frontend.
        res.status(200).json({allLocations});
    } catch (error) {
        console.error("Error executing Locations query:", error);
        
        //Generic error code.
        res.status(500).send("An error occurred while executing the Locations database query.");
    }
});

// Rank SELECT query, pull table data.

app.get('/ranks', async (req,res)=>{
    try{
        //Create and execute job SELECT query for general page population.
        
        const rankQuery = 'SELECT * FROM Ranks;'; 
        const [allRanks] = await db.query(rankQuery);

        // Send results to frontend.
    res.status(200).json({allRanks});
    } catch (error) {
        console.error("Error executing Ranks query:", error);
    
        //Generic error code.
        res.status(500).send("An error occurred while executing the allRanks database query.");
}
});

//Adventure's SELECT query, pull table data.
app.get('/adventurers', async (req,res)=>{
    try{
        //Create and execute job SELECT query for general page population.
        
        const advenQuery = 'SELECT * FROM Adventurers;'; 
        const [allAdvens] = await db.query(advenQuery);

        // Send results to frontend.
    res.status(200).json({allAdvens});
    } catch (error) {
        console.error("Error executing Adventurers query:", error);
    
        //Generic error code.
        res.status(500).send("An error occurred while executing the allAdvens database query.");
}
});

//Adventurer_Jobs SELECT Query, pull table data.
app.get('/adventurerJobs', async (req,res)=>{
    try{
        //Create and execute job SELECT query for general page population.
        
        const ajQuery = 
        `SELECT 
            CONCAT(Adventurers.first_name, ' ', Adventurers.last_name) AS adventurer,
            CONCAT(Jobs.job_opener_first_name, ' ', Jobs.job_opener_last_name) AS job_opener,
            Adventurer_Jobs.adventurer_completed_job,
            Adventurer_Jobs.adventurer_currently_tracking_job,
            Adventurer_Jobs.aj_last_update,
            Adventurer_Jobs.completion_payment_transfered,
            Adventurer_Jobs.adventurer_ID,
            Jobs.job_ID
        FROM Adventurer_Jobs
            JOIN Adventurers ON Adventurer_Jobs.adventurer_ID = Adventurers.adventurer_ID
            JOIN Jobs ON Jobs.job_ID = Adventurer_Jobs.job_ID;`; 
        const [aj_table] = await db.query(ajQuery);

        // Send results to frontend.
    res.status(200).json({aj_table});
    } catch (error) {
        console.error("Error executing Adventurer Jobs query:", error);
    
        //Generic error code.
        res.status(500).send("An error occurred while executing the ajQuery database query.");
}
});

//Database Reset Call
app.post('/dbReset', async (req, res) => {
    const { request } = req.body;

    if (request === "RESET_DB") {
        try {
            const [response] = await db.query(`CALL RESET_DB();`);
            res.status(201).json({ "message": "Database was reset", "data": response });
        } catch (error) {
            res.status(500).json({ "message": "Database reset failed" });
        }
    } else {
        res.status(400).json({ "message": "RESET REQUEST FAILED." });
    }
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
