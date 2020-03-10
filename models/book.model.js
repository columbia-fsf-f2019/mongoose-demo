const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
  author: String,
  title: String
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
