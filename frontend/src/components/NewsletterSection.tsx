
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="section-title mb-4">Stay in Touch</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Subscribe to our newsletter for exclusive offers, skincare tips, and new product announcements.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-6 py-4 rounded-full border border-purple-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-36"
              disabled={isSubmitting}
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 btn-primary py-2 flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : (
                <>
                  Subscribe <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
          
          <p className="text-sm text-center text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
