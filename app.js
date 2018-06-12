const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const db = require('./config/db');

const app = express();
//---------------middlevare------------------//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
//-------------------------------------------//


MongoClient.connect(db.url, (err, client) => {
  if (err)
    console.log(err);
    else {
      const database = client.db('book_store');

      require('./src')(app, database);
      // database.listCollections().toArray(function(err, collInfos) {
      //   console.log(collInfos);
      // });
      app.listen(3000, () => {
        console.log('Server started on port 3000...');
      });
    }

});
