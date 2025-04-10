
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    // In a real app, you'd show a toast notification here
    alert(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          {/* Product image */}
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}

          {/* Featured tag */}
          {product.featured && (
            <div className="absolute top-2 left-2">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Featured
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            {product.category}
          </p>
          
          {/* Product name */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-lg font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
            
            {/* Rating */}
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-sm text-gray-600">4.5</span>
            </div>
          </div>
          
          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md ${
              product.inStock
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
