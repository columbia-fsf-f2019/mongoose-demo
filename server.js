const express = require('express');
const mongoose = require('mongoose');
const db = require('./models');

mongoose.connect('mongodb://localhost/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

app.route('/api/books').get(async (req, res) => {
  const books = await db.Book.find();
  res.json(books);
});
// .post(async (req, res) => {
//   const result = await Book.create(req.body);
//   res.json(result);
// });

app
  .route('/api/libraries')
  .get(async (req, res) => {
    const libraries = await db.Library.find();
    res.json(libraries);
  })
  .post(async (req, res) => {
    try {
      const result = await db.Library.create(req.body);
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  });

app
  .route('/api/libraries/:id/books')
  .get(async (req, res) => {
    const library = await db.Library.findById(req.params.id).populate('books');
    res.json(library.books);
  })
  .post(async (req, res) => {
    try {
      const book = await db.Book.create(req.body);
      const result = await db.Library.findByIdAndUpdate(req.params.id, {
        $push: { books: book._id }
      });
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  });

app.listen(3000, () => {
  console.log('app listening at http://localhost:3000');
});
