const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book.model');
const Library = require('./models/library.model');

mongoose.connect('mongodb://localhost/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

app
  .route('/api/books')
  .get(async (req, res) => {
    const books = await Book.find();
    res.json(books);
  })
  .post(async (req, res) => {
    const result = await Book.create(req.body);
    res.json(result);
  });

app
  .route('/api/libraries')
  .get(async (req, res) => {
    const libraries = await Library.find();
    res.json(libraries);
  })
  .post(async (req, res) => {
    try {
      const result = await Library.create(req.body);
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  });

app.listen(3000, () => {
  console.log('app listening at http://localhost:3000');
});
