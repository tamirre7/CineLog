const { Pool } = require('pg');

// Create a connection pool to the database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true, // Required for Neon cloud database
  },
});

// Listener for successful connection
pool.on('connect', () => {
  console.log('✅ Connected to Neon Database successfully');
});

// Listener for database errors
pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

// Export the pool so other parts of the server can use it
module.exports = pool;
