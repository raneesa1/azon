const ProductModel = require('../../model/product');
const SellerModel = require('../../model/users'); // Assuming this is the model for users (sellers)
const validateProduct = require('../../util/addProductValidator')
const uploadImagesToCloudinary = require('../../service/cloudinary')
const { isValidObjectId } = require('../../util/objectIdValidator')


const addProductForSeller = async (req, res, next) => {
    try {
        const { sellerId } = req.params;

        if (!isValidObjectId(sellerId)) {
            return res.status(400).json({ success: false, message: "Invalid seller ID format" });
        }
        console.log(sellerId)
        const seller = await SellerModel.findById(sellerId);
        console.log(seller)
        if (!seller) {
            return res.status(400).json({ success: false, message: "Seller not found" });
        }

        const { name, image, stock, price } = req.body;

        const { errors, isValid } = validateProduct({ name, image, stock, price });
        if (!isValid) {
            return res.status(400).json({ success: false, errors });
        }
        const uploadedImages = await uploadImagesToCloudinary(image);


        const newProduct = new ProductModel({
            seller: sellerId,
            name,
            image: uploadedImages,
            stock,
            price
        });

        console.log(newProduct)
        const product = await newProduct.save();

        res.status(201).json({ success: true, message: "Product created successfully", product });
    } catch (error) {
        next(error)
        console.error('Error in adding product for seller:', error);

    }
};

module.exports = addProductForSeller;
