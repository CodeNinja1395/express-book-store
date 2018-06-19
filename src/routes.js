const Books = require('../model/books');
const Joi = require('joi');
const _ = require('underscore');
const Controller = require('../controller/controller');


const schemaRequired = Joi.object().keys({
  name: Joi.string().regex(/^[a-zA-Z0-9\s]+$/).required(),
  author: Joi.string().regex(/^[a-zA-Z0-9\s]+$/).required(),
  isDeleted: Joi.boolean()

});
const schemaOptional = Joi.object().keys({
  name: Joi.string().regex(/^[a-zA-Z0-9\s]+$/),
  author: Joi.string().regex(/^[a-zA-Z0-9\s]+$/),
  isDeleted: Joi.boolean()

});


module.exports = function (app) {

  app.post('/book', (req, res) => {
    let book = req.body;
    Joi.validate(book, schemaRequired, (err, valid) => {
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
    Joi.validate(book, schemaOptional, (err, valid) => {
      Books.updateBook(id, valid, {}, (err, book) => {

        if(err){
          throw err;
        }
        res.send(book);

      });
    })
  });

  app.get('/', (req, res) => {

    res.send(`use GET /books to get list of books
    use GET /book/\'id\' to find certain book
  use POST /book/ to add a book
use POST /book/\'id\' to update a book
use DELETE /book/\'id\' to delete book`)
  });

  app.get('/books', (req, res) => {


    Books.getBooks((err, books) => {

      if (!err) {
        let listOfBooks = [];
        books.forEach((e) => {

          if (!e.isDeleted)
            listOfBooks.push(_.pick(e, 'name', 'author', '_id'));

        });
        res.send(listOfBooks);
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

        if(!err){
          Controller.deleteBook(req.params._id,  req, (err, book) => {
            if (err) {
              console.log(err);
            }

          });
        }

        res.send(book)

    });
  });
};
