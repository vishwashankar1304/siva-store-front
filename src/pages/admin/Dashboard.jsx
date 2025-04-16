
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaShoppingCart, FaUsers, FaDollarSign, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { products } from '../../data/products';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0
  });

  useEffect(() => {
    // In a real app, this would come from your API
    setStats({
      totalProducts: products.length,
      totalOrders: 12, // Mocked data
      totalUsers: 25, // Mocked data
      revenue: 45800 // Mocked data
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {currentUser?.name}. Here's what's happening with your store today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
              <FaBox size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
              <FaShoppingCart size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
              <FaUsers size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
              <FaDollarSign size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{stats.revenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Recent activity & quick links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <Link to="/admin/orders" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View all
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Sample orders - in a real app, these would come from your API */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-5289</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rajesh Kumar</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Delivered
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹3,200</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-12</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-5288</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Priya Sharma</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Shipped
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹5,650</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-11</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-5287</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Amit Patel</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Processing
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1,800</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-11</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h2>
              <div className="space-y-4">
                <Link to="/admin/products" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <FaBox className="text-blue-500 mr-3" />
                  <span className="text-gray-700">Manage Products</span>
                </Link>
                <Link to="/admin/orders" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <FaShoppingCart className="text-green-500 mr-3" />
                  <span className="text-gray-700">Manage Orders</span>
                </Link>
                <Link to="/admin/users" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <FaUsers className="text-purple-500 mr-3" />
                  <span className="text-gray-700">Manage Users</span>
                </Link>
                <Link to="/admin/analytics" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <FaChartLine className="text-red-500 mr-3" />
                  <span className="text-gray-700">Analytics</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
