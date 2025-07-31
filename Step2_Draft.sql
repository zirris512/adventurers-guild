-- This work is original.
-- Team 24 Step 2 DRAFT
-- Members: Nathaniel Dziuba and Brentleigh Edwards 

-- Schema generated is: Adventurers_Guild

-- Table: Ranks
CREATE TABLE Ranks (
    rank_ID CHAR(1) PRIMARY KEY,
    rank_threshold INT NOT NULL COMMENT 'Used only for adventurers, ignored for jobs'
);

-- Table: Locations
CREATE TABLE Locations (
    location_ID INT AUTO_INCREMENT PRIMARY KEY,
    solar_system VARCHAR(250) NOT NULL,
    celestial_body_name VARCHAR(250) NOT NULL,
    target_latitude VARCHAR(50) NOT NULL,
    target_longitude VARCHAR(50) NOT NULL
);

-- Table: Adventurers
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

-- Table: Jobs
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
    CONSTRAINT FK_Jobs_job_location FOREIGN KEY (job_location) REFERENCES Locations(location_ID)
);

 -- Table: Adventurer_Jobs (Intersection Table)

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



-- Sample Inserts for Ranks
INSERT INTO Ranks (rank_ID, rank_threshold) VALUES
("F", 0),
("E", 100),
("D", 200),
("C", 400),
("B", 800),
("A", 1600);

-- Sample Inserts for Locations
INSERT INTO Locations (solar_system, celestial_body_name, target_latitude, target_longitude) VALUES
('Epsilon Eridani', 'Epsilon III', '45.678N', '120.456E'),
('Alpha Centauri', 'Alpha B2', '33.210S', '75.900W'),
('Sol', 'Mars', '15.000N', '100.000E');


-- Sample Inserts for Adventurers
INSERT INTO Adventurers (adventurer_ID, first_name, last_name, universal_telephone_number, adventurer_rank, adventurer_is_active, a_last_update) VALUES
(1, 'Aria', 'Thorne', '104-121-2428', 'F', TRUE, NOW()),
(2, 'Bren', 'Stoneheart', '916-091-5393', 'F', TRUE, NOW()),
(3, 'Cyril', 'Duskblade', '235-253-8300', 'F', TRUE, NOW());


-- Sample Inserts for Jobs
INSERT INTO Jobs (job_ID, job_opener_first_name, job_opener_last_name, job_rank, job_location, job_still_open, job_created_at, j_last_update, job_point_value, completion_payout) VALUES
(1, 'Lysa', 'Fairwind', 'F', 1, TRUE, NOW(), NOW(), 5, '25 gold'),
(2, 'Torin', 'Blacksteel', 'F', 2, TRUE, NOW(), NOW(), 15, '45 gold'),
(3, 'Ilya', 'Brightstar', 'F', 3, FALSE, NOW(), NOW(), 10, '120 gold'),
(4, 'Eldon', 'Stoneshaper', 'F', 1, FALSE, NOW(), NOW(), 5, '30 gold');

-- Sample Inserts for Adventurer_Jobs
INSERT INTO Adventurer_Jobs (adventurer_ID, job_ID, adventurer_completed_job, adventurer_currently_tracking_job, aj_last_update, completion_payment_transfered) VALUES
(1, 1, TRUE, FALSE, NOW(), TRUE),
(1, 4, TRUE, FALSE, NOW(), TRUE),
(2, 2, TRUE, FALSE, NOW(), TRUE),
(3, 3, TRUE, FALSE, NOW(), TRUE);

