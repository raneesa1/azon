const SellerModel = require('../../model/users');
const { isValidObjectId } = require('../../util/objectIdValidator')

const deleteSeller = async (req, res, next) => {
    try {
        const { sellerId } = req.params;

        if (!isValidObjectId(sellerId)) {
            return res.status(400).json({ success: false, message: "Invalid seller ID format" });
        }

        const user = await SellerModel.findById(sellerId);
        if (!user) {
            return res.status(400).json({ status: false, message: "seller not found" });
        }

        await SellerModel.findByIdAndDelete(sellerId);

        res.status(200).json({ status: true, message: "seller deleted successfully" });
    } catch (error) {
        next(error)
        console.error('Error in deleting user:', error);

    }
}

module.exports = deleteSeller;