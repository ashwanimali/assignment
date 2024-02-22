const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let softDelete = require('mongoosejs-soft-delete');


const Group = new Schema({
    name: { type: String, trim: true },
    createdBy : { type: mongoose.Types.ObjectId, ref: 'user' },
    usersId: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
}, { timestamps: true })

Group.plugin(softDelete)
Group.pre('find', function () {
    this.where({ deleted: !true });
});
module.exports = mongoose.model('Group', Group)