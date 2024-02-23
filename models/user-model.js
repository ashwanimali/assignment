const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let softDelete = require('mongoosejs-soft-delete');


const User = new Schema({
    name: { type: String, trim: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'user' },
    email: { type: String, trim: true, required: true },
    username: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    role: { type: String },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, { timestamps: true })

User.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

User.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}
User.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email })
    if (!user) {
        return user;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login password' })
    }
    return user
}

User.plugin(softDelete)
User.pre('find', function () {
    this.where({ deleted: !true });
});
module.exports = mongoose.model('user', User)