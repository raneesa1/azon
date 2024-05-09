const express = require('express');
const router = express.Router();

const authController = require('../controller/auth/authcontroller')

router.post('/login', authController.login)
router.post('/signup', authController.signup)
router.post('/admin/logout', authController.adminLogout)
router.post('/seller/logout', authController.sellerLogout)

module.exports = router;
