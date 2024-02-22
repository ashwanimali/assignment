const mongoose = require('mongoose')
const Schema = mongoose.Schema
let softDelete = require('mongoosejs-soft-delete');


const Message = new Schema({
    message: { type: String, trim: true },
    sendBy : { type: mongoose.Types.ObjectId, ref: 'user' },
    groupId: { type: mongoose.Types.ObjectId, ref: 'group' },
    likesCount: { type: Number }
}, { timestamps: true })

Message.plugin(softDelete)
Message.pre('find', function () {
    this.where({ deleted: !true });
});
module.exports = mongoose.model('Message', Message)