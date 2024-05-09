const ProductModel = require('../../model/product');
const extractSellerIdFromToken = require('../../util/extractSellerIdFromToken');
const { isValidObjectId } = require('../../util/objectIdValidator');
const uploadImagesToCloudinary = require('../../service/cloudinary');
const validateEditProductInput = require('../../util/editProductValidator')

const editProduct = async (req, res, next) => {
    try {
        const sellerId = extractSellerIdFromToken(req);
        if (!sellerId || !isValidObjectId(sellerId)) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const { productId } = req.params;
        if (!isValidObjectId(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID format" });
        }

        const { data } = req.body;
        const errors = validateEditProductInput(data);
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ success: false, errors });
        }
        const { name, image, stock, price } = req.body.data;
        const product = await ProductModel.findOne({ _id: productId, seller: sellerId });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        console.log(product, "consoling product details before editing")

        if (image) {
            const uploadedImages = await uploadImagesToCloudinary(image);
            product.image = uploadedImages;
        }

        if (name) product.name = name;
        if (stock) product.stock = stock;
        if (price) product.price = price;

        await product.save();

        console.log(product, "product after updating the product")
        res.status(200).json({ success: true, message: "Product updated successfully", product });
    } catch (error) {
        next(error);
        console.error('Error in editing product:', error);
    }
};

module.exports = editProduct;