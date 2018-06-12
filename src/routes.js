module.exports = function (app, db) {
  let books;
  db.collection('books').find({}).toArray((err, res) => {
    books = res;
  });

  app.get('/', (req, res) => {
    console.log(books);
    res.send('homepage');
  });

  app.get('/books', (req, res) => {

    db.collection('books').find({}).toArray((err, books) => {

      res.json(books.filter((e) => {
        return !e.isDeleted;
      }));
    });

  });

  app.get(`/book/${books}`, (req, res) => {
    res.send('BOOK');
  });
};
