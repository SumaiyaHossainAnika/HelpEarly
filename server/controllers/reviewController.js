const pool = require('../config/db');

// Submit a review
exports.createReview = async (req, res) => {
  try {
    const { helper_id, booking_id, rating, comment } = req.body;

    // Check if booking exists and is completed
    if (booking_id) {
      const booking = await pool.query(
        'SELECT * FROM bookings WHERE id = $1 AND user_id = $2',
        [booking_id, req.user.id]
      );
      if (booking.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid booking' });
      }
    }

    // Check duplicate review
    if (booking_id) {
      const existing = await pool.query(
        'SELECT id FROM reviews WHERE booking_id = $1 AND user_id = $2',
        [booking_id, req.user.id]
      );
      if (existing.rows.length > 0) {
        return res.status(400).json({ message: 'You already reviewed this booking' });
      }
    }

    const result = await pool.query(
      `INSERT INTO reviews (user_id, helper_id, booking_id, rating, comment)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [req.user.id, helper_id, booking_id, rating, comment]
    );

    // Update helper's average rating
    const ratingResult = await pool.query(
      `SELECT AVG(rating)::DECIMAL(3,2) as avg_rating, COUNT(*) as total_reviews
       FROM reviews WHERE helper_id = $1`,
      [helper_id]
    );
    await pool.query(
      `UPDATE helpers SET avg_rating = $1, total_reviews = $2 WHERE id = $3`,
      [ratingResult.rows[0].avg_rating, ratingResult.rows[0].total_reviews, helper_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('CreateReview error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get reviews for a helper
exports.getHelperReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const result = await pool.query(`
      SELECT r.*, u.name as reviewer_name, u.avatar_url as reviewer_avatar
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.helper_id = $1
      ORDER BY r.created_at DESC
      LIMIT $2 OFFSET $3
    `, [id, parseInt(limit), parseInt(offset)]);

    const countResult = await pool.query(
      'SELECT COUNT(*) FROM reviews WHERE helper_id = $1', [id]
    );

    res.json({
      reviews: result.rows,
      total: parseInt(countResult.rows[0].count),
    });
  } catch (error) {
    console.error('GetHelperReviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
