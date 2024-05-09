const SellerModel = require('../../model/users');
const validateUser = require('../../util/SellerValidator');
const { isValidObjectId } = require('../../util/objectIdValidator')


const editSeller = async (req, res, next) => {
    try {
        const { sellerId } = req.params;
        const { email, role } = req.body;

        if (!isValidObjectId(sellerId)) {
            return res.status(400).json({ success: false, message: "Invalid seller ID format" });
        }

        const { errors, isValid } = validateUser({ email });
        if (!isValid) {
            return res.status(400).json({ success: false, errors });
        }

        const existingUser = await SellerModel.findById(sellerId);
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "Seller not found",
            });
        }
        if (email) existingUser.email = email;
        if (role !== undefined) {
            if (role) existingUser.role = role;
        }
        await existingUser.save();

        res.status(200).json({
            success: true,
            message: "Seller updated successfully",
            user: existingUser,
        });
    } catch (error) {
        console.error('Error in editing user:', error);
        next(error);
    }
};

module.exports = editSeller;
