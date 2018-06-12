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
