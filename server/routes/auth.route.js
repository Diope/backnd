import express from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router()

router.route('/auth/signin')
    .post(authController.signInAlt)
router.route('/auth/signout')
    .post(authController.signOut)

export default router