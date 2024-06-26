const ProductModel = require('../../model/product');
const isValidObjectId = require('../../util/objectIdValidator')

const deleteSellerProduct = async (req, res ,next) => {
    try {
        const { sellerId, productId } = req.params;

        if (!isValidObjectId(sellerId)) {
            return res.status(400).json({ success: false, message: "Invalid seller ID format" });
        }
        if (!isValidObjectId(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID format" });
        }

        if (!sellerId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const product = await ProductModel.findOne({ _id: productId, seller: sellerId });
        
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        product.deleted = true;
        await product.save();

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        next(error)
        
    }
};

module.exports = deleteSellerProduct;
