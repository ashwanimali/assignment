const UserRouter = require('./user.router')
const GroupRouter = require('./group.router')
const AuthRouter = require('./auth.router')
const MessageRouter = require('./message.router')

module.exports = function (app) {
    app.use('/api/user', UserRouter)
    app.use('/api/group', GroupRouter)
    app.use('/api/auth', AuthRouter)
    app.use('/api/message', MessageRouter)
}