import { Router } from 'express';
import { getChoice, insertChoice } from '../controllers/choicesController.js';
import validateChoice from '../middlewares/validateChoice.js';

const router = Router();

router.post('/choice', validateChoice, insertChoice);
router.get('/poll/:id/choice', getChoice)

export default router;