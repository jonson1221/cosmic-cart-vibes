
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

// Checkout steps
type CheckoutStep = 'information' | 'shipping' | 'payment' | 'confirmation';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('information');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
    shippingMethod: 'standard',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: ''
  });
  
  // Navigation steps
  const steps: { name: CheckoutStep; label: string }[] = [
    { name: 'information', label: 'Information' },
    { name: 'shipping', label: 'Shipping' },
    { name: 'payment', label: 'Payment' },
    { name: 'confirmation', label: 'Confirmation' }
  ];
  
  // Scroll to top on page load and step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);
  
  // Check if cart is empty
  useEffect(() => {
    if (items.length === 0 && currentStep !== 'confirmation') {
      navigate('/');
    }
  }, [items, navigate, currentStep]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 'information') {
      setCurrentStep('shipping');
    } else if (currentStep === 'shipping') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      // Process payment
      setIsSubmitting(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsSubmitting(false);
        setCurrentStep('confirmation');
        clearCart();
      }, 2000);
    }
  };
  
  // Render order summary
  const renderOrderSummary = () => (
    <div className="bg-secondary/30 rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-4 mb-6">
        {items.map(item => (
          <div key={item.product.id} className="flex gap-3">
            <div className="relative">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-white">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {item.quantity}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium line-clamp-1">{item.product.name}</h4>
              <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
            </div>
            <div className="font-medium">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium">
            {formData.shippingMethod === 'express' ? '$10.00' : '$0.00'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span className="font-medium">${(totalPrice * 0.1).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
          <span>Total</span>
          <span>
            ${(totalPrice + (formData.shippingMethod === 'express' ? 10 : 0) + (totalPrice * 0.1)).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
  
  // Render steps navigation
  const renderStepsNav = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.name}>
          <div 
            className={`flex flex-col items-center ${
              currentStep === step.name 
                ? 'text-primary' 
                : steps.findIndex(s => s.name === currentStep) > index
                  ? 'text-muted-foreground'
                  : 'text-muted-foreground/50'
            }`}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === step.name 
                  ? 'bg-primary text-white' 
                  : steps.findIndex(s => s.name === currentStep) > index
                    ? 'bg-muted-foreground text-white'
                    : 'bg-secondary text-muted-foreground'
              }`}
            >
              {steps.findIndex(s => s.name === currentStep) > index ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            <span className="text-sm mt-2">{step.label}</span>
          </div>
          
          {index < steps.length - 1 && (
            <div 
              className={`w-12 h-0.5 mx-1 ${
                steps.findIndex(s => s.name === currentStep) > index
                  ? 'bg-muted-foreground'
                  : 'bg-secondary'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
  
  // Render information step
  const renderInformationStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Contact Information</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input 
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-2">
              First Name
            </label>
            <input 
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-2">
              Last Name
            </label>
            <input 
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-2">
            Address
          </label>
          <input 
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-2">
              City
            </label>
            <input 
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-2">
              Country
            </label>
            <input 
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium mb-2">
              Postal Code
            </label>
            <input 
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone
          </label>
          <input 
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
  
  // Render shipping step
  const renderShippingStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Shipping Method</h2>
      
      <div className="space-y-4">
        <div className="border rounded-lg overflow-hidden">
          <label 
            htmlFor="standard-shipping"
            className={`flex items-start p-4 cursor-pointer ${
              formData.shippingMethod === 'standard' ? 'bg-secondary/40' : ''
            }`}
          >
            <input 
              type="radio"
              id="standard-shipping"
              name="shippingMethod"
              value="standard"
              checked={formData.shippingMethod === 'standard'}
              onChange={handleInputChange}
              className="mt-1"
            />
            <div className="ml-3">
              <span className="block font-medium">Standard Shipping</span>
              <span className="block text-sm text-muted-foreground">Free • 5-7 business days</span>
            </div>
            <div className="ml-auto font-medium">$0.00</div>
          </label>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <label 
            htmlFor="express-shipping"
            className={`flex items-start p-4 cursor-pointer ${
              formData.shippingMethod === 'express' ? 'bg-secondary/40' : ''
            }`}
          >
            <input 
              type="radio"
              id="express-shipping"
              name="shippingMethod"
              value="express"
              checked={formData.shippingMethod === 'express'}
              onChange={handleInputChange}
              className="mt-1"
            />
            <div className="ml-3">
              <span className="block font-medium">Express Shipping</span>
              <span className="block text-sm text-muted-foreground">2-3 business days</span>
            </div>
            <div className="ml-auto font-medium">$10.00</div>
          </label>
        </div>
      </div>
      
      <div className="border-t border-border pt-6">
        <h3 className="font-semibold mb-4">Shipping Address</h3>
        
        <div className="p-4 bg-secondary/30 rounded-lg">
          <p>{formData.firstName} {formData.lastName}</p>
          <p>{formData.address}</p>
          <p>{formData.city}, {formData.country} {formData.postalCode}</p>
          <p>{formData.phone}</p>
        </div>
      </div>
    </div>
  );
  
  // Render payment step
  const renderPaymentStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Payment</h2>
      
      <div className="space-y-4">
        <div className="border rounded-lg overflow-hidden">
          <label 
            htmlFor="credit-card"
            className={`flex items-center p-4 cursor-pointer ${
              formData.paymentMethod === 'credit-card' ? 'bg-secondary/40' : ''
            }`}
          >
            <input 
              type="radio"
              id="credit-card"
              name="paymentMethod"
              value="credit-card"
              checked={formData.paymentMethod === 'credit-card'}
              onChange={handleInputChange}
              className="mr-3"
            />
            <CreditCard className="h-5 w-5 mr-3" />
            <span className="font-medium">Credit / Debit Card</span>
          </label>
        </div>
        
        {formData.paymentMethod === 'credit-card' && (
          <div className="space-y-4 p-4 border rounded-lg">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                Card Number
              </label>
              <input 
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium mb-2">
                Name on Card
              </label>
              <input 
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cardExpiry" className="block text-sm font-medium mb-2">
                  Expiry Date
                </label>
                <input 
                  type="text"
                  id="cardExpiry"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="cardCvc" className="block text-sm font-medium mb-2">
                  CVC
                </label>
                <input 
                  type="text"
                  id="cardCvc"
                  name="cardCvc"
                  value={formData.cardCvc}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t border-border pt-6">
        <h3 className="font-semibold mb-4">Billing Address</h3>
        
        <div className="p-4 bg-secondary/30 rounded-lg">
          <p>{formData.firstName} {formData.lastName}</p>
          <p>{formData.address}</p>
          <p>{formData.city}, {formData.country} {formData.postalCode}</p>
          <p>{formData.phone}</p>
        </div>
      </div>
    </div>
  );
  
  // Render confirmation step
  const renderConfirmationStep = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      
      <h2 className="text-3xl font-bold mb-4">Thank You for Your Order!</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Your order has been placed successfully. We have sent a confirmation email to {formData.email}.
      </p>
      
      <div className="mb-8 p-6 bg-secondary/30 rounded-lg max-w-md mx-auto text-left">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <p className="text-sm mb-4">Order #: {Math.floor(100000 + Math.random() * 900000)}</p>
        
        <div className="border-t border-border pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">
              {formData.shippingMethod === 'express' ? '$10.00' : '$0.00'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-medium">${(totalPrice * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t border-border">
            <span>Total</span>
            <span>
              ${(totalPrice + (formData.shippingMethod === 'express' ? 10 : 0) + (totalPrice * 0.1)).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      <Link to="/products" className="btn-primary">
        Continue Shopping
      </Link>
    </div>
  );
  
  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'information':
        return renderInformationStep();
      case 'shipping':
        return renderShippingStep();
      case 'payment':
        return renderPaymentStep();
      case 'confirmation':
        return renderConfirmationStep();
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {currentStep !== 'confirmation' && (
            <div className="mb-8">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back to shopping
              </Link>
            </div>
          )}
          
          {renderStepsNav()}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {renderStepContent()}
              </div>
              
              {/* Order Summary */}
              {currentStep !== 'confirmation' && (
                <div className="lg:col-span-1">
                  {renderOrderSummary()}
                </div>
              )}
            </div>
            
            {/* Navigation Buttons */}
            {currentStep !== 'confirmation' && (
              <div className="mt-12 flex justify-between">
                {currentStep !== 'information' ? (
                  <button 
                    type="button"
                    onClick={() => {
                      if (currentStep === 'shipping') setCurrentStep('information');
                      if (currentStep === 'payment') setCurrentStep('shipping');
                    }}
                    className="px-6 py-3 border rounded-full hover:bg-secondary transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center gap-2"
                >
                  {isSubmitting ? (
                    'Processing...'
                  ) : currentStep === 'payment' ? (
                    <>Complete Order</>
                  ) : (
                    <>Continue</>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default CheckoutPage;
