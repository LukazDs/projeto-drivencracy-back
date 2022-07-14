import { Router } from 'express';
import { getResultVote, insertVote } from '../controllers/votesController.js';
import validateVote from '../middlewares/validateVote.js';

const router = Router();

router.post('/choice/:id/vote', validateVote, insertVote)
router.get('/poll/:id/result', getResultVote)

export default router;