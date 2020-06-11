import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 13;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        minlength: [3, 'Username is too short, minimum length is 3 characters'],
        maxlength: [14, 'Maximum username length is 14 characters'],
        unique: 'That username is already in use',
        required: 'Username is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'That email is already in use.',
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email address.'],
        required: 'Email is required'
    },
    password: {
        type: String,
        required: "Password is required"
    },
    salt: String
}, { timestamps: true })

UserSchema.pre('save', function(next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) throw new Error(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

// UserSchema
//     .virtual('password')
//     .set(function(password) {
//         this._password = password
//         this.salt = this.makeSalt()
//         this.hashed_password = this.encryptPassword(password)
//     })
//     .get(function() {
//         return this._password
//     })

UserSchema.path('password').validate(function(v) {
        if (this.password && this.password.length < 7) {
            this.invalidate('password', 'Password must be at least 7 characters.')
        }
        if (this.isNew && !this.password) {
            this.invalidate('password', 'A Password is required')
        }
    }, null)


UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha256', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },
    makeSalt: function() {
        return crypto.randomBytes(64).toString('hex') + ''
    },
    comparePassword: function comparePassword(candidatePass, cb) {
        bcrypt.compare(candidatePass, this.password, function(err, isMatch) {
            if (err) return cb(err)
            cb(null, isMatch)
        })
    },

}

export default mongoose.model('User', UserSchema)