
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-playfair font-bold tracking-tight mb-4 inline-block">
              Cosmética
            </Link>
            <p className="text-muted-foreground mb-4">
              Premium cosmetics crafted with the finest ingredients for your beauty needs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/skincare" className="text-muted-foreground hover:text-primary transition-colors">
                  Skincare
                </Link>
              </li>
              <li>
                <Link to="/categories/makeup" className="text-muted-foreground hover:text-primary transition-colors">
                  Makeup
                </Link>
              </li>
              <li>
                <Link to="/categories/haircare" className="text-muted-foreground hover:text-primary transition-colors">
                  Haircare
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/bestsellers" className="text-muted-foreground hover:text-primary transition-colors">
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© 2023 Cosmética. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500" /> for beauty lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
