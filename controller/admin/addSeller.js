const SellerModel = require('../../model/users');
const validateUserData = require('../../util/SellerValidator');
const HashPassword = require('../../util/hashPassword')


const addSeller = async (req, res, next) => {
    try {

        const { email, password, role } = req.body;

        if (!req.body?.email) throw new Error("Please provide email ");
        if (!req.body?.password) throw new Error("Please provide password");

        const validationResult = validateUserData(email, password);
        if (!validationResult.valid) {
            throw new Error(validationResult.message);
        }

        const existingUser = await SellerModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: "seller already exists with this email",
            });
        }

        const hashedPassword = await HashPassword(password, 10);

        const newUser = new SellerModel({
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();

        res.status(200).json({
            status: true,
            message: "seller created successfully",
            user: newUser,
        });
    } catch (error) {
        console.error('Error in adding user:', error);
        next(error);
    }
};

module.exports = addSeller;
