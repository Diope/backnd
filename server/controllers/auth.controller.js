import User from '../models/User.model';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import config from './../../config/config';

const signInAlt = async (req, res) => {
    const _user = await User.findOne({"email": req.body.email})
    if (!_user) return res.status('401').json({error: `The email ${req.body.email} cannot be found`})

    try {
        _user.comparePassword(req.body.password, function(err, isMatch) {
            if (!isMatch) {
                return res.json({message: "Authentication failed, password is incorrect"});
            } else {
                const token = jwt.sign({_id: _user._id}, config.jwtSecret)
                res.cookie('t', token, {expire: new Date() + 9999})
                return res.json({token, user: {_id: _user._id, username: _user.username, email: _user.email}})
            }
        });

    } catch (err) {
        return res.status('401').json({ error: "An error has occurred unable to sign in.", error: err })
    }
}


const signIn = async (req, res) => {
    try {
        
        let user = await User.findOne({"email": req.body.email})
        if (!user) return res.status('401').json({error: `The email ${req.body.email} cannot be found`})
        if (!user.authenticate(req.body.password)) return res.status('401').send({error: "Email and password do not match"})
        
        const token = jwt.sign({_id: user._id}, config.jwtSecret)

        res.cookie('t', token, {expire: new Date() + 9999})
        return res.json({token, user: {_id: user._id, username: user.username, email: user.email}})
    } catch (err) {
        return res.status('401').json({ error: "An error has occurred unable to sign in." })
    }
}
const signOut = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({messaged: "You have successfully logged out"})
}
const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id

    if (!authorized) return res.status('403').json({ error: "User is not authorized to make the attempted changes" })
    next()
}
const signInRequired = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth'
})

export default {signIn, signOut, signInAlt, hasAuthorization, signInRequired}
