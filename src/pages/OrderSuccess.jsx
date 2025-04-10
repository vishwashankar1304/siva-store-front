
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaShoppingBag } from 'react-icons/fa';

const OrderSuccess = () => {
  // Generate a random order ID
  const orderId = Math.floor(100000 + Math.random() * 900000);
  
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <FaCheckCircle className="text-green-600 text-4xl" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
            <p className="text-lg text-gray-600">
              Thank you for shopping with Siva Traders
            </p>
          </div>
          
          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500 mb-1">Order ID</p>
                <p className="text-lg font-medium text-gray-900">#{orderId}</p>
              </div>
              
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500 mb-1">Order Date</p>
                <p className="text-lg font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                <p className="text-lg font-medium text-green-600">Today (Same day delivery)</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">What's Next?</h2>
            <ul className="text-left max-w-md mx-auto space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600 text-xs font-bold">1</span>
                </span>
                <span>You will receive an order confirmation email shortly.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600 text-xs font-bold">2</span>
                </span>
                <span>Our team will process your order and prepare it for delivery.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600 text-xs font-bold">3</span>
                </span>
                <span>You'll receive another notification once your order is out for delivery.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600 text-xs font-bold">4</span>
                </span>
                <span>For same-day delivery orders, expect delivery by end of today.</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <FaHome className="mr-2" />
              Back to Home
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <FaShoppingBag className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">Need help with your order?</p>
          <Link to="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
            Contact our support team
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
