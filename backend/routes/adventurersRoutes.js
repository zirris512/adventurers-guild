const router = require('express').Router();
const adventurerModel = require('../models/adventurersModel');

//Adventure's SELECT query, pull table data.
router.get('/adventurers', async (req, res) => {
  const allAdvens = await adventurerModel.getAdventurers();
  if (!allAdvens || 'Error' in allAdvens) {
    console.error('Error executing Adventurers query:', err);
    //Generic error code.
    res
      .status(500)
      .send('An error occurred while executing the allAdvens database query.');
  } else {
    res.status(200).json({ allAdvens });
  }
});

//New Adventurer Insert
router.post('/adventurers', async (req, res) => {
  const {
    first_name,
    last_name,
    universal_telephone_number,
    adventurer_rank,
    adventurer_is_active,
  } = req.body;

  const err = await adventurerModel.createAdventurer(
    first_name,
    last_name,
    universal_telephone_number,
    adventurer_rank,
    adventurer_is_active,
  );
  if (err) {
    console.error('Error creating new Adventurer', err);
    res.status(500).send('Error creating new adventurer');
  } else {
    res.status(201).json({ message: 'Adventurer Added' });
  }
});

// Update an Adventurer
router.put('/adventurers/:id', async (req, res) => {
  const adventurerId = parseInt(req.params.id, 10);

  const {
    first_name,
    last_name,
    universal_telephone_number,
    adventurer_rank,
    adventurer_is_active,
  } = req.body;

  const err = await adventurerModel.updateAdventurer(
    adventurerId,
    first_name,
    last_name,
    universal_telephone_number,
    adventurer_rank,
    adventurer_is_active,
  );
  if (err) {
    res.status(err.status).json({ Error: error.Error });
  } else {
    res.status(200).json({ message: 'Adventurer updated successfully' });
  }
});

module.exports = router;
