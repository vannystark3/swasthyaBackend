import pool from '../db.js';

// Get all symptoms
export const getAllSymptoms = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM symptoms ORDER BY id`);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get symptom by ID
export const getSymptomById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM symptoms WHERE id = $1`, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Symptom not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new symptom
export const createSymptom = async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO symptoms (name, description) VALUES ($1, $2) RETURNING *`,
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update symptom
export const updateSymptom = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    // Check if exists
    const check = await pool.query(`SELECT * FROM symptoms WHERE id = $1`, [id]);
    if (check.rows.length === 0) return res.status(404).json({ error: 'Symptom not found' });

    const updated = await pool.query(
      `UPDATE symptoms SET name = $1, description = $2 WHERE id = $3 RETURNING *`,
      [name || check.rows[0].name, description || check.rows[0].description, id]
    );
    res.json(updated.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete symptom
export const deleteSymptom = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`DELETE FROM symptoms WHERE id = $1 RETURNING *`, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Symptom not found' });
    res.json({ message: 'Symptom deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
