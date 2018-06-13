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
  Books.find(callback);
}
//get Book by ID
module.exports.getBookById = (id,callback) => {
  Books.findById(id, callback);
}
//add Book
module.exports.addBook = (book, callback) => {
  Books.create(book, callback);
}

//update Book
module.exports.updateBook = (id, book, options, callback) => {
  let query = {_id: id};
  let update = {
      name: book.name,
      author: book.author
  }
  Books.update(query, update, callback);
}
module.exports.deleteBook = (id, book, req, callback) => {
  let query = {_id: id};

  if (req.body.flush === '1' && req.headers.authorization === 'ff62855f-d2cb-4e9a-9816-c6f4045e4665') {
      console.log('deleted');
      Books.remove(query, callback);
  } else {
      Books.update(query, {isDeleted: true}, callback);
  }

}
