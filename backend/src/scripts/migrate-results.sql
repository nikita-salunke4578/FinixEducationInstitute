-- Migration: Replace old results schema with semester-wise schema
-- Run this on your Railway MySQL database

-- Drop old results table (only if you are sure there's no important data)
DROP TABLE IF EXISTS results;

-- New results table matching the Statement of Marks format
CREATE TABLE results (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    enrollment_number VARCHAR(100) NOT NULL,
    name            VARCHAR(255) NOT NULL,
    course          VARCHAR(255) NOT NULL,
    year            VARCHAR(20)  NOT NULL COMMENT 'e.g. 2020-2021',
    semester        VARCHAR(50)  NOT NULL COMMENT 'e.g. First Semester',
    total_max_marks INT          NOT NULL DEFAULT 0,
    total_obtained  INT          NOT NULL DEFAULT 0,
    result          VARCHAR(50)  NOT NULL COMMENT 'Pass / Fail / ATKT',
    class_grade     VARCHAR(50)  DEFAULT '' COMMENT 'Distinction / First Class / Second Class etc.',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- A student can have multiple rows (one per semester)
    -- unique per enrollment + course + semester + year combination
    UNIQUE KEY uq_result (enrollment_number, course, semester, year)
);
