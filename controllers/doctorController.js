import pool from '../db.js';

export const getAllDoctors = async (req, res) => {
  const result = await pool.query('SELECT * FROM doctors ORDER BY id DESC');
  res.json(result.rows);
};

export const getDoctorById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM doctors WHERE id = $1', [id]);
  result.rows.length
    ? res.json(result.rows[0])
    : res.status(404).json({ error: 'Doctor not found' });
};

export const createDoctor = async (req, res) => {
  const { name, specialization, email, phone } = req.body;
  const result = await pool.query(
    'INSERT INTO doctors (name, specialization, email, phone) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, specialization, email, phone]
  );
  res.status(201).json(result.rows[0]);
};

export const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { name, specialization, email, phone } = req.body;
  const result = await pool.query(
    'UPDATE doctors SET name = $1, specialization = $2, email = $3, phone = $4 WHERE id = $5 RETURNING *',
    [name, specialization, email, phone, id]
  );
  result.rows.length
    ? res.json(result.rows[0])
    : res.status(404).json({ error: 'Doctor not found' });
};

export const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM doctors WHERE id = $1 RETURNING *', [id]);
  result.rows.length
    ? res.json({ message: 'Doctor deleted successfully' })
    : res.status(404).json({ error: 'Doctor not found' });
};
