const router = require('express').Router();
const ranksModel = require('../models/ranksModel');

// Rank SELECT query, pull table data.
router.get('/ranks', async (req, res) => {
  const allRanks = await ranksModel.getRanks();

  if ('Error' in allRanks) {
    //Generic error code.
    res.status(500).send(err.Error);
  } else {
    // Send results to frontend.
    res.status(200).json({ allRanks });
  }
});

module.exports = router;
