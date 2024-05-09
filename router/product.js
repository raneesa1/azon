const express = require('express'); 
const productRouter = express.Router()
const getAllProducts = require('../controller/admin/getProducts')
const addProduct = require('../controller/admin/addProduct')
const deleteSellerProduct = require('../controller/admin/deleteProduct')
const editSellerProduct = require('../controller/admin/editProduct')


const authenticateJwtAdmin = require('../middleware/jwtAdminAuthentication');

//product crud operations by admin
productRouter.get('/:sellerId/getProducts', authenticateJwtAdmin, getAllProducts)
productRouter.post('/:sellerId/addProduct', authenticateJwtAdmin, addProduct)
productRouter.delete('/:sellerId/deleteProduct/:productId', authenticateJwtAdmin,deleteSellerProduct);
productRouter.patch('/:sellerId/editProduct/:productId',authenticateJwtAdmin, editSellerProduct)


module.exports = productRouter;