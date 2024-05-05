const firebaseService = require('../service/firebase');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token } = await firebaseService.login(email, password);
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
        console.log(error.message, 'an error from login');
    }
};

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token } = await firebaseService.signup(email, password);
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
        console.log(error.message, 'an error from signup');
    }
};

module.exports = { login, signup };
