import userController from '../controllers/userController';

const express = require('express');
const router = express.Router();
 



router.get('/statisticday',userController.statisticDay)
router.get('/',userController.index)

module.exports = router;