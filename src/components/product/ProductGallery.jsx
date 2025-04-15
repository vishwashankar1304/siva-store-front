
import ImageWithFallback from '../ImageWithFallback';

const ProductGallery = ({ product }) => {
  return (
    <div className="flex items-center justify-center">
      <ImageWithFallback 
        src={product.image} 
        alt={product.name}
        className="w-full h-auto max-w-md object-cover rounded-lg"
      />
    </div>
  );
};

export default ProductGallery;
