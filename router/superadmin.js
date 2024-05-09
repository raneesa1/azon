const express = require('express');
const addSeller = require('../controller/admin/addSeller')
const updateSeller = require('../controller/admin/editSeller')
const deleteSeller = require('../controller/admin/deleteSeller')
const getAllSeller = require('../controller/admin/getAllSellers')


const authenticateJwtAdmin = require('../middleware/jwtAdminAuthentication');

const adminRouter = express.Router();

//crud on seller by admin
adminRouter.get('/sellers',authenticateJwtAdmin,getAllSeller)
adminRouter.post('/addSeller', authenticateJwtAdmin, addSeller)
adminRouter.delete('/deleteSeller/:sellerId', authenticateJwtAdmin, deleteSeller)
adminRouter.patch('/updateSeller/:sellerId', authenticateJwtAdmin, updateSeller)


module.exports = adminRouter;