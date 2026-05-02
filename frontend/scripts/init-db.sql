-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS finix_edu;
USE finix_edu;

-- Table for Student Results (semester-wise)
CREATE TABLE IF NOT EXISTS results (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    enrollment_number VARCHAR(100) NOT NULL,
    name              VARCHAR(255) NOT NULL,
    course            VARCHAR(255) NOT NULL,
    year              VARCHAR(20)  NOT NULL,
    semester          VARCHAR(50)  NOT NULL,
    total_max_marks   INT          NOT NULL DEFAULT 0,
    total_obtained    INT          NOT NULL DEFAULT 0,
    result            VARCHAR(50)  NOT NULL,
    class_grade       VARCHAR(50)  DEFAULT '',
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_result (enrollment_number, course, semester, year)
);

-- Table for Blogs
CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    author_name VARCHAR(255) NOT NULL DEFAULT 'Finix CNC Training',
    published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

