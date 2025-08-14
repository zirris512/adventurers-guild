const db = require('../database/db-connector');

const getLocations = async () => {
  try {
    //Create and execute job SELECT query for general page population.

    const locationQuery = 'SELECT * FROM Locations;';
    const [allLocations] = await db.query(locationQuery);

    return allLocations;
  } catch (err) {
    console.error('Error executing Locations query:', err);
    return {
      Error: 'An error occurred while executing the Locations database query.',
    };
  }
};

const createLocation = async (
  solar_system,
  celestial_body_name,
  target_latitude,
  target_longitude,
) => {
  const addLocationQuery = `CALL InsertLocation(?, ?, ?, ?)`;

  try {
    await db.query(addLocationQuery, [
      solar_system,
      celestial_body_name,
      target_latitude,
      target_longitude,
    ]);
  } catch (error) {
    console.error('Error inserting location:', error);
    return { Error: 'Failed to add location' };
  }
};

const deleteLocation = async (locationId) => {
  const deleteLocationQuery = `DELETE FROM Locations WHERE location_ID = ?;`;

  try {
    const [result] = await db.query(deleteLocationQuery, [locationId]);

    if (result.affectedRows === 0) {
      return { status: 404, Error: 'Location not found' };
    }
  } catch (error) {
    console.error('Error deleting location:', error);
    return {
      status: 500,
      Error: 'An error occurred while deleting the location.',
    };
  }
};

module.exports = { getLocations, createLocation, deleteLocation };
