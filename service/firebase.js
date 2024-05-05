const firebaseAdmin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const credentials = require('../servicekey.json');
const bcrypt = require('bcrypt');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(credentials)
});

const generateJWT = (user) => {
    return jwt.sign({
        uid: user.uid,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
};

const login = async (email, password) => {
    try {
        const userCredential = await firebaseAdmin.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const token = generateJWT(user);

        return { token };
    } catch (error) {
        throw error;
    }
};

const signup = async (email, password) => {
    try {
        console.log('signup api called');

        const userRecord = await firebaseAdmin.auth().createUser({
            email: email,
            password: password,
            emailVerified: false,
            disabled: false
        });

        const token = generateJWT(userRecord);

        return { token };
    } catch (error) {
        throw error;
    }
};

module.exports = { login, signup };
