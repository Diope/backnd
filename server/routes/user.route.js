import express from 'express'
import userController from '../controllers/user.controller'

const router = express.Router()

router.route('/api/users')
    .get(userController.list)
    .post(userController.create)

router.route('/api/users/:userId')
    .get(userController.read)
    .put(userController.update)
    .delete(userController.remove)

router.param('userId', userController.userByID)

export default router

// This is a much better approach than what I did in Drybbble which at times made it hard to keep up when I made changes