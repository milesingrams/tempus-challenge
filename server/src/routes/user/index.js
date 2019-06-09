import { Router } from 'express';
import passport from 'passport';
import * as userController from './userController';

let router = new Router()

router.post('/signUp', userController.signUp);
router.post('/signIn', passport.authenticate('local'), userController.signIn);
router.get('/signOut', userController.signOut);

router.get('/patients', userController.getPatients);
router.get('/me', userController.getMe);
router.get('/:userId', userController.getById);

export default router;
