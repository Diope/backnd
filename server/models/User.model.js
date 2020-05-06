import mongoose from 'mongoose';
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'That email is already in use.',
        match: [/.+\@.+\..+/, 'Please provide a valid email address.'],
        required: 'Email is required'
    },
    hashed_password: {
        type: String,
        required: "Password is required"
    },
    Salt: String
}, { timestamps: true })

UserSchema
    .path('hashed_password').validate(function(v) {
        if (this._password && this._password.length < 7) {
            this.invalidate('password', 'Password must be at least 7 characters.')
        }
        if (this.isNew && !this._password) {
            this.invalidate('password', 'A Password is required')
        }
    }, null)

UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })

UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('shal', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

export default mongoose.model('User', UserSchema)