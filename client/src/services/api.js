import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookService = {
  getAllBooks: async () => {
    try {
      const response = await api.get('/books');
      return response.data.books;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw new Error('Failed to fetch books. Please try again later.');
    }
  },

  getBookById: async (id) => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw new Error('Failed to fetch book details.');
    }
  },

  createBook: async (bookData) => {
    try {
      const response = await api.post('/books', bookData);
      return response.data;
    } catch (error) {
      console.error('Error creating book:', error);
      throw new Error(error.response?.data?.error || 'Failed to create book.');
    }
  },

  updateBook: async (id, bookData) => {
    try {
      const response = await api.put(`/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      console.error('Error updating book:', error);
      throw new Error('Failed to update book.');
    }
  },

  deleteBook: async (id) => {
    try {
      const response = await api.delete(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting book:', error);
      throw new Error('Failed to delete book.');
    }
  },
};

export default api;
