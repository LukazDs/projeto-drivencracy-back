import { Router } from 'express';
import { insertVote } from '../controllers/votesController.js';

const router = Router();

router.post('/choice/:id/vote', insertVote)

export default router;