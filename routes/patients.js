import express from 'express';
const router = express.Router();
import {
  getAllPatients,
  createPatient,
  getPatientById,
  deletePatient
} from '../controllers/patientsController.js';

router.get('/', getAllPatients);
router.post('/', createPatient);
router.get('/:id', getPatientById);
router.delete('/:id', deletePatient);
export default router;

