const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_JWT_KEY;

const userSchema = new mongoose.Schema({
    provider: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9_]+$/, 'is invalid'],
        index: true,
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 20,
    },
    name: String,
    avatar: String,
    role: {
        type: String,
        default: 'USER',
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true,
    }
    /* Add more social providers or more things, like messages/bio/etc. */
}, { timestamps: true });

userSchema.methods.toJSON = function () {
    return {
        id: this._id,
        provider: this.provider,
        email: this.email,
        username: this.username,
        avatar: this.avatar,
        name: this.name,
        role: this.role,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
}

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        id: this._id,
        provider: this.provider,
        email: this.email
    }, secretKey, { expiresIn : '100d' });
    return token;
}

module.exports = mongoose.model('User', userSchema);
