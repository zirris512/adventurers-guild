-- Group 24 - Adventurer's Guild
-- Database manipulation queries for the Adventurer's Guild website.
-- Get all current rank and rank threshold values.
SELECT *
FROM Ranks;
-- Get all recorded locations
SELECT *
FROM Locations;
-- Insert a new location record.
INSERT INTO Locations(
        solar_system,
        celestial_body_name,
        target_latitude,
        target_longitude
    )
VALUES(
        @solar_system_input,
        @celestial_body_name_input,
        @target_latitude_input,
        @target_longitude_input
    );
-- Get all adventurers recorded locations.
SELECT *
FROM Adventurers;
-- Insert a new adventurer record.
INSERT INTO Adventurers(
        first_name,
        last_name,
        universal_telephone_number,
        adventurer_rank,
        adventurer_is_active,
        a_last_update
    )
VALUES(
        @fname_input,
        @lname_input,
        @tele_input,
        @a_rank,
        @a_status,
        NOW()
    );
-- Get all job records.
SELECT *
FROM Jobs;
-- Insert a new job record.
INSERT INTO Jobs(
        job_opener_first_name,
        job_opener_last_name,
        job_rank,
        job_location,
        job_still_open,
        job_point_value,
        completion_payout
    )
VALUES(
        @job_opener_first_name_input,
        @job_opener_last_name_input,
        @job_rank_input,
        @job_location_input,
        @job_still_open_input,
        @job_point_value_input,
        @completion_payout_input
    );
-- Get all adventurer jobs and names
SELECT adventurers.first_name,
    adventurers.last_name,
    adventurer_jobs.job_ID,
    adventurer_jobs.adventurer_completed_job,
    adventurer_jobs.adventurer_currently_tracking_job,
    adventurer_jobs.aj_last_update,
    adventurer_jobs.completion_payment_transfered
FROM adventurer_jobs
    JOIN adventurers ON adventurer_jobs.adventurer_ID = adventurers.adventurer_ID;
-- Create a job tied to an adventurer by adventurer_ID and job_ID
INSERT -- Update adventurer jobs by adventurer_ID and jobs_ID
UPDATE adventurer_jobs
SET adventurer_completed_job = @adventurer_completed_job_input,
    adventurer_currently_tracking_job = @adventurer_currently_tracking_job_input,
    completion_payment_transfered = @completion_payment_transfered_input
WHERE adventurer_ID = @adventurer_ID_input
    AND job_ID = @job_ID_input;
-- Delete a row by adventurer_ID and job_ID
DELETE FROM adventurer_jobs
WHERE adventurer_ID = @adventurer_ID_input
    AND job_ID = @job_ID_input;