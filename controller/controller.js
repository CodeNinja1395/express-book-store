const {deleteBook, softDeleteBook} = require('../model/books');

module.exports.deleteBook = (id, req, callback) => {
  if (req.body.flush === '1' && req.headers.authorization === require('../config/config').authorization) {
    return deleteBook(id, callback);
  } else {
    return softDeleteBook(id, {isDeleted: true}, callback);
  }
}
