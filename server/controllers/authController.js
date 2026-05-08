const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role, location, latitude, longitude } = req.body;

    // Check if user exists
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert user
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, phone, role, location, latitude, longitude)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, name, email, phone, role, location, avatar_url, created_at`,
      [name, email, password_hash, phone, role || 'household', location, latitude, longitude]
    );

    const user = result.rows[0];

    // If helper role, create helper profile
    if (role === 'helper') {
      const { bio, hourly_rate, experience_years, selectedCategories } = req.body;
      const helperResult = await pool.query(
        `INSERT INTO helpers (user_id, bio, hourly_rate, experience_years)
         VALUES ($1, $2, $3, $4) RETURNING id`,
        [user.id, bio || '', hourly_rate || 0, experience_years || 0]
      );

      // Insert selected categories
      const helperId = helperResult.rows[0].id;
      if (selectedCategories && selectedCategories.length > 0) {
        for (const catId of selectedCategories) {
          await pool.query(
            `INSERT INTO helper_categories (helper_id, category_id, experience_years, hourly_rate)
             VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`,
            [helperId, catId, experience_years || 0, hourly_rate || 0]
          );
        }
      }
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token, user });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await pool.query(
      'SELECT id, name, email, password_hash, phone, role, location, avatar_url, is_active FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return res.status(403).json({ message: 'Account has been deactivated' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password_hash from response
    delete user.password_hash;

    res.json({ token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get current user profile
exports.getMe = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, phone, role, location, latitude, longitude, avatar_url, is_active, created_at
       FROM users WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // If helper, include helper profile
    if (user.role === 'helper') {
      const helperResult = await pool.query(
        'SELECT * FROM helpers WHERE user_id = $1',
        [user.id]
      );
      if (helperResult.rows.length > 0) {
        user.helperProfile = helperResult.rows[0];
      }
    }

    res.json(user);
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, location, latitude, longitude } = req.body;
    const avatar_url = req.file ? `/uploads/${req.file.filename}` : undefined;

    let query = `UPDATE users SET name = COALESCE($1, name), phone = COALESCE($2, phone),
                  location = COALESCE($3, location), latitude = COALESCE($4, latitude),
                  longitude = COALESCE($5, longitude), updated_at = CURRENT_TIMESTAMP`;
    const params = [name, phone, location, latitude, longitude];

    if (avatar_url) {
      query += `, avatar_url = $${params.length + 1}`;
      params.push(avatar_url);
    }

    query += ` WHERE id = $${params.length + 1} RETURNING id, name, email, phone, role, location, avatar_url`;
    params.push(req.user.id);

    const result = await pool.query(query, params);

    // If helper, update helper-specific fields
    if (req.user.role === 'helper') {
      const { bio, hourly_rate, is_available, experience_years } = req.body;
      await pool.query(
        `UPDATE helpers SET bio = COALESCE($1, bio), hourly_rate = COALESCE($2, hourly_rate),
         is_available = COALESCE($3, is_available), experience_years = COALESCE($4, experience_years),
         updated_at = CURRENT_TIMESTAMP WHERE user_id = $5`,
        [bio, hourly_rate, is_available, experience_years, req.user.id]
      );
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('UpdateProfile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change password for the logged-in user
exports.changePassword = async (req, res) => {
  try {
    const { current_password, new_password } = req.body;

    if (!current_password || !new_password) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (new_password.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    const result = await pool.query(
      'SELECT password_hash FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const matches = await bcrypt.compare(current_password, result.rows[0].password_hash);
    if (!matches) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(new_password, salt);

    await pool.query(
      'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [password_hash, req.user.id]
    );

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('ChangePassword error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
