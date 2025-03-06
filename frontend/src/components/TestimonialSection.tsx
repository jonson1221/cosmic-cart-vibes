
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Skincare Enthusiast',
    quote: "These products completely transformed my skin. After just two weeks, I noticed a significant improvement in texture and brightness.",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Makeup Artist',
    quote: "As a professional makeup artist, I'm very particular about the products I use. This line exceeds all my expectations in quality and performance.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Beauty Blogger',
    quote: "I've tried countless brands, but none compare to the results I get with these products. They're now staples in my daily routine.",
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4">What Our Customers Say</h2>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          Don't just take our word for it - hear from our satisfied customers
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="glass-card p-6 rounded-2xl animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <blockquote className="italic text-muted-foreground">"{testimonial.quote}"</blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
