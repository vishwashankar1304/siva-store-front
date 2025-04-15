
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
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
        
        {activeTab === 'reviews' && <ProductReviews />}
      </div>
    </div>
  );
};

const ProductReviews = () => {
  return (
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
  );
};

export default ProductTabs;
