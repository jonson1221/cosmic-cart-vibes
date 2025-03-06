
import React from 'react';
import { ShieldCheck, Truck, Leaf, Sparkles } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    description: 'All our products are made with the finest ingredients, ensuring quality and effectiveness.'
  },
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'We use natural and organic ingredients that are gentle on your skin and the environment.'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Enjoy free shipping on all orders over $50 with delivery within 3-5 business days.'
  },
  {
    icon: Sparkles,
    title: 'Cruelty Free',
    description: 'We never test on animals and are committed to ethical beauty standards.'
  }
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4">Why Choose Us</h2>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          We pride ourselves on creating products that enhance your natural beauty without compromising on quality.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-2xl transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
