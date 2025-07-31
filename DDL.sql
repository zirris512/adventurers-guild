-- Group 59 - Keri Grubb, Benjamin Breadon
-- Data Definition Queries and sample data INSERTS for OSU CS Tutoring Appointment System

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Appointments;
DROP TABLE IF EXISTS TutorCourses;
DROP TABLE IF EXISTS Enrollments;
DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS Tutors;
DROP TABLE IF EXISTS Courses;

-- Create Students table
CREATE TABLE Students (
    studentID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    major VARCHAR(50) NOT NULL
);

-- Create Tutors table
CREATE TABLE Tutors (
    tutorID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hireDate DATE NOT NULL,
    status ENUM('Active','Inactive') NOT NULL DEFAULT 'Active'
);

-- Create Courses table
CREATE TABLE Courses (
    courseID INT AUTO_INCREMENT PRIMARY KEY,
    courseCode VARCHAR(10) UNIQUE NOT NULL,
    courseName VARCHAR(100) NOT NULL,
    credits TINYINT NOT NULL,
    description TEXT NOT NULL
);

-- Create Enrollments table (M:N Students-Courses)
CREATE TABLE Enrollments (
    studentID INT NOT NULL,
    courseID INT NOT NULL,
    enrollmentDate DATE NOT NULL,
    PRIMARY KEY (studentID, courseID),
    FOREIGN KEY (studentID) REFERENCES Students(studentID) ON DELETE CASCADE,
    FOREIGN KEY (courseID) REFERENCES Courses(courseID) ON DELETE CASCADE
);

-- Create TutorCourses table (M:N Tutors-Courses)
CREATE TABLE TutorCourses (
    tutorID INT NOT NULL,
    courseID INT NOT NULL,
    assignedDate DATE NOT NULL,
    PRIMARY KEY (tutorID, courseID),
    FOREIGN KEY (tutorID) REFERENCES Tutors(tutorID) ON DELETE CASCADE,
    FOREIGN KEY (courseID) REFERENCES Courses(courseID) ON DELETE CASCADE
);

-- Create Appointments table
CREATE TABLE Appointments (
    appointmentID INT AUTO_INCREMENT PRIMARY KEY,
    studentID INT NOT NULL,
    tutorID INT NOT NULL,
    courseID INT NOT NULL,
    appointmentDateTime DATETIME NOT NULL,
    durationMinutes SMALLINT NOT NULL DEFAULT 60,
    status ENUM('Scheduled','Completed','Canceled') NOT NULL DEFAULT 'Scheduled',
    FOREIGN KEY (studentID) REFERENCES Students(studentID) ON DELETE CASCADE,
    FOREIGN KEY (tutorID) REFERENCES Tutors(tutorID) ON DELETE CASCADE,
    FOREIGN KEY (courseID) REFERENCES Courses(courseID) ON DELETE CASCADE
);

-- Insert sample data into Students
INSERT INTO Students (
    studentID, 
    firstName, 
    lastName, 
    email, 
    major
) 
VALUES
(
    1, 
    'Alice', 
    'Smith', 
    'smithal@oregonstate.edu', 
    'CS'
),
(
    2, 
    'Brian', 
    'Kim', 
    'kimbr@oregonstate.edu', 
    'ECE'
),
(
    3, 
    'Clara', 
    'Sooyoung', 
    'sooyoungcl@oregonstate.edu', 
    'CS'
),
(
    4, 
    'David', 
    'Patel', 
    'patelda@oregonstate.edu', 
    'CS'
);

-- Insert sample data into Tutors
INSERT INTO Tutors (
    tutorID, 
    firstName, 
    lastName, 
    email, 
    hireDate, 
    status
) 
VALUES
(
    1, 
    'Emma', 
    'Torres', 
    'torresem@oregonstate.edu', 
    '2023-09-01', 
    'Active'
),
(
    2, 
    'Jacob', 
    'Reed', 
    'reedja@oregonstate.edu', 
    '2022-01-15', 
    'Active'
),
(
    3, 
    'Sophie', 
    'Lee', 
    'leeso@oregonstate.edu', 
    '2024-03-10', 
    'Inactive'
);

-- Insert sample data into Courses
INSERT INTO Courses (
    courseID, 
    courseCode, 
    courseName, 
    credits, 
    description
) 
VALUES
(
    1, 
    'CS261', 
    'Data Structures', 
    4, 
    'Abstract data types and structures'
),
(
    2, 
    'MTH231', 
    'Discrete Mathematics', 
    4, 
    'Logic and proofs, sets, functions'
),
(
    3, 
    'CS290', 
    'Web Development', 
    4, 
    'HTML/CSS/JavaScript fundamentals'
);

-- Insert sample data into Enrollments
INSERT INTO Enrollments (
    studentID, 
    courseID, 
    enrollmentDate
) 
VALUES
(
    1, 
    1, 
    '2025-01-10'
),
(
    1, 
    3, 
    '2025-03-05'
),
(
    2, 
    2, 
    '2025-01-15'
),
(
    3, 
    1, 
    '2025-02-20'
),
(
    4, 
    3, 
    '2025-06-18'
);

-- Insert sample data into TutorCourses
INSERT INTO TutorCourses (
    tutorID, 
    courseID, 
    assignedDate
) 
VALUES
(
    1, 
    1, 
    '2023-09-01'
),
(
    2, 
    2, 
    '2022-01-20'
),
(
    1, 
    3, 
    '2024-05-15'
),
(
    3, 
    3, 
    '2024-09-01'
);

-- Insert sample data into Appointments
INSERT INTO Appointments (
    appointmentID, 
    studentID, 
    tutorID, 
    courseID, 
    appointmentDateTime, 
    durationMinutes, 
    status
) 
VALUES
(
    1, 
    1, 
    1, 
    1, 
    '2025-07-28 10:00:00', 
    60, 
    'Scheduled'
),
(
    2, 
    2, 
    2, 
    2, 
    '2025-07-29 11:30:00', 
    60, 
    'Completed'
),
(
    3, 
    3, 
    1, 
    1, 
    '2025-07-30 14:00:00', 
    60, 
    'Canceled'
),
(
    4, 
    1, 
    3, 
    3, 
    '2025-08-01 09:00:00', 
    60, 
    'Scheduled'
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
