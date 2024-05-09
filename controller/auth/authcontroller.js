// services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../../model/users');
const validateUserData = require('../../util/SellerValidator');
const HashPassword = require('../../util/hashPassword')
const generateJwt = require('../../service/jwt');



const signup = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        const userRole = role || 'seller';

        if (!req.body?.email) throw new Error("Please provide email");
        if (!req.body?.password) throw new Error("Please provide password");

        const validationResult = validateUserData(email, password);
        if (!validationResult.valid) {
            throw new Error(validationResult.message);
        }
        const emailExist = await UserModel.findOne({ email });
        if (emailExist) {
            throw new Error("User already exists with this email");
        }
        const hashedPassword = await HashPassword(password, 10);

        const newUser = new UserModel({
            email,
            password: hashedPassword,
            role: userRole
        });
        await newUser.save();
        const accessToken = generateJwt({ userId: newUser._id, role: userRole });


        const cookieName = userRole === 'admin' ? 'AdminJwtToken' : 'SellerJwtToken';

        res.cookie(cookieName, accessToken, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ status: true, message: "User created successfully", user: newUser, role });
    } catch (error) {
        next(error)
        
    }
}


const login = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        const userRole = role || 'seller';
        const userExist = await UserModel.findOne({ email });
        if (!userExist) {
            throw new Error("User not registered");
        }

        const passCompare = await bcrypt.compare(password, userExist.password);
        if (!passCompare) {
            throw new Error("Incorrect email or password");
        }

        const accessToken = generateJwt({
            userId: userExist._id,
            role: userExist.role,
        });
        const cookieName = userRole === 'admin' ? 'AdminJwtToken' : 'SellerJwtToken';
        res.cookie(cookieName, accessToken, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            status: true,
            message: "Successful",
            user: userExist,
            role: userExist.role,
        });
    } catch (error) {
        next(error);
    }
};

const adminLogout = async (req, res,next) => {
    try {

        const cookieName = req.cookies.AdminJwtToken
        res.clearCookie(cookieName); 
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
       next(error)
    }
};


const sellerLogout = async (req, res,next) => {
    try {

        const cookieName = req.cookies.SellerJwtToken
        res.clearCookie(cookieName);
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
       next(error)
    }
};




module.exports = { signup, login, adminLogout, sellerLogout };
