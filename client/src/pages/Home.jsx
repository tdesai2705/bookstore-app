import { useState, useEffect } from 'react';
import { bookService } from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';

const genreColors = {
  'Fiction': 'bg-purple-100 text-purple-800 border-purple-300',
  'Science Fiction': 'bg-green-100 text-green-800 border-green-300',
  'Fantasy': 'bg-pink-100 text-pink-800 border-pink-300',
  'Technology': 'bg-blue-100 text-blue-800 border-blue-300',
  'Mystery': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'Romance': 'bg-red-100 text-red-800 border-red-300',
  'Thriller': 'bg-gray-100 text-gray-800 border-gray-300',
  'Biography': 'bg-indigo-100 text-indigo-800 border-indigo-300',
  'History': 'bg-orange-100 text-orange-800 border-orange-300',
  'default': 'bg-gray-100 text-gray-800 border-gray-300',
};

const coverColors = {
  'Fiction': 'from-purple-400 to-purple-600',
  'Science Fiction': 'from-green-400 to-green-600',
  'Fantasy': 'from-pink-400 to-pink-600',
  'Technology': 'from-blue-400 to-blue-600',
  'Mystery': 'from-yellow-400 to-yellow-600',
  'Romance': 'from-red-400 to-red-600',
  'Thriller': 'from-gray-400 to-gray-600',
  'Biography': 'from-indigo-400 to-indigo-600',
  'History': 'from-orange-400 to-orange-600',
  'default': 'from-gray-400 to-gray-600',
};

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (book) => {
    addToCart(book);
    toast.success(`${book.title} added to cart!`, {
      icon: '🛒',
      duration: 2000,
    });
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 text-lg font-medium">⚠️ {error}</p>
          <button
            onClick={fetchBooks}
            className="mt-4 btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to our Bookstore</h1>
        <p className="text-gray-600">Discover your next favorite book from our collection</p>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">No books available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => {
            const genreColor = genreColors[book.genre] || genreColors.default;
            const coverGradient = coverColors[book.genre] || coverColors.default;

            return (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-md overflow-hidden card-hover"
              >
                {/* Book Cover */}
                <div className={`h-48 bg-gradient-to-br ${coverGradient} flex items-center justify-center p-6`}>
                  <div className="text-white text-center">
                    <div className="text-6xl mb-2">📖</div>
                    <div className="text-sm font-semibold opacity-90">{book.genre}</div>
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2 h-14">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{book.author}</p>

                  {/* Genre Badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${genreColor} mb-3`}>
                    {book.genre}
                  </span>

                  {/* Price and Stock */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-blue-600">
                      ${book.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(book)}
                    disabled={book.stock === 0}
                    className={`w-full py-2 rounded-lg font-medium transition-all duration-200 ${
                      book.stock > 0
                        ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {book.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
