import { Router } from 'express';
import userRoutes from './user';

let router = new Router()

router.use('/user', userRoutes);

export default router;
