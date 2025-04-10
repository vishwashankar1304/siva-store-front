
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-200">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Siva Traders</h3>
            <p className="mb-4 text-gray-400">
              Your trusted partner for electronic appliances and home improvement products at affordable prices.
            </p>
            <div className="flex items-center space-x-2 mb-3 text-yellow-400">
              <span className="text-2xl font-bold">★ 4.9</span>
              <span className="text-gray-400">Google Rating</span>
            </div>
            <div className="text-gray-400">
              <p className="flex items-center mb-2">
                <FaClock className="mr-2 text-blue-400" /> Same-day delivery available
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition duration-150">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition duration-150">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition duration-150">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition duration-150">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition duration-150">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=cooling" className="text-gray-400 hover:text-white transition duration-150">
                  Cooling Solutions
                </Link>
              </li>
              <li>
                <Link to="/products?category=lighting" className="text-gray-400 hover:text-white transition duration-150">
                  Lighting
                </Link>
              </li>
              <li>
                <Link to="/products?category=plumbing" className="text-gray-400 hover:text-white transition duration-150">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link to="/products?category=electrical" className="text-gray-400 hover:text-white transition duration-150">
                  Electrical
                </Link>
              </li>
              <li>
                <Link to="/products?category=construction" className="text-gray-400 hover:text-white transition duration-150">
                  Construction
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-2 mt-1 text-blue-400" />
                <span>
                  VRS Complex, Thingalur Road, Mekkur, Vijayamangalam, Tamil Nadu 638056
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-blue-400" />
                <a href="tel:+918220659504" className="hover:text-white">
                  +91 82206 59504
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-400" />
                <a href="mailto:sivatradersvts@gmail.com" className="hover:text-white">
                  sivatradersvts@gmail.com
                </a>
              </li>
            </ul>

            {/* Social media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-gray-300">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-150">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-150">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-150">
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Siva Traders. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 text-sm text-gray-400 flex space-x-4">
              <Link to="/terms" className="hover:text-white">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
