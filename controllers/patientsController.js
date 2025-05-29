import db from '../db.js';

export const getAllPatients = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM patients');
  res.json(rows);
};

export const createPatient = async (req, res) => {
  const { name, age, gender, contact_number, email, address, password } = req.body;
  const { rows } = await db.query(
    `INSERT INTO patients (name, age, gender, contact_number, email, address, password)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [name, age, gender, contact_number, email, address, password]
  );
  res.status(201).json(rows[0]);
};

export const getPatientById = async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM patients WHERE patient_id = $1', [id]);
  if (!rows.length) return res.status(404).json({ msg: 'Patient not found' });
  res.json(rows[0]);
};

export const deletePatient = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM patients WHERE patient_id = $1', [id]);
  res.json({ msg: 'Patient deleted' });
};
