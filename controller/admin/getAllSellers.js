const SellerModel = require('../../model/users');

const getAllSeller = async (req, res,next) => {
    try {
        const users = await SellerModel.find({ role: "seller", deleted: false });
        res.status(200).json({
            status: true,
            message: "Successful",
            users,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getAllSeller;
