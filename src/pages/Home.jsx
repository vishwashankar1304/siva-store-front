
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTruck, FaStar, FaRupeeSign, FaArrowRight } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Filter featured products
    const featured = products.filter(product => product.featured);
    setFeaturedProducts(featured);
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Quality Electronics at <span className="text-yellow-300">Affordable Prices</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Discover our wide range of electronics and home improvement products with same-day delivery.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/products" 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition duration-200 inline-flex items-center"
                >
                  Shop Now
                  <FaArrowRight className="ml-2" />
                </Link>
                <Link 
                  to="/contact" 
                  className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-md transition duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" 
                alt="Electronics collection" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Siva Traders?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <FaStar className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Top Rated Service
              </h3>
              <p className="text-center text-gray-600">
                Trusted by thousands of customers with a 4.9-star Google rating for excellent service and quality products.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col items-center p-6 bg-orange-50 rounded-lg">
              <div className="bg-orange-100 p-3 rounded-full mb-4">
                <FaRupeeSign className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Affordable Pricing
              </h3>
              <p className="text-center text-gray-600">
                We offer competitive prices on all our products, ensuring you get the best value for your money.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col items-center p-6 bg-green-50 rounded-lg">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <FaTruck className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Same-Day Delivery
              </h3>
              <p className="text-center text-gray-600">
                Need it urgently? We offer same-day delivery service to ensure you get your products when you need them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Featured Products
            </h2>
            <Link 
              to="/products" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View All
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Browse By Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Category 1 */}
            <Link to="/products?category=cooling" className="group">
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-md transition duration-200">
                <img 
                  src="https://images.unsplash.com/photo-1615599669449-3cd0b40a3f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFibGUlMjBmYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
                  alt="Cooling" 
                  className="w-16 h-16 object-cover rounded-full mb-4"
                />
                <h3 className="text-center text-gray-800 group-hover:text-blue-600">Cooling</h3>
              </div>
            </Link>
            
            {/* Category 2 */}
            <Link to="/products?category=lighting" className="group">
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-md transition duration-200">
                <img 
                  src="https://images.unsplash.com/photo-1513545253216-9774ba9b1895?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVkJTIwYnVsYnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" 
                  alt="Lighting" 
                  className="w-16 h-16 object-cover rounded-full mb-4"
                />
                <h3 className="text-center text-gray-800 group-hover:text-blue-600">Lighting</h3>
              </div>
            </Link>
            
            {/* Category 3 */}
            <Link to="/products?category=plumbing" className="group">
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-md transition duration-200">
                <img 
                  src="https://images.unsplash.com/photo-1635705163380-c722878fd247?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBpcGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" 
                  alt="Plumbing" 
                  className="w-16 h-16 object-cover rounded-full mb-4"
                />
                <h3 className="text-center text-gray-800 group-hover:text-blue-600">Plumbing</h3>
              </div>
            </Link>
            
            {/* Category 4 */}
            <Link to="/products?category=electrical" className="group">
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-md transition duration-200">
                <img 
                  src="https://images.unsplash.com/photo-1558389186-a9d8c8a97f4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3dpdGNoJTIwYm9hcmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
                  alt="Electrical" 
                  className="w-16 h-16 object-cover rounded-full mb-4"
                />
                <h3 className="text-center text-gray-800 group-hover:text-blue-600">Electrical</h3>
              </div>
            </Link>
            
            {/* Category 5 */}
            <Link to="/products?category=decor" className="group">
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-md transition duration-200">
                <img 
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFpbnQlMjBidWNrZXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
                  alt="Decor" 
                  className="w-16 h-16 object-cover rounded-full mb-4"
                />
                <h3 className="text-center text-gray-800 group-hover:text-blue-600">Decor</h3>
              </div>
            </Link>
            
            {/* Category 6 */}
            <Link to="/products?category=construction" className="group">
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-md transition duration-200">
                <img 
                  src="https://images.unsplash.com/photo-1616781677825-3c8ceb3d3391?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2VtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" 
                  alt="Construction" 
                  className="w-16 h-16 object-cover rounded-full mb-4"
                />
                <h3 className="text-center text-gray-800 group-hover:text-blue-600">Construction</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Shop?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
            Explore our wide range of products and enjoy same-day delivery, competitive prices, and excellent customer service.
          </p>
          <Link 
            to="/products" 
            className="bg-white text-blue-700 hover:bg-blue-50 font-medium py-3 px-8 rounded-md transition duration-200 inline-flex items-center"
          >
            Shop Now
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
