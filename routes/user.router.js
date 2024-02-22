const express = require('express')
const userCtrl = require('../controllers/user.ctrl')
const auth = require('../middlewares/auth.middleware')

const router = express.Router()
router.post('/create', auth, userCtrl.createUser);
router.post('/update/:_id', auth, userCtrl.updateUser);

module.exports = router