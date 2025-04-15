
/**
 * Utility functions for handling product images
 */

// Maps categories to placeholder image URLs from Unsplash
const categoryPlaceholders = {
  'cooling': 'https://images.unsplash.com/photo-1605273033815-43418e96bf9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'lighting': 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'plumbing': 'https://images.unsplash.com/photo-1585077021843-04e499df2cde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'electrical': 'https://images.unsplash.com/photo-1582401656496-9d75f95f9018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'decor': 'https://images.unsplash.com/photo-1570051008600-b34baa49e751?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'construction': 'https://images.unsplash.com/photo-1582045895538-9045cafb37f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'default': 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
};

// Maps specific product types to more accurate placeholder images
const productTypePlaceholders = {
  'air-cooler': 'https://images.unsplash.com/photo-1595155949636-e62cc5977669?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'modular-switch': 'https://images.unsplash.com/photo-1582401656496-9d75f95f9018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'led-bulbs': 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'wall-paint': 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
};

/**
 * Get the appropriate image URL for a product with fallbacks
 * @param {Object} product - The product object
 * @returns {string} - The URL to use for the product image
 */
export const getProductImageUrl = (product) => {
  // If the product has a valid image URL that starts with http, use it
  if (product.image && product.image.startsWith('http')) {
    return product.image;
  }
  
  // If it's a local path, ensure it has the correct format
  if (product.image && (product.image.startsWith('/') || product.image.includes('.'))) {
    return product.image; // Return as is - the component will handle local paths
  }
  
  // Check if we have a specific placeholder for this product type
  const productKey = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  if (productTypePlaceholders[productKey]) {
    return productTypePlaceholders[productKey];
  }
  
  // Fall back to category-based placeholder
  return categoryPlaceholders[product.category] || categoryPlaceholders.default;
};

export default {
  getProductImageUrl
};
