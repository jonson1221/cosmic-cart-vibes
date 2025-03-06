
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { ALL_PRODUCTS } from '@/data/products';
import { Product, useCart } from '@/context/CartContext';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(ALL_PRODUCTS);
  const { isCartOpen, setIsCartOpen } = useCart();
  
  const productsPerPage = 8;
  
  // Filter categories
  const categories = ['all', 'skincare', 'makeup', 'haircare', 'fragrances'];
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Filter products by category
  const filterProducts = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
    
    if (category === 'all') {
      setFilteredProducts(ALL_PRODUCTS);
    } else {
      setFilteredProducts(ALL_PRODUCTS.filter(product => product.category === category));
    }
  };
  
  // Update displayed products based on current page and filters
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setProducts(filteredProducts.slice(startIndex, endIndex));
  }, [currentPage, filteredProducts]);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  
  // Change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top when changing page
  };
  
  return (
    <>
      <Navbar />
      <CartDrawer open={isCartOpen} setOpen={setIsCartOpen} />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Products</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated collection of premium beauty products
            </p>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => filterProducts(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Products */}
          <ProductGrid products={products} />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                  </PaginationItem>
                )}
                
                {getPageNumbers().map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ProductsPage;
