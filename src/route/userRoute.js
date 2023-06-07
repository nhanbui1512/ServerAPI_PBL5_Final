import userController from '../controllers/userController';

const express = require('express');
const router = express.Router();
 



router.get('/statisticday',userController.statisticDay)
router.get('/logout',userController.logOut)
router.get('/profile',userController.profile)
router.get('/',userController.index)
router.get('/password', userController.passwordPage)

router.post('/changeprofile',userController.changeprofile)
router.post('/changepassword',userController.changePassword)
module.exports = router;