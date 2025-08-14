const router = require('express').Router();
const adventurersRoutes = require('./adventurersRoutes');
const adventurerJobsRoutes = require('./adventurerJobsRoutes');
const jobsRoutes = require('./jobsRoutes');
const locationRoutes = require('./locationsRoutes');
const rankRoutes = require('./ranksRoutes');

const db = require('../database/db-connector');

router.use(adventurersRoutes);
router.use(adventurerJobsRoutes);
router.use(jobsRoutes);
router.use(locationRoutes);
router.use(rankRoutes);

//Database Reset Call
router.post('/dbReset', async (req, res) => {
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

module.exports = router;
