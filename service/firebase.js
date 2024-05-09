const firebaseAdmin = require('firebase-admin');
const credentials = require('../servicekey.json');
const jwt = require('../service/jwt')


firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(credentials)
});



const signup = async (email, password) => {
  try {
    const userRecord = await firebaseAdmin.auth().createUser({
      email,
      password,
      emailVerified: false,
      disabled: false,
    });

    // Access the hashed password from the userRecord
    const hashedPassword = userRecord.passwordHash;
    console.log(hashedPassword,'consling the hashed pass')
    // Return the user's record and the hashed password
            const token = jwt.generateJWT(userRecord);

        return { token };
  } catch (error) {
    throw error;
  }
};



module.exports = { signup };
