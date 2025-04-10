
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
      <div className="card card-hover overflow-hidden">
        <div className="relative -m-6 mb-0">
          {/* Product image */}
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="badge-out-of-stock">
                Out of Stock
              </span>
            </div>
          )}

          {/* Featured tag */}
          {product.featured && (
            <div className="absolute top-2 left-2">
              <span className="badge-featured">
                Featured
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          {/* Category */}
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.category}
          </p>
          
          {/* Product name */}
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-lg font-bold text-foreground">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
            
            {/* Rating */}
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-sm text-muted-foreground">4.5</span>
            </div>
          </div>
          
          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              product.inStock
                ? 'btn-primary'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
            aria-label={product.inStock ? `Add ${product.name} to cart` : `${product.name} is out of stock`}
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
