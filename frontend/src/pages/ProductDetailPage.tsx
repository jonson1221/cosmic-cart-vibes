import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { useCart } from '@/context/CartContext';
import { ALL_PRODUCTS } from '@/data/products';
import { toast } from '@/hooks/use-toast';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isCartOpen, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product by ID
  const product = ALL_PRODUCTS.find(p => p.id === Number(id));
  
  // Related products (same category)
  const relatedProducts = product
    ? ALL_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  // Handle wishlist
  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product?.name} has been added to your wishlist`,
    });
  };

  // Handle share product
  const handleShareProduct = () => {
    if (product && navigator.share) {
      // Use Web Share API if available
      navigator.share({
        title: `${product.name} | Cosmética`,
        text: `Check out ${product.name} on Cosmética!`,
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: "Shared successfully",
          description: "Thanks for sharing!",
        });
      })
      .catch((error) => {
        console.log('Sharing failed:', error);
        // Fallback for when share is canceled or fails
        copyToClipboard();
      });
    } else {
      // Fallback to clipboard
      copyToClipboard();
    }
  };

  // Fallback copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link copied to clipboard",
        description: "You can now paste it anywhere to share!",
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: "Couldn't copy to clipboard",
        description: "Please copy the URL manually",
      });
    });
  };

  // If product not found
  if (!product) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Link to="/products" className="btn-primary">
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <CartDrawer open={isCartOpen} setOpen={setIsCartOpen} />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          
          {/* Product Details */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="bg-secondary/30 rounded-2xl overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-2">{product.category}</span>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">4.0 (120 reviews)</span>
              </div>
              
              {/* Price */}
              <div className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</div>
              
              {/* Description */}
              <p className="text-muted-foreground mb-8">{product.description}</p>
              
              {/* Quantity */}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button 
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="p-2 border rounded-l-lg hover:bg-secondary transition-colors"
                  >
                    -
                  </button>
                  <input 
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 p-2 text-center border-t border-b focus:outline-none"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border rounded-r-lg hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-wrap gap-4 mt-auto">
                <button 
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </button>
                <button 
                  onClick={handleAddToWishlist}
                  className="p-3 border rounded-full hover:bg-secondary transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleShareProduct}
                  className="p-3 border rounded-full hover:bg-secondary transition-colors"
                  aria-label="Share product"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="section-title mb-8">You May Also Like</h2>
              <ProductGrid products={relatedProducts} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ProductDetailPage;
