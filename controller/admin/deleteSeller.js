const SellerModel = require('../../model/users');
const { isValidObjectId } = require('../../util/objectIdValidator')

const deleteSeller = async (req, res, next) => {
    try {
        const { sellerId } = req.params;

        if (!isValidObjectId(sellerId)) {
            return res.status(400).json({ success: false, message: "Invalid seller ID format" });
        }

        const seller = await SellerModel.findById(sellerId);
        if (!seller) {
            return res.status(400).json({ status: false, message: "seller not found" });
        }

        seller.deleted = true;
        await seller.save();

        res.status(200).json({ status: true, message: "seller deleted successfully" });
    } catch (error) {
        next(error)

    }
}

module.exports = deleteSeller;