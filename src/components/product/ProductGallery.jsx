
import { useState } from 'react';
import ImageWithFallback from '../ImageWithFallback';

const ProductGallery = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Fallback to placeholder image for specific categories if needed
  const getCategoryFallback = (category) => {
    const fallbacks = {
      'cooling': 'https://images.unsplash.com/photo-1605273033815-43418e96bf9a',
      'lighting': 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89',
      'plumbing': 'https://images.unsplash.com/photo-1585077021843-04e499df2cde',
      'electrical': 'https://images.unsplash.com/photo-1582401656496-9d75f95f9018',
      'decor': 'https://images.unsplash.com/photo-1570051008600-b34baa49e751',
      'construction': 'https://images.unsplash.com/photo-1582045895538-9045cafb37f9'
    };
    
    return fallbacks[category] || 'https://placehold.co/600x400?text=Product+Image';
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Determine the image source with fallbacks
  const imageSrc = product.image.startsWith('http') 
    ? product.image 
    : (product.image.startsWith('/') 
      ? product.image 
      : `/${product.image}`);

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-md">
        <ImageWithFallback 
          src={imageSrc} 
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
