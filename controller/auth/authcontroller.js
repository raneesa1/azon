// services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../../model/users');
const firebaseService = require('../../service/firebase');
const validateUserData = require('../../util/SellerValidator');
const HashPassword = require('../../util/hashPassword')
const generateJwt = require('../../service/jwt');


//signup using firebase 
//implement role too
// const signup = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         console.log(req.body)
//         const { token } = await firebaseService.signup(email, password);
//         res.status(200).json({ success: true, token });
//     } catch (error) {
//         res.status(400).json({ success: false, error: error.message });
//         console.log(error.message, 'an error from signup');
//     }
// };

const signup = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        console.log(req.body, 'consoling body')
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

        console.log(req.body.role, 'consoling the role of signup')

        const accessToken = generateJwt({ userId: newUser._id, role: userRole });


        const cookieName = userRole === 'admin' ? 'AdminJwtToken' : 'SellerJwtToken';

        res.cookie(cookieName, accessToken, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ status: true, message: "User created successfully", user: newUser, role });
    } catch (error) {
        next(error)
        res.status(500).json({ status: false, error: error.message });
    }
}


const login = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        const userRole = role || 'seller';
        console.log(req.body)
        const userExist = await UserModel.findOne({ email });
        if (!userExist) {
            throw new Error("User not registered");
        }

        if (userExist.role !== role) {
            throw new Error("Please recheck your role and login")
        }

        const passCompare = await bcrypt.compare(password, userExist.password);
        if (!passCompare) {
            throw new Error("Incorrect email or password");
        }

        const accessToken = generateJwt({
            userId: userExist._id,
            role: userExist.role,
        });
        console.log(process.env.COOKIE_NAME, 'consoling the cookie')
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
module.exports = { signup, login };
