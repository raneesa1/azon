// middleware/authenticateJwtAdmin.js
const jwt = require('jsonwebtoken');
const AdminModel = require('.././model/users');

const authenticateJwtAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.AdminJwtToken;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized access' });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
            }

            const user = await AdminModel.findById(decoded.payload.userId);
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
