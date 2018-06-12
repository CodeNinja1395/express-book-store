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

module.exports.getBooks = (callback) => {
  Books.find(callback)
}
module.exports.getBookById = (id,callback) => {
  Books.findById(id, callback);
}
module.exports.addBook = (book, callback) => {
  Books.create(book, callback);
}
module.exports.updateBook = (id, book, options, callback) => {
  let query = {_id: id};
  let update = {
      name: book.name,
      author: book.author
  }
  Books.update(query, update, callback);
}
