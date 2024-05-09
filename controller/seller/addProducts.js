const jwt = require('jsonwebtoken');
const ProductModel = require('../../model/product');
const validateProduct = require('../../util/addProductValidator');
const extractSellerIdFromToken = require('../../util/extractSellerIdFromToken');
const uploadImagesToCloudinary = require('../../service/cloudinary')
const { isValidObjectId } = require('../../util/objectIdValidator')


const addProduct = async (req, res, next) => {
    try {
        const { name, image, stock, price } = req.body;

        const sellerId = extractSellerIdFromToken(req);
        if (!sellerId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const { errors, isValid } = validateProduct({ name, image, stock, price });
        if (!isValid) {
            return res.status(400).json({ success: false, errors });
        }

        const uploadedImages = await uploadImagesToCloudinary(image);

        console.log(uploadedImages, 'image string ')
        const newProduct = new ProductModel({
            seller: sellerId,
            name,
            image: uploadedImages,
            stock,
            price,
            date: new Date()
        });

        await newProduct.save();

        res.status(200).json({ success: true, message: "Product added successfully", product: newProduct });
    } catch (error) {
        next(error)
      
    }
};

module.exports = addProduct;
