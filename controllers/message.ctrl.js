const Message = require('../models/message-model');
const Like = require('../models/like-model')

const sendMessage = async (req, res) => {
    try {
        const messageBody = {
            message: req.body.message,
            sendBy: req.user._id,
            groupId: req.body.groupId,
            likesCount: 0
        }
        const message = new Message(messageBody)
        await message.save()
        res.status(200).send({ message: "Message Created SuccessFully", data: message })
    } catch (error) {
        return res.status(500).send(error)
    }
};

const findMessage = async (req, res) => {
    try {
        const message = await Message.findOne({ _id: req.params._id })
        res.status(200).send({ message: "Message Find SuccessFully", data: message })
    } catch (error) {
        return res.status(500).send(error)
    }
}

const deleteMessage = async (req, res) => {
    try {
        await Message.findByIdAndRemove({ _id: req.params._id })
        res.status(200).send({ message: "Message Deleted SuccessFully", data: {} })
    } catch (error) {
        return res.status(500).send(error)
    }
}
const likeMessage = async (req, res) => {
    try {
        const likeBody = {
            pattern: req.body.pattern,
            likeBy: req.user._id,
            messageId: req.body.messageId,
        }
        const like = new Like(likeBody)
        await like.save()
        await Message.findOneAndUpdate({ _id: req.body.messageId }, { $inc: { likesCount: 1 } })
        res.status(200).send({ message: "Message Liked SuccessFully", data: like })
    } catch (error) {
        return res.status(500).send(error)
    }
};

const getLikes = async (req, res) => {
    try {
        const likes = await Like.find({ messageId: req.params.messageId })
        res.status(200).send({ message: "All Liked Get SuccessFully", data: likes })
    } catch (error) {
        return res.status(500).send(error)
    }
}
module.exports = {
    sendMessage,
    findMessage,
    likeMessage,
    getLikes,
    deleteMessage
};
