

const Group = require('../models/group-model');

const createGroup = async (req, res) => {
    try {
        console.log({ user: req.user })
        const groupBody = {
            name: req.body.name,
            createdBy: req.user._id,
            usersId: [req.user._id],
        }
        const group = new Group(groupBody)
        await group.save()
        res.status(200).send({ message: 'Group Created SuccessFully', data: {} })
    } catch (error) {
        console.log("err", error)
        return res.status(500).send(error)
    }
};

const deleteGroup = async (req, res) => {
    try {
        await Group.findByIdAndRemove({ _id: req.params._id })
        return res.status(200).send({ message: 'Group Deleted SuccessFully', data: {} })
    } catch (error) {
        return res.status(500).send({ "Error": error })
    }
};

const searchGroups = async (req, res) => {
    try {
        const group = await Group.findOne({ name: req.params.name })
        res.status(200).send({ message: "Group find SuccessFully", data: group })
    } catch (error) {
        return res.status(500).send(error)
    }
};

const addMembersToGroup = async (req, res) => {
    try {
        var group = await Group.updateOne(
            { _id: req.params._id },
            {
                $push: {
                    usersId: req.body.userId
                }
            }
        )
        res.status(200).send({ message: "User Added to Group SuccessFully", data: group })
    } catch (error) {
        return res.status(500).send(error)
    }
};

module.exports = {
    createGroup,
    deleteGroup,
    searchGroups,
    addMembersToGroup
};
