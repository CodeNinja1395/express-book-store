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

  app.post('/book', async (req, res) => {
    try {
      let book = await Joi.validate(req.body, schemaRequired);
      await Books.addBook(book);
      await res.json(book)
    } catch (e) {
       console.log(e);
    }

  });

  app.post('/book/:_id', async (req, res) => {
    try {
      let book = await Joi.validate(req.body, schemaOptional);
      await Books.updateBook(req.params._id, book, {});

      let bookByID = await Books.getBookById(req.params._id);
      await res.json(bookByID);
    } catch(e){
      console.log(e);
    }

  });

  app.get('/', async (req, res) => {

    await res.send(`use GET /books to get list of books
    use GET /book/\'id\' to find certain book
    use POST /book/ to add a book
    use POST /book/\'id\' to update a book
    use DELETE /book/\'id\' to delete book`)
  });

  app.get('/books', async (req, res) => {
    try {
      let books = await Books.getBooks();
      let listOfBooks = [];

      books.forEach((e) => {
        if (!e.isDeleted)
          listOfBooks.push(_.pick(e, 'name', 'author', '_id'));

      });

      await res.json(listOfBooks);

    } catch (e) {
        console.log(e);
    }
  });

  app.get(`/book/:_id`, async (req, res) => {
    try {
      let book = await Books.getBookById(req.params._id);

        if(book.isDeleted) {
          await res.status(404)
            .send('book not found');
        } else {
          await res.json(_.pick(book, 'name', 'author','_id', 'added_date'));
        }

    } catch (e) {
      res.status(404)
        .send('book not found');
    }
  });

  app.delete(`/book/:_id`, async (req, res) => {
    let book = await Controller.deleteBook(req.params._id, req);
    await res.json(book);

  });
};
