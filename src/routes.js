const Joi = require('joi');
const Books = require('./model/books');
const _ = require('underscore');
const config = require('../config/config');

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

module.exports = (app) => {
    app.post('/book', async (req, res) => {
        try {
            const book = await Joi.validate(req.body, schemaRequired);
            await Books.addBook(book);

            res.json(book);
        } catch (e) {
            console.log(e);
        }
    });

    app.post('/book/:_id', async (req, res) => {
        try {
            const book = await Joi.validate(req.body, schemaOptional);
            await Books.updateBook(req.params._id, book, {});
            const bookByID = await Books.getBookById(req.params._id);

            res.json(bookByID);
        } catch(e){
            console.log(e);
        }
    });

    app.get('/', async (req, res) => {
        res.send(config.homeMessage);
    });

    app.get('/books', async (req, res) => {
        try {
            const books = await Books.getBooks();
            console.log(books);
            const result = books.map((book) => {
                return _.pick(book, 'name', 'author', 'added_date');
            });

            res.json(result);
        } catch (e) {
            console.log(e);
        }
    });

    app.get('/book/:_id', async (req, res) => {
        try { 
            const book = await Books.getBookById(req.params._id);
            if(book.isDeleted) {
                res.status(404)
                    .send('book not found');
            } else {
                res.json(_.pick(book, 'name', 'author','_id', 'added_date'));
            }

        } catch (e) {
            res.status(404)
                .send('book not found');
        }
    });

    app.delete('/book/:_id', async (req, res) => {
        try {
            if (req.body.flush === config.flush && req.headers.authorization === config.authorization) {
                await Books.deleteBook(req.params._id);
                res.json('book deleted completely');
            } else {
                const book = await Books.softDeleteBook(req.params._id, {isDeleted: true});
                res.json(`${book.name} is deleted`);
            }
        } catch (e) {
            res.send(`error ${e}`);
        }
    });
};
