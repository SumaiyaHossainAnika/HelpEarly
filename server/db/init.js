const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

async function initDB() {
  try {
    console.log('🔄 Initializing database...\n');

    // Read and execute schema
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await pool.query(schema);
    console.log('✅ Schema created successfully');

    // Read and execute seed data
    const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
    await pool.query(seed);
    console.log('✅ Seed data inserted successfully');

    console.log('\n🎉 Database initialization complete!');
    console.log('\nDemo accounts:');
    console.log('  Household: fatima@example.com / test123');
    console.log('  Helper:    rahim@example.com / test123');
    console.log('  Admin:     admin@helpearly.com / admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    console.error('\nMake sure PostgreSQL is running and the database exists.');
    console.error('Create it with: createdb helpearly');
    process.exit(1);
  }
}

initDB();
