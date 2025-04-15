
import { Link } from 'react-router-dom';

const ProductBreadcrumb = ({ product }) => {
  return (
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
  );
};

export default ProductBreadcrumb;
