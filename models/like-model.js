const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let softDelete = require('mongoosejs-soft-delete');


const Like = new Schema({
    pattern: { type: String, trim: true },
    likeBy: { type: mongoose.Types.ObjectId, ref: 'user' },
    messageId: { type: mongoose.Types.ObjectId, ref: 'message' },
}, { timestamps: true })

Like.plugin(softDelete)
Like.pre('find', function () {
    this.where({ deleted: !true });
});
module.exports = mongoose.model('Like', Like)