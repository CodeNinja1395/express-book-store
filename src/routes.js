const Books = require('../model/books');
const Joi = require('../model/validator')
const _ = require('underscore');



module.exports = function (app) {

  app.post('/book', (req, res) => {
    let book = req.body;
    Joi.validateReq(book, (err, valid) => {
      if (err){
        console.log(err);
      }
      Books.addBook(valid, (err, books) => {

        if(err) {
          console.log(err);
        }
        res.json(book)

      });
    });
  });

  app.post('/book/:_id', (req, res) => {
    let id = req.params._id;
    let book = req.body;
    Joi.validateOptional(book, (err, valid) => {
      Books.updateBook(id, valid, {}, (err, book) => {

        if(err){
          throw err;
        }
        res.send(book);

      });
    })
  });

  app.get('/', (req, res) => {

    res.send(html);
  });

  app.get('/books', (req, res) => {


    Books.getBooks((err, books) => {

      if (!err) {
        let listOfBooks = [];
        books.forEach((e) => {

          if (!e.isDeleted)
            listOfBooks.push(_.pick(e, 'name', 'author', ));

        });
        res.json(listOfBooks);
      }

    });
  });

  app.get(`/book/:_id`, (req, res) => {

    Books.getBookById(req.params._id, (err, book) => {

        if(err || book.isDeleted) {
          return  res.status(404)
            .send('book not found');
        } else {
            res.json(_.pick(book, 'name', 'author','_id', 'added_date'));
        }

    });
  });

  app.delete(`/book/:_id`, (req, res) => {

    Books.getBookById(req.params._id, (err, book) => {

        Books.deleteBook(req.params._id, book, req, (err, book) => {
          if (err) {
            console.log(err);
          }

        });

        res.send(book)

    });
  });
};
