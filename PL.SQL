-- Citation for the following code: RESET_DB
-- Date: 2025-08-05\2025-08-11
-- Adapted from gradescope assignments and PL/SQL explorations.
-- Assignments and exploration was used as a guide and reference. All work is original or used referencing.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions. The AI was used to rewrite the intial code I had generated
-- due to many syntax and structural errors. 

DELIMITER //

CREATE PROCEDURE RESET_DB()
BEGIN
  -- Disable foreign key checks 
  SET FOREIGN_KEY_CHECKS = 0;

  -- Drop tables
  DROP TABLE IF EXISTS Adventurer_Jobs;
  DROP TABLE IF EXISTS Jobs;
  DROP TABLE IF EXISTS Adventurers;
  DROP TABLE IF EXISTS Locations;
  DROP TABLE IF EXISTS Ranks;

  -- Re-enable foreign key checks
  SET FOREIGN_KEY_CHECKS = 1;

  -- Recreate tables
  CREATE TABLE Ranks (
      rank_ID CHAR(1) PRIMARY KEY,
      rank_threshold INT NOT NULL COMMENT 'Used only for adventurers, ignored for jobs'
  );

  CREATE TABLE Locations (
      location_ID INT AUTO_INCREMENT PRIMARY KEY,
      solar_system VARCHAR(250) NOT NULL,
      celestial_body_name VARCHAR(250) NOT NULL,
      target_latitude VARCHAR(50) NOT NULL,
      target_longitude VARCHAR(50) NOT NULL
  );

  CREATE TABLE Adventurers (
      adventurer_ID INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      universal_telephone_number VARCHAR(50) UNIQUE NOT NULL,
      adventurer_rank CHAR(1) NOT NULL,
      adventurer_is_active BOOLEAN NOT NULL,
      a_last_update DATETIME NOT NULL,
      CONSTRAINT FK_Adventurers_adventurer_rank FOREIGN KEY (adventurer_rank) REFERENCES Ranks(rank_ID)
  );

  CREATE TABLE Jobs (
      job_ID INT AUTO_INCREMENT PRIMARY KEY,
      job_opener_first_name VARCHAR(100) NOT NULL,
      job_opener_last_name VARCHAR(100) NOT NULL,
      job_rank CHAR(1) NOT NULL,
      job_location INT NOT NULL,
      job_still_open BOOLEAN NOT NULL,
      job_created_at DATETIME NOT NULL,
      j_last_update DATETIME NOT NULL,
      job_point_value INT NOT NULL,
      completion_payout VARCHAR(50) NOT NULL COMMENT 'Min 20 units or equivalent',
      CONSTRAINT FK_Jobs_job_rank FOREIGN KEY (job_rank) REFERENCES Ranks(rank_ID),
      CONSTRAINT FK_Jobs_job_location FOREIGN KEY (job_location) REFERENCES Locations(location_ID) ON DELETE CASCADE
  );

  CREATE TABLE Adventurer_Jobs (
      adventurer_ID INT NOT NULL,
      job_ID INT NOT NULL,
      adventurer_completed_job BOOLEAN NOT NULL,
      adventurer_currently_tracking_job BOOLEAN NOT NULL,
      aj_last_update DATETIME NOT NULL,
      completion_payment_transfered BOOLEAN NOT NULL,
      CONSTRAINT PK_Adventure_Jobs PRIMARY KEY (adventurer_ID, job_ID),
      CONSTRAINT FK_Adventurer_Jobs_adventure_ID FOREIGN KEY (adventurer_ID) REFERENCES Adventurers(adventurer_ID) ON DELETE CASCADE,
      CONSTRAINT FK_Adventure_Jobs_job_id FOREIGN KEY (job_ID) REFERENCES Jobs(job_ID) ON DELETE CASCADE
  );

  -- Insert sample data
  INSERT INTO Ranks (rank_ID, rank_threshold) VALUES
    ('F', 0),
    ('E', 100),
    ('D', 200),
    ('C', 400),
    ('B', 800),
    ('A', 1600);

  INSERT INTO Locations (solar_system, celestial_body_name, target_latitude, target_longitude) VALUES
    ('Epsilon Eridani', 'Epsilon III', '45.678N', '120.456E'),
    ('Alpha Centauri', 'Alpha B2', '33.210S', '75.900W'),
    ('Sol', 'Mars', '15.000N', '100.000E');

  INSERT INTO Adventurers (adventurer_ID, first_name, last_name, universal_telephone_number, adventurer_rank, adventurer_is_active, a_last_update) VALUES
    (1, 'Aria', 'Thorne', '104-121-2428', 'F', TRUE, NOW()),
    (2, 'Bren', 'Stoneheart', '916-091-5393', 'F', TRUE, NOW()),
    (3, 'Cyril', 'Duskblade', '235-253-8300', 'F', TRUE, NOW());

  INSERT INTO Jobs (job_ID, job_opener_first_name, job_opener_last_name, job_rank, job_location, job_still_open, job_created_at, j_last_update, job_point_value, completion_payout) VALUES
    (1, 'Lysa', 'Fairwind', 'F', 1, TRUE, NOW(), NOW(), 5, '25 gold'),
    (2, 'Torin', 'Blacksteel', 'F', 2, TRUE, NOW(), NOW(), 15, '45 gold'),
    (3, 'Ilya', 'Brightstar', 'F', 3, FALSE, NOW(), NOW(), 10, '120 gold'),
    (4, 'Eldon', 'Stoneshaper', 'F', 1, FALSE, NOW(), NOW(), 5, '30 gold');

  INSERT INTO Adventurer_Jobs (adventurer_ID, job_ID, adventurer_completed_job, adventurer_currently_tracking_job, aj_last_update, completion_payment_transfered) VALUES
    (1, 1, TRUE, FALSE, NOW(), TRUE),
    (1, 4, TRUE, FALSE, NOW(), TRUE),
    (2, 2, TRUE, FALSE, NOW(), TRUE),
    (3, 3, TRUE, FALSE, NOW(), TRUE);

END //

-- Citation for the following code: InsertLocation
-- Date: 2025-08-05\2025-08-11
-- Adapted from gradescope assignments and PL/SQL explorations.
-- Assignments and exploration was used as a guide and reference. All work is original or used referencing.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions. 
CREATE PROCEDURE InsertLocation(
    IN solar_system_input VARCHAR(250),
    IN celestial_body_name_input VARCHAR(250),
    IN target_latitude_input VARCHAR(50),
    IN target_longitude_input VARCHAR(50)
)
BEGIN
    INSERT INTO Locations (
        solar_system,
        celestial_body_name,
        target_latitude,
        target_longitude
    )
    VALUES (
        solar_system_input,
        celestial_body_name_input,
        target_latitude_input,
        target_longitude_input
    );
END //


-- Citation for the following code: AddJob
-- Date:2025-08-11
-- Adapted from gradescope assignments and PL/SQL explorations.
-- Assignments and exploration was used as a guide and reference. All work is original or used referencing.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions.
CREATE PROCEDURE AddJob(
    IN job_opener_first_name VARCHAR(100),
    IN job_opener_last_name VARCHAR(100),
    IN job_rank CHAR(1),
    IN job_location INT,
    IN job_still_open BOOLEAN,
    IN job_point_value INT,
    IN completion_payout VARCHAR(50)
)
BEGIN
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
    )
    VALUES (
        job_opener_first_name,
        job_opener_last_name,
        job_rank,
        job_location,
        job_still_open,
        NOW(),
        NOW(),
        job_point_value,
        completion_payout
    );
END //

-- Citation for the following code: UpdateJob
-- Date:2025-08-11
-- Adapted from gradescope assignments and PL/SQL explorations.
-- Assignments and exploration was used as a guide and reference. All work is original or used referencing.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code and ask clarifying questions.
CREATE PROCEDURE UpdateJob(
    IN job_ID INT,
    IN job_opener_first_name VARCHAR(100),
    IN job_opener_last_name VARCHAR(100),
    IN job_rank CHAR(1),
    IN job_location INT,
    IN job_still_open BOOLEAN,
    IN job_point_value INT,
    IN completion_payout VARCHAR(50)
)
BEGIN
    UPDATE Jobs AS j
    SET
        j.job_opener_first_name = job_opener_first_name,
        j.job_opener_last_name = job_opener_last_name,
        j.job_rank = job_rank,
        j.job_location = job_location,
        j.job_still_open = job_still_open,
        j.j_last_update = NOW(),
        j.job_point_value = job_point_value,
        j.completion_payout = completion_payout
    WHERE j.job_ID = job_ID;

END //

-- Citation for the following code: AddAventurer
-- Date: 2025-08-05\2025-08-11
-- Adapted from gradescope assignments and PL/SQL explorations.
-- Assignments and exploration was used as a guide and reference. All work is original or used referencing.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code. AI was used to improve the clarity and performance of the code by asking it for
-- suggestions in how to improve the procedure for readability and functionality after the initial implementation failed.
CREATE PROCEDURE AddAdventurer(
    IN first_name VARCHAR(100),
    IN last_name VARCHAR(100),
    IN universal_telephone_number VARCHAR(50),
    IN adventurer_rank CHAR(1),
    IN adventurer_is_active BOOLEAN
)
BEGIN
    INSERT INTO Adventurers (
        first_name,
        last_name,
        universal_telephone_number,
        adventurer_rank,
        adventurer_is_active,
        a_last_update
    ) VALUES (
        first_name,
        last_name,
        universal_telephone_number,
        adventurer_rank,
        adventurer_is_active,
        NOW()
    );
END //

-- Citation for the following code: UpdateAdventurer
-- Date: 2025-08-05\2025-08-11
-- Adapted from gradescope assignments and PL/SQL explorations.
-- Assignments and exploration was used as a guide and reference. All work is original or used referencing.
-- Source URL: https://m365.cloud.microsoft
-- If AI tools were used:
-- AI assistance was used to confirm integrity of the code. AI was used to improve the clarity and performance of the code by asking it for
-- suggestions in how to improve the procedure for readability and functionality after the initial implementation failed.
CREATE PROCEDURE UpdateAdventurer(
    IN adventurer_ID INT,
    IN first_name VARCHAR(100),
    IN last_name VARCHAR(100),
    IN universal_telephone_number VARCHAR(50),
    IN adventurer_rank CHAR(1),
    IN adventurer_is_active BOOLEAN
)
BEGIN
    UPDATE Adventurers AS a
    SET
        a.first_name = first_name,
        a.last_name = last_name,
        a.universal_telephone_number = universal_telephone_number,
        a.adventurer_rank = adventurer_rank,
        a.adventurer_is_active = adventurer_is_active,
        a.a_last_update = NOW()
    WHERE a.adventurer_ID = adventurer_ID;

END //

DELIMITER ;

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