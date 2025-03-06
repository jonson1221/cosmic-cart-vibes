
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import CategorySection from '@/components/CategorySection';
import ProductGrid from '@/components/ProductGrid';
import TestimonialSection from '@/components/TestimonialSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import { FEATURED_PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';

const Index = () => {
  // Get isCartOpen and setIsCartOpen from the cart context
  const { isCartOpen, setIsCartOpen } = useCart();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <CartDrawer open={isCartOpen} setOpen={setIsCartOpen} />
      
      <main className="overflow-hidden">
        <HeroSection />
        <FeatureSection />
        <CategorySection />
        
        <div className="container mx-auto px-4">
          <ProductGrid 
            products={FEATURED_PRODUCTS} 
            title="Bestselling Products" 
          />
        </div>
        
        <TestimonialSection />
        <NewsletterSection />
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
