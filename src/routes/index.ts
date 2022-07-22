import { Router } from 'express';
import characters from './characters';
import users from './users';

const router = Router();

router.use('/users', users);
router.use('/characters', characters);

export default router;
