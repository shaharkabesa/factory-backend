// Generic db.js structure
const { Pool } = require('pg');

// 1. Configure the connection settings
const pool = new Pool({
  user: 'postgres',        // Default user
  host: 'localhost',       // Database location
  database: 'blog_system',// The DB name you created in SQL
  password: 'root',        // Your password
  port: 5432,              // Default Postgres port
});

// 2. Export a query function
// This wraps the pool.query so other files can use it easily
module.exports = {
  query: (text, params) => pool.query(text, params),
};