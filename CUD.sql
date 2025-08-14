-- CUD operations for insert, delete, update on Adventurer_Jobs
DELIMITER // CREATE PROCEDURE GetAllAdventurerJobs() BEGIN
SELECT CONCAT(
        Adventurers.first_name,
        ' ',
        Adventurers.last_name
    ) AS adventurer,
    CONCAT(
        Jobs.job_opener_first_name,
        ' ',
        Jobs.job_opener_last_name
    ) AS job_opener,
    Adventurer_Jobs.adventurer_completed_job,
    Adventurer_Jobs.adventurer_currently_tracking_job,
    Adventurer_Jobs.aj_last_update,
    Adventurer_Jobs.completion_payment_transfered,
    Adventurer_Jobs.adventurer_ID,
    Jobs.job_ID
FROM Adventurer_Jobs
    JOIN Adventurers ON Adventurer_Jobs.adventurer_ID = Adventurers.adventurer_ID
    JOIN Jobs ON Jobs.job_ID = Adventurer_Jobs.job_ID;
END // DELIMITER;
DELIMITER // CREATE PROCEDURE GetOneAdventurerJobs(IN adventurer_ID_input VARCHAR(250)) BEGIN
SELECT CONCAT(
        Adventurers.first_name,
        ' ',
        Adventurers.last_name
    ) AS adventurer,
    CONCAT(
        Jobs.job_opener_first_name,
        ' ',
        Jobs.job_opener_last_name
    ) AS job_opener,
    Adventurer_Jobs.adventurer_completed_job,
    Adventurer_Jobs.adventurer_currently_tracking_job,
    Adventurer_Jobs.aj_last_update,
    Adventurer_Jobs.completion_payment_transfered
FROM Adventurer_Jobs
    JOIN Adventurers ON Adventurer_Jobs.adventurer_ID = Adventurers.adventurer_ID
    JOIN Jobs ON Jobs.job_ID = Adventurer_Jobs.job_ID
WHERE Adventurer_Jobs.adventurer_ID = adventurer_ID_input;
END // DELIMITER;
DELIMITER // CREATE PROCEDURE UpdateAdventurerJob(
    IN adventurer_ID_input INT,
    IN job_ID_input INT,
    IN updated_job_ID_input INT,
    IN adventurer_completed_job_input BOOLEAN,
    IN adventurer_currently_tracking_job_input BOOLEAN,
    IN completion_payment_transfered_input BOOLEAN
) BEGIN
UPDATE Adventurer_Jobs
SET job_ID = updated_job_ID_input,
    adventurer_completed_job = adventurer_completed_job_input,
    adventurer_currently_tracking_job = adventurer_currently_tracking_job_input,
    aj_last_update = NOW(),
    completion_payment_transfered = completion_payment_transfered_input
WHERE adventurer_ID = adventurer_ID_input
    AND job_ID = job_ID_input;
END // DELIMITER;
DELIMITER // CREATE PROCEDURE CreateAdventurerJob(
    IN adventurer_ID_input INT,
    IN job_ID_input INT
) BEGIN
INSERT INTO Adventurer_Jobs (
        adventurer_ID,
        job_ID,
        adventurer_completed_job,
        adventurer_currently_tracking_job,
        aj_last_update,
        completion_payment_transfered
    ) VALUE (
        adventurer_ID_input,
        job_ID_input,
        0,
        1,
        NOW(),
        0
    );
END // DELIMITER;
DELIMITER // CREATE PROCEDURE DeleteAdventurerJob(
    IN adventurer_ID_input INT,
    IN job_ID_input INT
) BEGIN
DELETE FROM Adventurer_Jobs
WHERE adventurer_ID = adventurer_ID_input
    AND job_ID = job_ID_input;
END // DELIMITER;