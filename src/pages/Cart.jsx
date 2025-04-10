
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaArrowLeft, FaCreditCard, FaTruck } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(productId);
    }
  };

  const handleCouponApply = () => {
    if (!couponCode) {
      setCouponError('Please enter a coupon code');
      return;
    }

    if (couponCode.toUpperCase() === 'DISCOUNT10') {
      setDiscount(cartTotal * 0.1);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  // Calculate totals
  const subtotal = cartTotal;
  const shippingFee = subtotal > 1000 ? 0 : 100;
  const total = subtotal + shippingFee - discount;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-6">
              <FaShoppingCart className="mx-auto text-gray-400 text-6xl" />
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <FaArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        {/* Product image */}
                        <div className="sm:w-24 sm:h-24 flex-shrink-0 mb-4 sm:mb-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        
                        {/* Product details */}
                        <div className="flex-1 sm:ml-6">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                <Link to={`/products/${item.id}`} className="hover:text-blue-600">
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                Category: {item.category}
                              </p>
                            </div>
                            <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end">
                              <p className="text-lg font-bold text-gray-900">
                                ₹{item.price.toLocaleString('en-IN')}
                              </p>
                              <p className="text-sm text-gray-500">
                                Subtotal: ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            {/* Quantity controls */}
                            <div className="flex items-center">
                              <span className="mr-3 text-sm text-gray-700">Quantity:</span>
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)} 
                                  disabled={item.quantity <= 1}
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 border-l border-r border-gray-300">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)} 
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            {/* Remove button */}
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              className="mt-4 sm:mt-0 flex items-center text-sm text-red-600 hover:text-red-800"
                            >
                              <FaTrash className="mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between items-center">
                <Link 
                  to="/products" 
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <FaArrowLeft className="mr-1" />
                  Continue Shopping
                </Link>
                
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear your cart?')) {
                      clearCart();
                    }
                  }}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                
                {/* Coupon code */}
                <div className="mb-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                    Have a coupon?
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.trim())}
                      placeholder="Enter coupon code"
                      className="flex-1 block w-full border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <button
                      onClick={handleCouponApply}
                      className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-700"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="mt-1 text-sm text-red-600">{couponError}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Try "DISCOUNT10" for 10% off your order
                  </p>
                </div>
                
                {/* Price breakdown */}
                <div className="border-t border-gray-200 py-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</p>
                    <p className="text-gray-900 font-medium">₹{subtotal.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600">Shipping Fee</p>
                    <p className="text-gray-900 font-medium">
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toLocaleString('en-IN')}`}
                    </p>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600">Discount</p>
                      <p className="text-green-600 font-medium">-₹{discount.toLocaleString('en-IN')}</p>
                    </div>
                  )}
                </div>
                
                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <p className="text-base font-medium text-gray-900">Total</p>
                    <p className="text-xl font-bold text-gray-900">₹{total.toLocaleString('en-IN')}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Including taxes & shipping
                  </p>
                </div>
                
                {/* Checkout button */}
                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <FaCreditCard className="mr-2" />
                    Proceed to Checkout
                  </button>
                </div>
                
                {/* Shipping notice */}
                <div className="mt-6 flex items-center text-sm text-gray-600">
                  <FaTruck className="mr-2 text-green-600" />
                  <p>
                    {subtotal >= 1000 
                      ? "Eligible for FREE shipping!" 
                      : `Spend ₹${(1000 - subtotal).toLocaleString('en-IN')} more for FREE shipping`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
