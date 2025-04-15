
import { useState } from 'react';
import { ImageOff } from 'lucide-react';

const ImageWithFallback = ({ src, alt, className, ...props }) => {
  const [hasError, setHasError] = useState(false);
  
  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
        <div className="flex flex-col items-center justify-center p-4 text-gray-500">
          <ImageOff size={24} className="mb-2" />
          <span className="text-xs text-center">{alt || 'Image not available'}</span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
};

export default ImageWithFallback;
