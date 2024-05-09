const ProductModel = require('../../model/product');
const { isValidObjectId } = require('../../util/objectIdValidator')


const getSellerProducts = async (req, res, next) => {
    try {
        const { sellerId } = req.params;

        if (!isValidObjectId(sellerId)) {
            return res.status(400).json({ success: false, message: "Invalid seller ID format" });
        }

        if (!sellerId) {
            return res.status(400).json({ success: false, message: "Seller ID is required" });
        }
        if (!isValidObjectId(sellerId)) {
            return res.status(400).json({ success: false, message: "Invalid seller ID format" });
        }

        const products = await ProductModel.find({ seller: sellerId, deleted: false });
        if (!products || products.length === 0) {
            return res.status(400).json({ success: false, message: "No products found for this seller" });
        }

        res.status(200).json({ success: true, message: "Successful", products });
    } catch (error) {
        next(error)
       
    }
};

module.exports = getSellerProducts;
