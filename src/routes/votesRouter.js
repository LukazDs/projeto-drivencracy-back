import { Router } from 'express';
import { getResultVote, insertVote } from '../controllers/votesController.js';

const router = Router();

router.post('/choice/:id/vote', insertVote)
router.get('/poll/:id/result', getResultVote)

export default router;