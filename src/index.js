const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// In-memory database
let books = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    price: 12.99,
    stock: 10
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    genre: 'Science Fiction',
    price: 14.99,
    stock: 5
  },
  {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    price: 10.99,
    stock: 8
  }
];

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// GET all books
app.get('/books', (req, res) => {
  res.json({ books, count: books.length });
});

// GET book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

// POST create new book
app.post('/books', (req, res) => {
  const { title, author, genre, price, stock } = req.body;

  // Validation
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  if (price && (isNaN(price) || price < 0)) {
    return res.status(400).json({ error: 'Price must be a positive number' });
  }

  if (stock && (isNaN(stock) || stock < 0)) {
    return res.status(400).json({ error: 'Stock must be a positive number' });
  }

  const newBook = {
    id: uuidv4(),
    title,
    author,
    genre: genre || 'Unknown',
    price: parseFloat(price) || 0,
    stock: parseInt(stock) || 0
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book
app.put('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const { title, author, genre, price, stock } = req.body;

  // Validation
  if (price !== undefined && (isNaN(price) || price < 0)) {
    return res.status(400).json({ error: 'Price must be a positive number' });
  }

  if (stock !== undefined && (isNaN(stock) || stock < 0)) {
    return res.status(400).json({ error: 'Stock must be a positive number' });
  }

  books[index] = {
    ...books[index],
    ...(title && { title }),
    ...(author && { author }),
    ...(genre && { genre }),
    ...(price !== undefined && { price: parseFloat(price) }),
    ...(stock !== undefined && { stock: parseInt(stock) })
  };

  res.json(books[index]);
});

// DELETE book
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const deleted = books.splice(index, 1)[0];
  res.json({ message: 'Book deleted successfully', book: deleted });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Bookstore API running on port ${PORT}`);
  });
}

module.exports = app;
