
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface CartDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDrawer = ({ open, setOpen }: CartDrawerProps) => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    totalPrice 
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />
      
      {/* Drawer */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 p-6 shadow-xl transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button 
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-medium">Your cart is empty</h3>
            <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <button 
              onClick={() => setOpen(false)}
              className="btn-primary mt-4"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6 overflow-y-auto max-h-[50vh] pb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 animate-fade-in">
                  {/* Product Image */}
                  <div className="h-24 w-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="font-medium line-clamp-1">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">${item.product.price.toFixed(2)}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center mt-auto">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded hover:bg-secondary transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="mx-2 w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded hover:bg-secondary transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Price & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <span className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cart Summary */}
            <div className="border-t mt-6 pt-6">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              
              <Link 
                to="/checkout"
                onClick={() => setOpen(false)}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              
              <button 
                onClick={() => setOpen(false)}
                className="w-full text-center mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
