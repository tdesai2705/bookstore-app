const request = require('supertest');
const app = require('../src/index');

describe('Bookstore API', () => {
  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status', 'healthy');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /books', () => {
    it('should return all books', async () => {
      const res = await request(app).get('/books');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('books');
      expect(res.body).toHaveProperty('count');
      expect(Array.isArray(res.body.books)).toBe(true);
      expect(res.body.count).toBeGreaterThan(0);
    });

    it('should return books with correct properties', async () => {
      const res = await request(app).get('/books');
      expect(res.status).toBe(200);
      const book = res.body.books[0];
      expect(book).toHaveProperty('id');
      expect(book).toHaveProperty('title');
      expect(book).toHaveProperty('author');
      expect(book).toHaveProperty('genre');
      expect(book).toHaveProperty('price');
      expect(book).toHaveProperty('stock');
    });
  });

  describe('GET /books/:id', () => {
    it('should return a specific book by ID', async () => {
      const res = await request(app).get('/books/1');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', '1');
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('author');
    });

    it('should return 404 for non-existent book', async () => {
      const res = await request(app).get('/books/nonexistent');
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error', 'Book not found');
    });
  });

  describe('POST /books', () => {
    it('should create a new book with all fields', async () => {
      const newBook = {
        title: 'Test Book',
        author: 'Test Author',
        genre: 'Test Genre',
        price: 19.99,
        stock: 15
      };

      const res = await request(app).post('/books').send(newBook);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe(newBook.title);
      expect(res.body.author).toBe(newBook.author);
      expect(res.body.genre).toBe(newBook.genre);
      expect(res.body.price).toBe(newBook.price);
      expect(res.body.stock).toBe(newBook.stock);
    });

    it('should create a book with only required fields', async () => {
      const newBook = {
        title: 'Minimal Book',
        author: 'Minimal Author'
      };

      const res = await request(app).post('/books').send(newBook);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe(newBook.title);
      expect(res.body.author).toBe(newBook.author);
      expect(res.body.genre).toBe('Unknown');
      expect(res.body.price).toBe(0);
      expect(res.body.stock).toBe(0);
    });

    it('should return 400 if title is missing', async () => {
      const res = await request(app).post('/books').send({ author: 'Test Author' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Title and author are required');
    });

    it('should return 400 if author is missing', async () => {
      const res = await request(app).post('/books').send({ title: 'Test Book' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Title and author are required');
    });

    it('should return 400 if price is negative', async () => {
      const res = await request(app).post('/books').send({
        title: 'Test Book',
        author: 'Test Author',
        price: -5
      });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Price must be a positive number');
    });

    it('should return 400 if stock is negative', async () => {
      const res = await request(app).post('/books').send({
        title: 'Test Book',
        author: 'Test Author',
        stock: -10
      });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Stock must be a positive number');
    });
  });

  describe('PUT /books/:id', () => {
    it('should update an existing book', async () => {
      const updates = {
        title: 'Updated Title',
        price: 25.99
      };

      const res = await request(app).put('/books/1').send(updates);
      expect(res.status).toBe(200);
      expect(res.body.title).toBe(updates.title);
      expect(res.body.price).toBe(updates.price);
    });

    it('should return 404 for non-existent book', async () => {
      const res = await request(app).put('/books/nonexistent').send({ title: 'Test' });
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error', 'Book not found');
    });

    it('should return 400 if price is negative', async () => {
      const res = await request(app).put('/books/1').send({ price: -10 });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Price must be a positive number');
    });

    it('should return 400 if stock is negative', async () => {
      const res = await request(app).put('/books/1').send({ stock: -5 });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Stock must be a positive number');
    });
  });

  describe('DELETE /books/:id', () => {
    it('should delete an existing book', async () => {
      const res = await request(app).delete('/books/2');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Book deleted successfully');
      expect(res.body).toHaveProperty('book');
      expect(res.body.book.id).toBe('2');
    });

    it('should return 404 for non-existent book', async () => {
      const res = await request(app).delete('/books/nonexistent');
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error', 'Book not found');
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for invalid routes', async () => {
      const res = await request(app).get('/invalid-route');
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error', 'Route not found');
    });
  });
});
