
import React from 'react';
import ProductCard from './ProductCard';
import { type Product } from '@/context/CartContext';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  return (
    <section className="py-12" aria-labelledby={title ? 'grid-title' : undefined}>
      {title && (
        <h2 id="grid-title" className="section-title text-center mb-12">{title}</h2>
      )}
      
      {products.length === 0 ? (
        <div className="text-center py-16" role="status" aria-live="polite">
          <h3 className="text-xl font-medium text-gray-500">No products found</h3>
          <p className="mt-2 text-muted-foreground">Try adjusting your filter criteria</p>
        </div>
      ) : (
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          role="list"
          aria-label={title || "Products"}
        >
          {products.map((product) => (
            <div key={product.id} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
