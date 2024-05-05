const express = require('express')
const router = express.Router();
const app = express()
const connectDB = require('./config/dbconfig');
require('dotenv').config()
const path = require('path');
const ownerRouter = require('./router/owner')
const adminRouter = require('./router/superadmin')

// //firebase
// const firebaseAdmin = require('firebase-admin')
// const credentials = require('./servicekey')
// firebaseAdmin.initializeApp({
//     credential: firebaseAdmin.credential.cert(credentials)
// })



app.use(require('cors')())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')


app.use(express.static('public'))
app.use('/', ownerRouter)
app.use('/admin', adminRouter)


const PORT = 3000

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('server running');
    });
});
