const Books = require('../model/books');

module.exports = function (app, db) {
  let books;
  Books.getBooks((err, res) => {
    books = res;
  });

  app.get('/', (req, res) => {
    res.send('homepage');
  });

  app.get('/books', (req, res) => {
      res.json(books.filter((e) => {
        return !e.isDeleted;
      }));
  });

  app.get(/book/, (req, res) => {
    reqID = req.path.substring(req.path.lastIndexOf('/')+1);

    books.forEach( (e) => {

      if (e._id == reqID && !e.isDeleted) {
        return res.json(e);
      }

    });
    try {
      return res.status(404)
        .send('BOOK NOT FOUND')
    } catch (e) {
      
    }

  });
};
