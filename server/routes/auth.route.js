import express from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router()

router.route('/auth/signin')
    .post(authController.signIn)
router.route('/auth/signout')
    .post(authController.signOut)

export default router