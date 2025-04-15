
import { FaStar, FaCheckCircle } from 'react-icons/fa';

const ProductInfo = ({ product }) => {
  return (
    <div>
      {/* Product category */}
      <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
        {product.category}
      </p>
      
      {/* Product name */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {product.name}
      </h1>
      
      {/* Product rating */}
      <div className="flex items-center mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < 4 ? "text-yellow-400" : "text-gray-300"} />
          ))}
        </div>
        <span className="ml-2 text-gray-600">4.0 (36 reviews)</span>
      </div>
      
      {/* Product price */}
      <div className="mb-6">
        <p className="text-3xl font-bold text-gray-900">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
        <p className="text-sm text-green-600 flex items-center mt-1">
          <FaCheckCircle className="mr-1" />
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </p>
      </div>
      
      {/* Short description */}
      <p className="text-gray-600 mb-6">
        {product.description}
      </p>
    </div>
  );
};

export default ProductInfo;
