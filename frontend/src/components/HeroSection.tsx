
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pb-12 pt-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-purple-100/80 to-purple-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-pink-100/80 to-pink-300/30 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Hero Text */}
        <div className="max-w-xl">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 animate-fade-in">
            New Collection
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in [animation-delay:200ms]">
            Discover the Art of Skincare
          </h1>
          <p className="text-lg text-muted-foreground mb-8 animate-fade-in [animation-delay:400ms]">
            Elevate your beauty routine with our premium collection of skincare products. 
            Carefully crafted for all skin types.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in [animation-delay:600ms]">
            <Link to="/products" className="btn-primary">
              Shop Now
            </Link>
            <Link to="/categories" className="btn-secondary flex items-center gap-2">
              Explore Categories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="relative hidden md:flex justify-center items-center">
          <div className="relative z-10 animate-floating max-w-md">
            <div className="bg-white/30 p-3 rounded-2xl backdrop-blur-sm">
              <img 
                src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=987&auto=format&fit=crop" 
                alt="Skincare products collection" 
                className="w-full h-auto rounded-xl shadow-xl object-cover aspect-[3/4]"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center rotate-12 shadow-md">
              <span className="text-primary font-bold text-lg">NEW</span>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl -z-10 transform scale-90" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
