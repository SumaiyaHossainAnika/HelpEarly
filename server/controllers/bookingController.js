const pool = require('../config/db');

// Create a booking
exports.createBooking = async (req, res) => {
  try {
    const { helper_id, service_id, booking_date, end_date, notes, total_price, address } = req.body;

    const helperCheck = await pool.query(`
      SELECT h.id
      FROM helpers h
      JOIN users u ON h.user_id = u.id
      WHERE h.id = $1 AND u.is_active = true
    `, [helper_id]);
    if (helperCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Helper is unavailable' });
    }

    const result = await pool.query(
      `INSERT INTO bookings (user_id, helper_id, service_id, booking_date, end_date, notes, total_price, address)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [req.user.id, helper_id, service_id, booking_date, end_date, notes, total_price, address]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('CreateBooking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's bookings (household) or helper's bookings
exports.getBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query, params;

    if (req.user.role === 'helper') {
      query = `
        SELECT b.*, u.name as client_name, u.avatar_url as client_avatar, u.phone as client_phone,
               hs.service_name, c.name as category_name, c.icon as category_icon
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN helpers h ON b.helper_id = h.id
        LEFT JOIN helper_services hs ON b.service_id = hs.id
        LEFT JOIN categories c ON hs.category_id = c.id
        WHERE h.user_id = $1 AND u.is_active = true
      `;
      params = [req.user.id];
    } else {
      query = `
        SELECT b.*, u.name as helper_name, u.avatar_url as helper_avatar, u.phone as helper_phone,
               hs.service_name, c.name as category_name, c.icon as category_icon, h.id as helper_profile_id
        FROM bookings b
        JOIN helpers h ON b.helper_id = h.id
        JOIN users u ON h.user_id = u.id
        LEFT JOIN helper_services hs ON b.service_id = hs.id
        LEFT JOIN categories c ON hs.category_id = c.id
        WHERE b.user_id = $1 AND u.is_active = true
      `;
      params = [req.user.id];
    }

    if (status) {
      params.push(status);
      query += ` AND b.status = $${params.length}`;
    }

    query += ` ORDER BY b.booking_date DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(parseInt(limit), parseInt(offset));

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('GetBookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update booking status
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Verify ownership
    const booking = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
    if (booking.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const b = booking.rows[0];
    const helperCheck = await pool.query('SELECT id FROM helpers WHERE user_id = $1', [req.user.id]);
    const isHelper = helperCheck.rows.length > 0 && helperCheck.rows[0].id === b.helper_id;
    const isClient = b.user_id === req.user.id;

    if (!isHelper && !isClient && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const result = await pool.query(
      `UPDATE bookings SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      [status, id]
    );

    // If completed, create a payment record
    if (status === 'completed' && b.total_price) {
      await pool.query(
        `INSERT INTO payments (booking_id, user_id, helper_id, amount, status)
         VALUES ($1, $2, $3, $4, 'completed')`,
        [id, b.user_id, b.helper_id, b.total_price]
      );
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('UpdateBooking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
    if (booking.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.rows[0].user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const result = await pool.query(
      `UPDATE bookings SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      [id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('CancelBooking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
