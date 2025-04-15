
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBolt, FaStar, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import ImageWithFallback from '../components/ImageWithFallback';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    // Find product by id
    const productId = parseInt(id);
    const foundProduct = products.find(p => p.id === productId);

    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find related products (same category, excluding current product)
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== productId)
        .slice(0, 4);
        
      setRelatedProducts(related);
    }
    
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.inStock) {
      addToCart(product, quantity);
      // In a real app, you'd show a toast notification here
      alert(`${product.name} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product && product.inStock) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                <div className="h-2 bg-gray-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the product you are looking for does not exist.
        </p>
        <Link 
          to="/products" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <FaArrowLeft className="mr-2" />
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-gray-700">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-700 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product info */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product image with fallback */}
            <div className="flex items-center justify-center">
              <ImageWithFallback 
                src={product.image} 
                alt={product.name}
                className="w-full h-auto max-w-md object-cover rounded-lg"
              />
            </div>

            {/* Product details */}
            <div className="flex flex-col justify-between">
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
              
              {/* Add to cart section */}
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
            </div>
          </div>
          
          {/* Tabs section */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button 
                onClick={() => setActiveTab('description')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'description' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab('specifications')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'specifications' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Specifications
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'reviews' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviews
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="mb-4">
                    {product.description}
                  </p>
                  <p className="mb-4">
                    Experience superior quality and durability with our {product.name}. Designed for optimal performance and user satisfaction, this product offers exceptional value for money.
                  </p>
                  <p>
                    Our products come with a comprehensive warranty and dedicated customer support to ensure your complete satisfaction.
                  </p>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 bg-gray-50 w-1/3">
                          Brand
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Siva Traders
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 bg-gray-50">
                          Model
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ST-{product.id}00{product.id}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 bg-gray-50">
                          Category
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 bg-gray-50">
                          Warranty
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          1 Year
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 bg-gray-50">
                          Color
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Standard
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < 4 ? "text-yellow-400" : "text-gray-300"} size={24} />
                          ))}
                        </div>
                        <span className="ml-2 text-xl font-bold text-gray-900">4.0</span>
                      </div>
                      <p className="text-sm text-gray-500">36 reviews</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-600 w-16">5 star</span>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full mx-2">
                          <div className="h-4 bg-yellow-400 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">60%</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-600 w-16">4 star</span>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full mx-2">
                          <div className="h-4 bg-yellow-400 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">20%</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-600 w-16">3 star</span>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full mx-2">
                          <div className="h-4 bg-yellow-400 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">10%</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-600 w-16">2 star</span>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full mx-2">
                          <div className="h-4 bg-yellow-400 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">5%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 w-16">1 star</span>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full mx-2">
                          <div className="h-4 bg-yellow-400 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">5%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sample review */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                          RK
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Rajesh Kumar</h4>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < 5 ? "text-yellow-400" : "text-gray-300"} size={12} />
                              ))}
                            </div>
                            <span className="ml-2 text-xs text-gray-500">2 months ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Very good product. Works perfectly as expected and was delivered on time. The quality is excellent and the price is reasonable. Highly recommended!
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-4">
                          SP
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Sunita Patel</h4>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < 4 ? "text-yellow-400" : "text-gray-300"} size={12} />
                              ))}
                            </div>
                            <span className="ml-2 text-xs text-gray-500">1 month ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Good value for money. The product does what it claims and the same-day delivery was a nice surprise. One star less because the packaging could be better.
                      </p>
                    </div>
                    
                    <div className="flex justify-center mt-8">
                      <button className="text-blue-600 border border-blue-600 rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-50">
                        View All Reviews
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
