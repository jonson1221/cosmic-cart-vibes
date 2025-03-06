
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart, type Product } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card group animate-fade-in">
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Quick Add Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
          }}
          className="absolute right-4 bottom-4 p-3 bg-white rounded-full shadow-md opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-primary hover:text-white"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>
      
      {/* Product Info */}
      <Link to={`/products/${product.id}`} className="block p-4">
        <div className="mb-1 text-sm text-muted-foreground">{product.category}</div>
        <h3 className="font-medium mb-2 line-clamp-1">{product.name}</h3>
        <div className="font-medium">${product.price.toFixed(2)}</div>
      </Link>
    </div>
  );
};

export default ProductCard;
