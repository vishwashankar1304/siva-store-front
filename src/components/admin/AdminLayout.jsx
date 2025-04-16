
import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaBox, 
  FaShoppingCart, 
  FaUsers, 
  FaChartLine, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const AdminLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Products', path: '/admin/products', icon: <FaBox /> },
    { name: 'Orders', path: '/admin/orders', icon: <FaShoppingCart /> },
    { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <FaChartLine /> },
    { name: 'Settings', path: '/admin/settings', icon: <FaCog /> },
  ];

  // Check if the current path matches or starts with the nav item path
  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/admin/dashboard' && location.pathname.startsWith(path));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-gray-800">
          <div className="flex items-center">
            <span className="text-xl font-semibold">Siva Admin</span>
          </div>
          <button 
            className="lg:hidden text-gray-300 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        <div className="px-4 py-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              {currentUser?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{currentUser?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-400">{currentUser?.email || 'admin@example.com'}</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm rounded-md ${
                  isActive(item.path)
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-300 rounded-md hover:bg-gray-800 hover:text-white"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navbar */}
        <div className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white shadow-sm lg:px-8">
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars size={20} />
          </button>
          
          <div className="flex items-center">
            <div className="relative">
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <span className="mr-2 text-sm">{currentUser?.name}</span>
                <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  {currentUser?.name?.charAt(0).toUpperCase() || 'A'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
