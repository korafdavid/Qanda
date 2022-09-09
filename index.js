const cors = require('cors');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
var mongoose = require('mongoose');
require('dotenv/config');
const auth = require('./config/authorizarion');
const postRoute = require('./routes/post');
const userRoute = require('./routes/user')
const authRoute = require('./routes/authenication');
const resetPass = require('./routes/resetpassword');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', authRoute);
app.use('/api/v1/reset', resetPass);
app.use('/api/v1', auth, userRoute);
app.use('/api/v1/posts', auth, postRoute);
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}, () => { console.log('connected to DB'); });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.listen(port, () => console.log(`listening on port!`));




//var mongoDB = 'mongodb://127.0.0.1/my_database';