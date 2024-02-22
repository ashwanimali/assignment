const jwt = require('jsonwebtoken')
const User = require('../models/user-model')


const auth = async (req, res, next) => {
  if (req.header('Authorization')) {
    const token = req.header('Authorization')
    const data = jwt.verify(token, process.env.JWT_KEY)
    var isAuthorize = false
    try {
      var user = await User.findOne({ _id: data._id, 'tokens.token': token })
      if (user) {
        req.user = user
        req.token = token
        isAuthorize = true
        next()
      }
    } catch (error) {
      return res
        .status(500)
        .send({ error: 'Not authorized to access this resource' })
    }
  } else {
    return res
      .status(401)
      .send({ error: 'Not authorized to access this resource' })
  }
}


module.exports = auth


