// Sample database configuration file
// Copy this file to db.config.js and update with your FreeData PostgreSQL credentials

// FreeData PostgreSQL configuration
const dbConfig = {
  user: 'your_freedata_username',
  host: 'your_freedata_host', // e.g., 'db.freedata.io'
  database: 'your_database_name',
  password: 'your_freedata_password',
  port: 5432, // Default PostgreSQL port
  ssl: true // Set to true for secure connections
};

export default dbConfig;
