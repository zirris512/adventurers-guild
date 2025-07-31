-- Group 24 - Adventurer's Guild
-- Database manipulation queries for the Adventurer's Guild website.

-- Get all current rank and rank threshold values.
SELECT * as rankInfo FROM Ranks;


-- Get all recorded locations
SELECT * as locationInfo FROM Locations;

-- Insert a new location record.
INSERT INTO Locations(solar_system, celestial_body_name, target_latitude, target_longitude)
VALUES(@solar_system_input, @celestial_body_name_input, @target_latitude_input, @target_longitude_input)

-- Get all adventurers recorded locations.
SELECT * as allAdventurers FROM Adventurers;

-- Insert a new adventurer record.
INSERT INTO Adventurers(first_name, last_name, universal_telephone_number, adventurer_rank, adventurer_is_active, a_last_update)
VALUES(@fname_input, @lname_input, @tele_input, @a_rank, @a_status, NOW());

-- Get all job records.
SELECT * as allJobs FROM Jobs;


