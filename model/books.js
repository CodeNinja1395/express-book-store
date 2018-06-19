const mongoose = require('mongoose');

let bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  added_date: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

const Books = module.exports = mongoose.model('Books', bookSchema);
//get Book
module.exports.getBooks = (callback) => {
  return Books.find(callback);
}
//get Book by ID
module.exports.getBookById = (id,callback) => {
  return Books.findById(id, callback);
}
//add Book
module.exports.addBook = (book, callback) => {
  return Books.create(book, callback);
}

//update Book
module.exports.updateBook = (id, book, options, callback) => {
  let query = {_id: id};
  let update = {
  }
      {
        if (book.name) update.name =  book.name;
        if (book.author) update.author = book.author;
        if (book.isDeleted!== undefined) update.isDeleted = book.isDeleted;
      }

  return Books.update(query, update, callback);
}
//deleteBook
module.exports.deleteBook = (id, req, callback) => {
  let query = {_id: id};
  return Books.remove(query, callback);
}
//softDeleteBook
module.exports.softDeleteBook = (id, req, callback) => {
  let query = {_id: id};
  return Books.update(query, {isDeleted: true}, callback);
}
