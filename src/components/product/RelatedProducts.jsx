
import { useState } from 'react';
import ProductCard from '../ProductCard';

const RelatedProducts = ({ products }) => {
  const [visibleProducts, setVisibleProducts] = useState(4);

  if (!products || products.length === 0) {
    return null;
  }

  const handleShowMore = () => {
    setVisibleProducts(prev => Math.min(prev + 4, products.length));
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, visibleProducts).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {visibleProducts < products.length && (
        <div className="mt-8 text-center">
          <button 
            onClick={handleShowMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Show More ({products.length - visibleProducts} remaining)
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
