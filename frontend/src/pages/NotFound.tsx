
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <>
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-7xl font-bold mb-6">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default NotFound;
