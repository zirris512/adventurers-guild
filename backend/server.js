/*-- Citation for the following code: Nathaniel Dziuba
-- Date: 2025-08-05\2025-08-06\2025-08-11
-- Adapted from Exploration Web Application Technology.
-- Skeleton code was used as a base and all functions are original.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions. It was also used for troubleshooting
-- server issues where the server.js file was not being update properly on reload. Helped in troubleshooting how to insert the inputed variables from
-- the user into the query using prepared statements. */
// ########################################
// ########## SETUP

// Database
const router = require('./routes');

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
app.use(router);
// ########################################
// ########## LISTENER

app.listen(PORT, function () {
  console.log(
    'Express started on http://classwork.engr.oregonstate.edu:' +
      PORT +
      '; press Ctrl-C to terminate.',
  );
});
