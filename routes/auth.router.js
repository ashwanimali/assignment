const express = require('express')
const authCtrl = require('../controllers/auth.ctrl')
const auth = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/login', authCtrl.login);
router.get('/logout', auth, authCtrl.logout);

module.exports = router