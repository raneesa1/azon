const ProductModel = require('../../model/product');
const extractSellerIdFromToken = require('../../util/extractSellerIdFromToken');
const { isValidObjectId } = require('../../util/objectIdValidator')

const deleteProduct = async (req, res, next) => {
    try {
        console.log('delete product api called');
        const { productId } = req.params; // Capture the ID from req.params

        if (!isValidObjectId(productId)) {
            return res.status(400).json({ success: false, message: "Invalid seller ID format" });
        }

        console.log(productId); // Log the captured ID

        const sellerId = extractSellerIdFromToken(req)

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

module.exports = deleteProduct;
