
const jwt = require('jsonwebtoken');
const authenticateUser = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error('Error verifying token:', err);
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = authenticateUser;
