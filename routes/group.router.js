const express = require('express')
const groupCtrl = require('../controllers/group.ctrl')
const auth = require('../middlewares/auth.middleware')

const router = express.Router()
router.post('/create', auth, groupCtrl.createGroup);
router.get('/search/:name', auth, groupCtrl.searchGroups);
router.post('/addMember/:_id', auth, groupCtrl.addMembersToGroup);
router.delete('/delete/:_id', auth, groupCtrl.deleteGroup);

module.exports = router