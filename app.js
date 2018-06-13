const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/book_store');
const dbase = mongoose.connection;

const app = express();
//---------------middlevare------------------//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
//-------------------------------------------//


require('./src')(app);
app.listen(3000, () => {
  console.log('Server started on port 3000...');
});
