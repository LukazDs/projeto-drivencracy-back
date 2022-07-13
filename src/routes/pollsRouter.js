import { Router } from 'express';
import { insertPoll } from '../controllers/pollsController.js';

const router = Router();

router.post('/poll', insertPoll);

export default router;