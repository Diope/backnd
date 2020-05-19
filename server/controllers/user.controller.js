import User from '../models/User.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'

// Might change to search by username and make username unique.
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user) return res.status('400').json({error: "User cannot be found"})
        req.profile = user
        next()
    } catch (err) {
        return res.status('400').json({error: "Could not retrieve user"})
    }
}
const create = async (req, res, next) => {
    const username = req.body.username
    const email = req.body.email
    let _user = await User.findOne({$or:[{username}, {email}]})

    try {
        if (null != _user) {
            if (email === _user.email) {
                return res.status(409).json({message: `The email ${email} is already in use, please choose another`})
            }else if( username === _user.username) {
                return res.status(409).json({message: `The username ${username} is already in use please choose another.`})
            }
        }
        User.create(req.body)
        return res.status(200).json({
            message: `You have successfully signed up with the username: ${req.body.username}`
        })
    } catch (err) {
        return res.status(400).json({error: errorHandler.getErrorMessage(err)})
    }
}


const read = async (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}
const update = async (req, res, next) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updatedAt = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const remove = async (req, res, next) => {
    try {
        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}
const list = async (req, res) => {
    try {
        let users = await User.find().select('username email updated created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default {userByID, create, read, update, remove, list}
