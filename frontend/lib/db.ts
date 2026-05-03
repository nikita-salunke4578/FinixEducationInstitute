import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "4000", 10), // TiDB uses 4000
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  }
});

export async function query(sql: string, values?: any[]) {
  try {
    const [results] = await pool.execute(sql, values);
    return results;
  } catch (error: any) {
    console.error("Database Error Details:", {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState
    });
    throw error;
  }
}

export default pool;
