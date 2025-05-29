import pool from '../db.js';

export const getAllConsultations = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * from consultations`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getConsultationById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT c.*, p.name as patient_name, d.name as doctor_name
       FROM consultations c
       JOIN patients p ON c.patient_id = p.id
       JOIN doctors d ON c.doctor_id = d.id
       WHERE c.id = $1`,
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Consultation not found' });

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createConsultation = async (req, res) => {
  const { patient_id, doctor_id, symptoms, diagnosis, urgency } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO consultations (patient_id, doctor_id, symptoms, diagnosis, urgency)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [patient_id, doctor_id, symptoms, diagnosis || null, urgency || false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateConsultation = async (req, res) => {
  const { id } = req.params;
  const { patient_id, doctor_id, symptoms, diagnosis, urgency } = req.body;
  try {
    const result = await pool.query(
      `UPDATE consultations
       SET patient_id = $1, doctor_id = $2, symptoms = $3, diagnosis = $4, urgency = $5
       WHERE id = $6 RETURNING *`,
      [patient_id, doctor_id, symptoms, diagnosis || null, urgency || false, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Consultation not found' });

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteConsultation = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM consultations WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Consultation not found' });

    res.json({ message: 'Consultation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
