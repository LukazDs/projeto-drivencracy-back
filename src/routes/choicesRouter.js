import { Router } from 'express';
import { getChoice, insertChoice } from '../controllers/choicesController.js';

const router = Router();

router.post('/choice', insertChoice);
router.get('/poll/:id/choice', getChoice)

export default router;