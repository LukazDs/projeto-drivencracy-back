import { Router } from 'express';
import { insertChoice } from '../controllers/choicesController.js';

const router = Router();

router.post('/choice', insertChoice);

export default router;