const User = require('../models/user-model')

createUser = async (req, res) => {
  try {
    const { name, email, username, password, role } = req.body
    if (!name || !email || !username || !password || ![0, 1].includes(role)) { return res.status(400).send("Please send the name, email, username, password, role") }
    const ExistUser = await User.aggregate([
      { $match: { $or: [{ email: email }, { username: username }] } },
      { $project: { email: 1, username: 1 } }
    ])
    if (ExistUser && ExistUser.length) {
      return res.status(400).send("Email Address and username Already Exist Please Give Different Email Address and username")
    }
    req.body['createdBy'] = req.user._id
    const user = new User(req.body)
    await user.save()
    res.status(200).send({ message: 'User Created SuccessFully', data: user })
  } catch (error) {
    return res.status(500).send(error)
  }
}

updateUser = async (req, res) => {
  try {
    await User.updateOne({ _id: req.params._id }, req.body)
    res.status(200).send({ message: 'User Update SuccessFully' })
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = {
  createUser,
  updateUser,
}