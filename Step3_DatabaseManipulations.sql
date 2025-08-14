-- Group 24 - Adventurer's Guild
-- Database manipulation queries for the Adventurer's Guild website.

-- Get all rank and rank threshold values
SELECT * FROM Ranks;

-- Get all  locations
SELECT * FROM Locations;

-- Insert a new location record
INSERT INTO Locations (
    solar_system,
    celestial_body_name,
    target_latitude,
    target_longitude
) VALUES (
    @solar_system_input,
    @celestial_body_name_input,
    @target_latitude_input,
    @target_longitude_input
);

-- Delete a location by its location_ID
DELETE FROM Locations
WHERE location_ID = @selected_location_ID;

-- Get all adventurers with total points from completed jobs.
SELECT 
    a.adventurer_ID,
    a.first_name,
    a.last_name,
    a.universal_telephone_number,
    a.adventurer_rank,
    a.adventurer_is_active,
    a.a_last_update,
    COALESCE(SUM(j.job_point_value), 0) AS total_points
FROM Adventurers a
LEFT JOIN Adventurer_Jobs aj 
    ON a.adventurer_ID = aj.adventurer_ID 
    AND aj.adventurer_completed_job = TRUE
LEFT JOIN Jobs j 
    ON aj.job_ID = j.job_ID
GROUP BY 
    a.adventurer_ID,
    a.first_name,
    a.last_name,
    a.universal_telephone_number,
    a.adventurer_rank,
    a.adventurer_is_active,
    a.a_last_update
ORDER BY total_points DESC;

-- Insert a new adventurer record 
INSERT INTO Adventurers (
    first_name,
    last_name,
    universal_telephone_number,
    adventurer_rank,
    adventurer_is_active,
    a_last_update
) VALUES (
    @fname_input,
    @lname_input,
    @tele_input,
    @a_rank,
    @a_status,
    NOW()
);

-- Update adventurer status and rank
UPDATE Adventurers AS a
SET
    a.first_name = @fname_input,
    a.last_name = @lname_input,
    a.universal_telephone_number = @tele_input,
    a.adventurer_rank = @a_rank,
    a.adventurer_is_active = @a_status,
    a.a_last_update = NOW()
WHERE a.adventurer_ID = @adventurer_ID_input;

-- Get all job records with location names.
SELECT 
    j.job_ID,
    j.job_opener_first_name,
    j.job_opener_last_name,
    j.job_rank,
    j.job_location,
    CONCAT(l.solar_system, ' (', l.celestial_body_name, ')') AS job_location_name,
    j.job_still_open,
    j.job_created_at,
    j.j_last_update,
    j.job_point_value,
    j.completion_payout
FROM Jobs j
JOIN Locations l ON j.job_location = l.location_ID;

-- Insert a new job record 
INSERT INTO Jobs (
    job_opener_first_name,
    job_opener_last_name,
    job_rank,
    job_location,
    job_still_open,
    job_created_at,
    j_last_update,
    job_point_value,
    completion_payout
) VALUES (
    @job_opener_first_name_input,
    @job_opener_last_name_input,
    @job_rank_input,
    @job_location_input,
    @job_still_open_input,
    NOW(),
    NOW(),
    @job_point_value_input,
    @completion_payout_input
);

-- Update job record 
UPDATE Jobs AS j
SET
    j.job_opener_first_name = @job_opener_first_name_input,
    j.job_opener_last_name = @job_opener_last_name_input,
    j.job_rank = @job_rank_input,
    j.job_location = @job_location_input,
    j.job_still_open = @job_still_open_input,
    j.j_last_update = NOW(),
    j.job_point_value = @job_point_value_input,
    j.completion_payout = @completion_payout_input
WHERE j.job_ID = @job_ID_input;

-- Delete a job by ID.
DELETE FROM Jobs
WHERE job_ID = @job_ID_input;


-- Get all adventurer jobs and names and job opener names
SELECT 
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
    JOIN Jobs ON Jobs.job_ID = Adventurer_Jobs.job_ID;
-- Get a single adventurer and all jobs
SELECT adventurers.first_name,
    adventurers.last_name,
    jobs.job_opener_first_name,
    jobs.job_opener_last_name,
    adventurer_jobs.adventurer_completed_job,
    adventurer_jobs.adventurer_currently_tracking_job,
    adventurer_jobs.aj_last_update,
    adventurer_jobs.completion_payment_transfered
FROM adventurer_jobs
    JOIN adventurers ON adventurer_jobs.adventurer_ID = adventurers.adventurer_ID
    JOIN jobs ON jobs.job_ID = adventurer_jobs.job_ID;
WHERE adventurer_jobs.adventurer_ID = @adventurer_ID_input;
-- Create a job tied to an adventurer by adventurer_ID and job_ID
INSERT INTO adventurer_jobs (
        adventurer_ID,
        job_ID,
        adventurer_completed_job,
        adventurer_currently_tracking_job,
        aj_last_update,
        completion_payment_transfered
    ) VALUE (
        @adventurer_ID_input,
        @job_ID_input,
        0,
        1,
        NOW(),
        0
    );
-- Update adventurer jobs by adventurer_ID and jobs_ID
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