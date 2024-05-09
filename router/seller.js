
const express = require('express');
const sellerRouter = express.Router();
const addProduct = require('../controller/seller/addProducts')
const editProduct = require('../controller/seller/editProducts')
const deleteProduct = require('../controller/seller/deleteProducts')
const getProducts = require('../controller/seller/getAllProducts')
const authenticateUser = require('../middleware/jwtSellerAuthentication')

//operations by seller
sellerRouter.get('/products', authenticateUser, getProducts)
sellerRouter.post('/addproduct', authenticateUser, addProduct)
sellerRouter.delete('/deleteproduct/:productId', authenticateUser, deleteProduct)
sellerRouter.patch('/editproduct/:productId', authenticateUser, editProduct)


module.exports = sellerRouter;


