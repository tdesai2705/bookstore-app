import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    toast.success('Checkout successful! Order placed.', {
      icon: '🎉',
      duration: 3000,
    });
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any books yet. Start shopping to fill your cart!
          </p>
          <Link to="/" className="btn-primary inline-block">
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 flex items-center gap-6 hover:shadow-lg transition-shadow"
            >
              {/* Book Info */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.author}</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  {item.genre}
                </span>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-xl font-bold text-blue-600">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">each</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold text-lg">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                    item.quantity >= item.stock
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => {
                  removeFromCart(item.id);
                  toast.success('Item removed from cart');
                }}
                className="text-red-500 hover:text-red-700 transition-colors p-2"
                title="Remove item"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                <span>Total</span>
                <span className="text-blue-600">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors mb-3"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => {
                clearCart();
                toast.success('Cart cleared');
              }}
              className="w-full bg-red-100 text-red-600 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors"
            >
              Clear Cart
            </button>

            <Link
              to="/"
              className="block text-center text-blue-600 hover:text-blue-700 mt-4 font-medium"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
