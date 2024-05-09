// middleware/authenticateJwtAdmin.js
const jwt = require('jsonwebtoken');
const AdminModel = require('.././model/users');

const authenticateJwtAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.AdminJwtToken;

        console.log(token,'consoling the token of admin')
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized access' });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
            }

            const user = await AdminModel.findById(decoded.payload.userId);

            console.log(user.role,'consling the role from admin token ')
            if (!user || user.role !== 'admin') {

                return res.status(403).json({ success: false, message: 'Unauthorized access' });
            }

            req.user = decoded.payload;
            next();
        });
    } catch (error) {
        console.error('Error in authentication:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = authenticateJwtAdmin;
