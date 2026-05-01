import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function initDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log("Connected to the database. Creating tables...");

  const createResultsTable = `
    CREATE TABLE IF NOT EXISTS results (
      id INT AUTO_INCREMENT PRIMARY KEY,
      cert_number VARCHAR(100) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      course VARCHAR(255) NOT NULL,
      fy_marks VARCHAR(50) DEFAULT '-',
      sy_marks VARCHAR(50) DEFAULT '-',
      ty_marks VARCHAR(50) DEFAULT '-',
      result VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  const createBlogsTable = `
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
    )
  `;

  try {
    await connection.query(createResultsTable);
    console.log("Results table ready.");

    await connection.query(createBlogsTable);
    console.log("Blogs table ready.");

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    await connection.end();
  }
}

initDB();
