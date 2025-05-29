import express from 'express';
import {
  getAllConsultations,
  getConsultationById,
  createConsultation,
  updateConsultation,
  deleteConsultation
} from '../controllers/consultationController.js';

const router = express.Router();

router.get('/', getAllConsultations);
router.get('/:id', getConsultationById);
router.post('/', createConsultation);
router.put('/:id', updateConsultation);
router.delete('/:id', deleteConsultation);

export default router;
