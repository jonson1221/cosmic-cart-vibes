
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'skincare',
    name: 'Skincare',
    description: 'Nourish and rejuvenate your skin',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
    color: 'from-pink-200/50 to-pink-100/30'
  },
  {
    id: 'makeup',
    name: 'Makeup',
    description: 'Enhance your natural beauty',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
    color: 'from-purple-200/50 to-purple-100/30'
  },
  {
    id: 'haircare',
    name: 'Haircare',
    description: 'Love your locks with premium care',
    image: 'https://images.unsplash.com/photo-1607101418235-0168c954ecb2?q=80&w=800&auto=format&fit=crop',
    color: 'from-yellow-200/50 to-yellow-100/30'
  }
];

const CategorySection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4">Shop by Category</h2>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          Explore our collections curated for every beauty need
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className="relative overflow-hidden rounded-2xl group animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-70 group-hover:opacity-90 transition-opacity duration-300 -z-10`} />
              
              {/* Category Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Category Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <Link 
                  to={`/categories/${category.id}`}
                  className="flex items-center gap-2 font-medium text-primary group-hover:underline"
                >
                  Explore <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
