
const express = require('express')
const messageCtrl = require('../controllers/message.ctrl')
const auth = require('../middlewares/auth.middleware')

const router = express.Router()
router.post('/send', auth, messageCtrl.sendMessage);
router.get('/find/:_id', auth, messageCtrl.findMessage);
router.post('/like', auth, messageCtrl.likeMessage);
router.get('/getlikes/:messageId', auth, messageCtrl.getLikes);
router.delete('/delete/:_id', auth, messageCtrl.deleteMessage);

module.exports = router