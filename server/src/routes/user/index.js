import { Router } from 'express';
import passport from 'passport';
import * as userController from './userController';

let router = new Router()

router.post('/signUp', userController.signUp);
router.post('/signIn', passport.authenticate('local'), userController.signIn);
router.get('/signOut');

export default router;
