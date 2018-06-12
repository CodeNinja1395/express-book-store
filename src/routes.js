const Books = require('../model/books');
const Joi = require('../model/validator');

module.exports = function (app, db) {


  app.post('/book', (req, res) => {
    let book = req.body;
    Books.addBook(book, (err, books) => {

      if(err) {
        console.log(err);
      }
      res.json(book)

    })
  });
  app.post('/book/:_id', (req, res) => {
    let id = req.params._id;
    let book = req.body;
    console.log(req.body);
    Books.updateBook(id, book, {}, (err, book) => {
      if(err){
        throw err;
      }
      res.send(book);
    });
  });

  app.get('/', (req, res) => {

    res.send('homepage');
  });

  app.get('/books', (req, res) => {

    Books.getBooks((err, books) => {
      if (!err) {
        res.json(books.filter((e) => {
          return !e.isDeleted;
        }));
      }
    });

  });

  app.get(`/book/:_id`, (req, res) => {

    Books.getBookById(req.params._id, (err, book) => {
        if(err) {
          return  res.status(404)
            .send('book not found');
        } else {
            res.json(book);
        }
    });

  });
};
