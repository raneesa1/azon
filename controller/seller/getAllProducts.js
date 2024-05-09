const jwt = require('jsonwebtoken');
const ProductModel = require('../../model/product');
const extractSellerIdFromToken = require('../../util/extractSellerIdFromToken');

const getAllSellerProducts = async (req, res, next) => {
    try {
        
        const sellerId = extractSellerIdFromToken(req);
        if (!sellerId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        

        const products = await ProductModel.find({ seller: sellerId });

        console.log(products)
        res.status(200).json({
            status: true,
            message: "Products retrieved successfully",
            products,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getAllSellerProducts;
