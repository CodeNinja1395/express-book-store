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
});

const Books = module.exports = mongoose.model('Books', bookSchema);
//get Book
module.exports.getBooks = () => {
    return Books.find({isDeleted: false});
};
//get Book by ID
module.exports.getBookById = (id) => {
    return Books.findById(id);
};
//add Book
module.exports.addBook = (book) => {
    return Books.create(book);
};
//update Book
module.exports.updateBook = (id, book, options) => {
    let query = {_id: id};
    let update = {};

    // Why is it separated with {}?
    {
        if (book.name) update.name =  book.name;
        if (book.author) update.author = book.author;
        // Spaces have to be from both sides of operators
        if (book.isDeleted!== undefined) update.isDeleted = book.isDeleted;
    }

    return Books.update(query, update);
};
//deleteBook
module.exports.deleteBook = (id, req) => {
    return Books.remove({_id: id});
};
//softDeleteBook
// Why do you need this function if you can do the same with updateBook?
module.exports.softDeleteBook = (id, req) => {
    return Books.findOneAndUpdate({_id: id}, {isDeleted: true});
};
