import { Router } from 'express';
import { getPolls, insertPoll } from '../controllers/pollsController.js';

const router = Router();

router.post('/poll', insertPoll);
router.get('/poll', getPolls);

export default router;