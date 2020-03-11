const mongoose = require('mongoose');
const { Schema } = mongoose;

const LibrarySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: 'Name required'
  }
});

const Library = mongoose.model('Library', LibrarySchema);

module.exports = Library;
