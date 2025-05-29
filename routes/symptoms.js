import express from 'express';
import {
  getAllSymptoms,
  getSymptomById,
  createSymptom,
  updateSymptom,
  deleteSymptom
} from '../controllers/symptomsController.js';

const router = express.Router();

router.get('/', getAllSymptoms);
router.get('/:id', getSymptomById);
router.post('/', createSymptom);
router.put('/:id', updateSymptom);
router.delete('/:id', deleteSymptom);

export default router;
