
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from 'sonner';

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate total price
  const totalPrice = items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  // Add to cart
  const addToCart = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const itemExists = prevItems.find(item => item.product.id === product.id);
      
      if (itemExists) {
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, { product, quantity }];
    });

    setIsCartOpen(true);
    toast(`${product.name} added to cart`);
  };

  // Remove from cart
  const removeFromCart = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      totalPrice,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
