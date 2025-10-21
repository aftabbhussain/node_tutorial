//import the mongoose library and store its object in the mongoose variable
const mongoose = require('mongoose');

//improt the dotenv file and stoer the mongodb url defined in .env file to DB_URL variable
require('dotenv').config();
const DB_URL = process.env.DB_URL;

//define the mongodb connection url
//const mongoURL = 'mongodb://localhost:27017/hotel';
const mongoURL = DB_URL;

//set up the mongodb connection
mongoose.connect(mongoURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

//this object db is used to handle events and interact with database
const db = mongoose.connection;

//define event listeners for database connection
db.on('connected', () => {
    console.log('MongoDB connected');
});
db.on('error', (err) => {
    console.error('MongoDB connection rrorr : ', err);
});
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

//export the database connection
module.exports = db;