const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
//---------------middlevare------------------//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
//-------------------------------------------//

let arr = [];

app.post('/book', (req, res)=> {
  arr.push('new book')
  res.send('hello');
});
app.get('/books', (req, res)=> {
  res.send('\'list of books\'');
});
app.get(`/books/${5}`, (req, res)=> {
  res.send('here is your book');
});
app.post('/', (req, res)=> {
  res.send('hello');
});





app.listen(3000, () => {

  console.log('Server started on port 3000...');
});
