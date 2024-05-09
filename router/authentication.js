const express = require('express');
const router = express.Router();

const authController = require('../controller/auth/authcontroller')

router.post('/login', authController.login)
router.post('/signup', authController.signup)
router.get('/admin_logout', authController.adminLogout)
router.get('/seller_logout', authController.sellerLogout)

module.exports = router;
