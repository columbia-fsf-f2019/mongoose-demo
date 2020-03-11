const mongoose = require('mongoose');
const { Schema } = mongoose;

const LibrarySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: 'Name required'
  },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

const Library = mongoose.model('Library', LibrarySchema);

module.exports = Library;
