const cors = require('cors');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
var mongoose = require('mongoose');
require('dotenv/config');
const auth = require('./config/authorizarion');
const postRoute = require('./routes/post');
const authRoute = require('./routes/authenication');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoute);
app.use('/Posts', auth, postRoute);
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true
}, () => { console.log('connected to DB'); });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.listen(port, () => console.log(`listening on port!`));




//var mongoDB = 'mongodb://127.0.0.1/my_database';