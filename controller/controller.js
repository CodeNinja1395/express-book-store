const {deleteBook, softDeleteBook} = require('../model/books');



module.exports.deleteBook = (id, req, callback) => {
  if (req.body.flush === '1' && req.headers.authorization === require('../config/config').authorization) {
      deleteBook(id, callback);
  } else {
      softDeleteBook(id, {isDeleted: true}, callback);
  }
}
