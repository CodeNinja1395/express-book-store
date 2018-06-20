module.exports = {
  mongoURL: 'mongodb://localhost:27017/book_store',
  authorization: 'ff62855f-d2cb-4e9a-9816-c6f4045e4665',
  // Escape symbols aren't needed
  homeMessage: `use GET /books to get list of books
  use GET /book/\'id\' to find certain book
  use POST /book/ to add a book
  use POST /book/\'id\' to update a book
  use DELETE /book/\'id\' to delete book`
}
