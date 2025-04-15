
import { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

const ImageWithFallback = ({ src, alt, className, onLoad, ...props }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Convert external URLs to local paths if needed
  const imageSrc = src.startsWith('http') 
    ? src 
    : src.startsWith('/') 
      ? src 
      : `/${src}`;
  
  useEffect(() => {
    // Reset states when the src changes
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    console.log(`Image failed to load: ${imageSrc}`);
  };

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
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
    <>
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
          <div className="animate-pulse w-full h-full bg-gray-200 rounded-lg"></div>
        </div>
      )}
      <img 
        src={imageSrc} 
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`${className} ${isLoading ? 'invisible' : 'visible'}`}
        {...props}
      />
    </>
  );
};

export default ImageWithFallback;
