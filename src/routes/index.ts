/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import characters from './characters';

const router = Router();

router.use('/characters', characters);

export default router;
