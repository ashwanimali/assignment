const User = require('../models/user-model');

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res
                .status(400)
                .send({ error: 'Please send the email and password' })
        }
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res
                .status(401)
                .send({ error: 'Login failed! Check authentication credentials' })
        }
        const authToken = await user.generateAuthToken()
        return res.status(200).send({ user, authToken, message: "Login Successfully" })
    } catch (error) {
        return res.status(500).send(error)
    }
};

const logout = async (req, res) => {
    try {
        await User.updateOne({ _id: req.user._id },
            {
                tokens: []
            })
        return res.status(200).send({ message: "LogOut Successfully" })
    } catch (error) {
        return res.status(500).send(error)
    }
};

module.exports = {
    login,
    logout
};