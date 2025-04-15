
import { useState } from 'react';
import { FaShoppingCart, FaBolt } from 'react-icons/fa';

const ProductActions = ({ product, onAddToCart, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(quantity);
  };

  const handleBuyNow = () => {
    onBuyNow(quantity);
  };

  return (
    <div className="border-t border-gray-200 pt-6">
      {/* Quantity selector */}
      <div className="flex items-center mb-6">
        <span className="text-gray-700 mr-4">Quantity</span>
        <div className="flex items-center border border-gray-300 rounded-md">
          <button 
            onClick={decrementQuantity} 
            disabled={quantity <= 1}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            -
          </button>
          <span className="px-4 py-2">{quantity}</span>
          <button 
            onClick={incrementQuantity} 
            className="px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex-1 flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
        <button 
          onClick={handleBuyNow}
          disabled={!product.inStock}
          className="flex-1 flex items-center justify-center bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <FaBolt className="mr-2" />
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
