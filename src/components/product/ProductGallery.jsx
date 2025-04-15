
import { useState } from 'react';
import ImageWithFallback from '../ImageWithFallback';

const ProductGallery = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-md">
        <ImageWithFallback 
          src={product.image} 
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg shadow-md"
          onLoad={handleImageLoad}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="animate-pulse w-full h-full bg-gray-200 rounded-lg"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
