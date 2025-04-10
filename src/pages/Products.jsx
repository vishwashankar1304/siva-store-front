
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaTimes, FaSort } from 'react-icons/fa';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  // Get category from URL on initial load
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply price range filter
    result = result.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (featured first)
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, sortOption, priceRange]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    
    // Update URL
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
    
    // Close mobile filter if open
    setIsFilterOpen(false);
  };

  // Handle price range change
  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Toggle mobile filter
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
        
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-6 flex justify-between items-center">
          <button
            onClick={toggleFilter}
            className="flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <FaFilter className="mr-2" />
            Filters
          </button>
          
          <div className="relative inline-block">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
            <FaSort className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar filters - Desktop */}
          <div className="hidden md:block md:w-1/4 pr-8">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
              
              {/* Category filter */}
              <CategoryFilter 
                onCategoryChange={handleCategoryChange} 
                selectedCategory={selectedCategory} 
              />
              
              {/* Price range filter */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <label htmlFor="min-price" className="block text-sm font-medium text-gray-700">
                        Min Price
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                          type="number"
                          id="min-price"
                          value={priceRange.min}
                          onChange={(e) => handlePriceChange(e, 'min')}
                          className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="max-price" className="block text-sm font-medium text-gray-700">
                        Max Price
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                          type="number"
                          id="max-price"
                          value={priceRange.max}
                          onChange={(e) => handlePriceChange(e, 'max')}
                          className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Apply button */}
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Mobile filters - Slide-in */}
          <div 
            className={`fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden transition-opacity duration-300 ${
              isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div 
              className={`absolute right-0 top-0 h-full bg-white w-80 transform transition-transform duration-300 ${
                isFilterOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="p-6 h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button 
                    onClick={toggleFilter}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
                
                {/* Category filter */}
                <CategoryFilter 
                  onCategoryChange={handleCategoryChange} 
                  selectedCategory={selectedCategory} 
                />
                
                {/* Price range filter */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="mobile-min-price" className="block text-sm font-medium text-gray-700">
                        Min Price
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                          type="number"
                          id="mobile-min-price"
                          value={priceRange.min}
                          onChange={(e) => handlePriceChange(e, 'min')}
                          className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="mobile-max-price" className="block text-sm font-medium text-gray-700">
                        Max Price
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                          type="number"
                          id="mobile-max-price"
                          value={priceRange.max}
                          onChange={(e) => handlePriceChange(e, 'max')}
                          className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={toggleFilter}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:w-3/4">
            {/* Sort options - Desktop */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500">
                Showing {filteredProducts.length} products
              </p>
              
              <div className="relative inline-block">
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
                <FaSort className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium text-gray-900 mb-4">No products found</h3>
                <p className="text-gray-500 mb-8">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange({ min: 0, max: 10000 });
                    searchParams.delete('category');
                    setSearchParams(searchParams);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
