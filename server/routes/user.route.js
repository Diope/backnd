import express from 'express'
import userController from '../controllers/user.controller'
import authController from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/users')
    .get(userController.list)
    .post(userController.create)

router.route('/api/users/:userId')
    .get(authController.signInRequired, userController.read)
    .put(authController.signInRequired, authController.hasAuthorization, userController.update)
    .delete(authController.signInRequired, authController.hasAuthorization, userController.remove)

router.param('userId', userController.userByID)

export default router

// This is a much better approach than what I did in Drybbble which at times made it hard to keep up when I made changes