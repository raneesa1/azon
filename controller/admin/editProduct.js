const ProductModel = require('../../model/product');
const { isValidObjectId } = require('../../util/objectIdValidator')
const uploadImagesToCloudinary = require('../../service/cloudinary')
const validateEditProductInput = require('../../util/editProductValidator')
const editProductByAdmin = async (req, res, next) => {
    try {
        const { sellerId, productId } = req.params;

        if (!isValidObjectId(sellerId)) {
            return res.status(400).json({ success: false, message: "Invalid seller ID format" });
        }
        if (!isValidObjectId(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID format" });
        }
        const { data } = req.body;
        const errors = validateEditProductInput(data);
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ success: false, errors });
        }

        const { name, image, stock, price } = req.body.data;
        const product = await ProductModel.findById(productId);

        console.log(product, "consoling product details before editing")

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (image) {
            const uploadedImages = await uploadImagesToCloudinary(image);
            product.image = uploadedImages;
        }

        if (name) product.name = name;
        if (stock) product.stock = stock;
        if (price) product.price = price;

        await product.save();

        res.status(200).json({ success: true, message: "Product updated successfully", product });
    } catch (error) {
        next(error)
        console.error('Error in editing product by admin:', error);

    }
};

module.exports = editProductByAdmin;
