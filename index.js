import express from 'express';
import cors from 'cors';
import patientsRoutes from './routes/patients.js';
import doctorsRoutes from './routes/doctors.js';
import consultationsRoutes from './routes/consultation.js';
import symptomsRoutes from './routes/symptoms.js';
import pool from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/patients', patientsRoutes);
app.use('/doctors', doctorsRoutes);
app.use('/consultation', consultationsRoutes);
app.use('/symptoms', symptomsRoutes);

app.post('/login', async (req, res) => {
  console.log("Login route hit", req.body);
  const { id, password, role } = req.body;

  try {
    let query = '';
    if (role === 'patient') {
      query = 'SELECT * FROM patients WHERE name = $1 AND password = $2';
    } else if (role === 'doctor') {
      query = 'SELECT * FROM doctors WHERE name = $1 AND password = $2';
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const result = await pool.query(query, [id, password]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      return res.status(200).json({ id: user.id, name: user.name });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
