const express = require('express');
const multer = require('multer')
const router = express.Router();

const ownerController = require('../controller/owner')
const adminController = require('../controller/superadmin')

router.post('/', ownerController.login)
router.post('/signup',ownerController.signup)



module.exports = router;