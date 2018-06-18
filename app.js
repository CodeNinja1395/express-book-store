const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(require('./config/config').mongoURL);
const dbase = mongoose.connection;

const app = express();
//---------------middlevare------------------//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
//-------------------------------------------//


require('./src')(app);
app.listen(3000, () => {
  console.log('Server started on port 3000...');
});
