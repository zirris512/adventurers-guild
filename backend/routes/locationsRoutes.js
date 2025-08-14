const router = require('express').Router();
const locationsModel = require('../models/locationsModel');

//Location SELECT query, pull table data.
router.get('/locations', async (req, res) => {
  const allLocations = await locationsModel.getLocations();
  if ('Error' in allLocations) {
    //Generic error code.
    res
      .status(500)
      .send('An error occurred while executing the Locations database query.');
  } else {
    // Send results to frontend.
    res.status(200).json({ allLocations });
  }
});

// Add a new location.
router.post('/locations', async (req, res) => {
  const {
    solar_system,
    celestial_body_name,
    target_latitude,
    target_longitude,
  } = req.body;

  const err = await locationsModel.createLocation(
    solar_system,
    celestial_body_name,
    target_latitude,
    target_longitude,
  );

  if (err) {
    res.status(500).json(err.Error);
  } else {
    res.status(201).json({ message: 'Location added successfully' });
  }
});

// Delete a Location.
router.delete('/locations/:id', async (req, res) => {
  const locationId = req.params.id;

  const err = await locationsModel.deleteLocation(locationId);
  if (err) {
    res.status(err.status).send(err.Error);
  } else {
    res.status(200).json({ message: 'Location deleted successfully' });
  }
});

module.exports = router;
