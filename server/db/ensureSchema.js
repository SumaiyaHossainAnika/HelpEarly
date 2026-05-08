const pool = require('../config/db');

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS complaints (
      id SERIAL PRIMARY KEY,
      complainant_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      accused_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      subject VARCHAR(200) NOT NULL,
      description TEXT NOT NULL,
      status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'reviewing', 'resolved', 'dismissed')),
      admin_notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_complaints_complainant_id ON complaints(complainant_id);
    CREATE INDEX IF NOT EXISTS idx_complaints_accused_id ON complaints(accused_id);
    CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
  `);
}

module.exports = ensureSchema;
