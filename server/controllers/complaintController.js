const pool = require('../config/db');

exports.getComplaintContacts = async (req, res) => {
  try {
    const result = await pool.query(`
      WITH contacts AS (
        SELECT hu.id, hu.name, hu.role
        FROM bookings b
        JOIN helpers h ON b.helper_id = h.id
        JOIN users hu ON h.user_id = hu.id
        WHERE b.user_id = $1 AND hu.is_active = true

        UNION

        SELECT u.id, u.name, u.role
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN helpers h ON b.helper_id = h.id
        WHERE h.user_id = $1 AND u.is_active = true

        UNION

        SELECT u.id, u.name, u.role
        FROM job_applications ja
        JOIN helpers h ON ja.helper_id = h.id
        JOIN jobs j ON ja.job_id = j.id
        JOIN users u ON j.user_id = u.id
        WHERE h.user_id = $1 AND ja.status = 'accepted' AND u.is_active = true

        UNION

        SELECT hu.id, hu.name, hu.role
        FROM job_applications ja
        JOIN helpers h ON ja.helper_id = h.id
        JOIN users hu ON h.user_id = hu.id
        JOIN jobs j ON ja.job_id = j.id
        WHERE j.user_id = $1 AND ja.status = 'accepted' AND hu.is_active = true
      )
      SELECT DISTINCT id, name, role FROM contacts WHERE id != $1 ORDER BY name
    `, [req.user.id]);

    res.json(result.rows);
  } catch (error) {
    console.error('GetComplaintContacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createComplaint = async (req, res) => {
  try {
    const { accused_id, subject, description } = req.body;

    if (!accused_id || !subject || !description) {
      return res.status(400).json({ message: 'Accused user, subject, and details are required' });
    }

    if (Number(accused_id) === req.user.id) {
      return res.status(400).json({ message: 'You cannot complain about yourself' });
    }

    const accused = await pool.query(
      'SELECT id FROM users WHERE id = $1 AND is_active = true',
      [accused_id]
    );
    if (accused.rows.length === 0) {
      return res.status(404).json({ message: 'User is unavailable' });
    }

    const result = await pool.query(
      `INSERT INTO complaints (complainant_id, accused_id, subject, description)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.user.id, accused_id, subject.trim(), description.trim()]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('CreateComplaint error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyComplaints = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, au.name as accused_name, au.role as accused_role
      FROM complaints c
      JOIN users au ON c.accused_id = au.id
      WHERE c.complainant_id = $1
      ORDER BY c.created_at DESC
    `, [req.user.id]);

    res.json(result.rows);
  } catch (error) {
    console.error('GetMyComplaints error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const { status } = req.query;
    const params = [];
    let where = '';

    if (status) {
      params.push(status);
      where = `WHERE c.status = $${params.length}`;
    }

    const result = await pool.query(`
      SELECT c.*, cu.name as complainant_name, cu.role as complainant_role,
             au.name as accused_name, au.role as accused_role
      FROM complaints c
      JOIN users cu ON c.complainant_id = cu.id
      JOIN users au ON c.accused_id = au.id
      ${where}
      ORDER BY c.created_at DESC
    `, params);

    res.json(result.rows);
  } catch (error) {
    console.error('GetAllComplaints error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;

    const result = await pool.query(
      `UPDATE complaints
       SET status = COALESCE($1, status), admin_notes = COALESCE($2, admin_notes),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [status, admin_notes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('UpdateComplaint error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
