
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // In a real app, this would navigate to search results
      console.log(`Searching for: ${searchTerm}`);
      setSearchTerm('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container-padded">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Siva</span>
              <span className="text-2xl font-bold text-accent">Traders</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center -mr-2 md:hidden">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-muted focus-visible:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Search form */}
            <div className="relative mr-4">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="border border-input rounded-l-md py-1 px-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-48"
                />
                <button 
                  type="submit" 
                  className="bg-primary text-primary-foreground p-2 rounded-r-md hover:bg-primary-hover transition-colors"
                  aria-label="Search"
                >
                  <FaSearch />
                </button>
              </form>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium hover-underline ${
                    location.pathname === link.path 
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4 ml-4">
              {/* Cart Icon */}
              <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors">
                <FaShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Auth Links */}
              {currentUser ? (
                <div className="relative group">
                  <button className="flex items-center text-foreground hover:text-primary transition-colors">
                    <FaUser className="mr-1" />
                    <span className="text-sm font-medium">{currentUser.name}</span>
                  </button>
                  <div className="profile-menu">
                    <Link 
                      to="/profile" 
                      className="profile-menu-item"
                    >
                      My Profile
                    </Link>
                    <Link 
                      to="/orders" 
                      className="profile-menu-item"
                    >
                      My Orders
                    </Link>
                    <button 
                      onClick={logout}
                      className="profile-menu-item w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Link 
                    to="/login" 
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors hover-underline"
                  >
                    Login
                  </Link>
                  <span className="text-muted-foreground">/</span>
                  <Link 
                    to="/signup" 
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors hover-underline"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="p-4 space-y-4 bg-card shadow-md">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="border border-input rounded-l-md py-2 px-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-full"
            />
            <button 
              type="submit" 
              className="bg-primary text-primary-foreground p-2 rounded-r-md hover:bg-primary-hover transition-colors"
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </form>

          {/* Mobile navigation */}
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  location.pathname === link.path 
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile user menu */}
          <div className="pt-4 border-t border-border">
            {currentUser ? (
              <div className="space-y-2">
                <p className="px-3 text-sm font-medium text-muted-foreground">
                  Signed in as: {currentUser.name}
                </p>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link 
                  to="/orders" 
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile cart */}
          <Link 
            to="/cart" 
            className="flex items-center px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaShoppingCart className="mr-2" />
            Cart
            {itemCount > 0 && (
              <span className="ml-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
