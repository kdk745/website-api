import express from 'express';
import {signUp, signIn, loginFromToken} from '../controllers/AuthenticationController';
import passport from 'passport';
import '../services/passport';

const router = express.Router();
const signinStrategy = passport.authenticate('signinStrategy', { session: false });
router.post('/login', signinStrategy, signIn);
router.post('/checklogin', loginFromToken);
router.post('/restaurant/signup', signUp);
router.post('/guest/signup', signUp);

export default router;
